import { FastifyInstance } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import path from "node:path";
import { randomUUID } from "node:crypto";
import fs from "fs";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { prisma } from "../lib/prisma";

const pump = promisify(pipeline);

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25, // 25 MB
    },
  });

  app.post("/videos", async (request, response) => {
    const data = await request.file();

    if (!data) {
      return response.status(400).send({ error: "Missing file input" });
    }

    const extension = path.extname(data.filename);

    if (extension !== ".mp3") {
      return response
        .status(400)
        .send({ error: "Invalid input type, please upload a mp3." });
    }

    const fileBaseName = path.basename(data.filename, extension);

    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;

    const uploadDir = path.resolve(__dirname, "../../tmp", fileUploadName);

    try {
      await pump(data.file, fs.createWriteStream(uploadDir));

      const video = await prisma.video.create({
        data: {
          name: data.filename,
          title: fileBaseName,
          path: uploadDir,
        },
      });

      return { video };
    } catch (error) {
      console.log(error);
      return response.status(500).send({ error: "Unknown error on server." });
    }
  });
}
