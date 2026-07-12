import { NextResponse } from "next/server";
import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis("redis://127.0.0.1:6379", { maxRetriesPerRequest: null });

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const queue = new Queue("video-rendering", { connection });
  const job = await queue.getJob(params.id);

  if (!job) return NextResponse.json({ error: "Job introuvable" }, { status: 404 });

  const state = await job.getState();
  const progress = job.progress;
  const result = job.returnvalue;

  return NextResponse.json({
    id: job.id,
    state,
    progress,
    videoUrl: result ? result.videoUrl : null
  });
}
