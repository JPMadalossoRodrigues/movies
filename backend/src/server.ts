// src/server.ts

import { app } from "./app";
import { env } from "./config/env";
import { startJobWorker } from "./modules/job/job.worker";

async function bootstrap() {
  try {
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`);
    });

    // inicia worker
    startJobWorker();
    console.log("🧠 Job worker started");
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

bootstrap();
