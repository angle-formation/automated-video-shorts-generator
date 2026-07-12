const { Worker } = require("bullmq");
const { bundle } = require("@remotion/bundler");
const { renderMedia, selectComposition } = require("@remotion/renderer");
const path = require("path");
const IORedis = require("ioredis");

const connection = new IORedis("redis://127.0.0.1:6379", { maxRetriesPerRequest: null });

console.log("⚙️  [Worker Multi-Templates] Prêt à commuter les moteurs de rendu...");

const worker = new Worker(
  "video-rendering",
  async (job) => {
    const { jobId, templateId, ...inputProps } = job.data;
    console.log(`\n⏳ [Job #${job.id}] Allocation de rendu pour la composition: [${templateId}]`);

    const entry = path.resolve(__dirname, "src/remotion/index.ts");
    const outputLocation = path.resolve(__dirname, `public/renders/${jobId}.mp4`);

    console.log("📦 1. Bundling Webpack en cours...");
    const bundleLocation = await bundle(entry);

    console.log(`🔍 2. Sélection de la composition cible [${templateId}]...`);
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: templateId, // Prise en compte dynamique du choix de l'utilisateur
      inputProps: inputProps,
    });

    console.log("🎬 3. Encodage lourd audio/vidéo via FFmpeg...");
    await renderMedia({
      serveUrl: bundleLocation,
      composition,
      codec: "h264",
      outputLocation,
      inputProps: inputProps,
      onProgress: (progress) => {
        const percent = Math.round(progress * 100);
        job.updateProgress(percent);
        console.log(`🎥 Encodage : ${percent}%`);
      },
    });

    console.log(`✅ [Job #${job.id}] Vidéo compilée avec succès.`);
    return { videoUrl: `/renders/${jobId}.mp4` };
  },
  { connection, concurrency: 1 }
);

worker.on("failed", (job, err) => {
  console.error(`❌ [Job #${job?.id}] Échec critique de compilation :`, err);
});
