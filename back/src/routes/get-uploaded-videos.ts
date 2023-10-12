import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getUploadedVideos(app: FastifyInstance) {
  app.get("/uploaded-videos", async () => {
    const videos = await prisma.video.findMany();

    return videos;
  });
}
