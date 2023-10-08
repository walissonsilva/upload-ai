import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { createReadStream, unlink } from "fs";
import { openai } from "../lib/openai";
import { promisify } from "util";

const unlinkPromise = promisify(unlink);

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post("/videos/:videoId/transcription", async (req) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
    });

    const { videoId } = paramsSchema.parse(req.params);

    const bodySchema = z.object({
      prompt: z.string(),
    });

    const { prompt } = bodySchema.parse(req.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    const videoPath = video.path;

    const audioReadStream = createReadStream(videoPath);

    const response = await openai.audio.translations.create({
      file: audioReadStream,
      model: "whisper-1",
      response_format: "json",
      temperature: 0,
      prompt,
    });

    const transcription = response.text;

    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        transcription,
      },
    });

    await unlinkPromise(videoPath);

    return response.text;
  });
}
