import { Queue } from "bullmq";
import { connection } from "./connection";

export const PDF_QUEUE_NAME = "pdf-generation-queue";

export const pdfQueue = new Queue(PDF_QUEUE_NAME, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export interface PdfJobData {
  itineraryId: string;
  userId: string;
  pdfExportId: string;
  baseUrl: string;
}
