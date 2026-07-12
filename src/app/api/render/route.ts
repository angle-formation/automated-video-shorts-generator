import { NextResponse } from "next/server";
import { Queue } from "bullmq";
import IORedis from "ioredis";
import crypto from "crypto";

const connection = new IORedis("redis://127.0.0.1:6379", { maxRetriesPerRequest: null });
const videoQueue = new Queue("video-rendering", { connection });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateId, ...rest } = body;
    
    if (!templateId) return NextResponse.json({ error: "templateId requis" }, { status: 400 });

    const jobId = crypto.randomUUID();
    
    // Ajout combiné du gabarit d'animation et de ses arguments
    const job = await videoQueue.add(`render-${jobId}`, {
      jobId,
      templateId,
      ...rest
    });

    return NextResponse.json({ success: true, jobId: job.id }, { status: 202 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
