const { emailQueue, fileProcessingQueue } = require('../queues/jobQueue');
const emailJob = require('../jobs/emailJob');
const fileProcessingJob = require('../jobs/fileProcessingJob');

emailQueue.process(async (job) => {
  try {
    await emailJob(job.data);
    console.log(`Email job completed: ${job.id}`);
    return true;
  } catch (error) {
    console.error(`Email job failed: ${job.id}`, error);
  }
});

fileProcessingQueue.process(async (job) => {
  try {
    await fileProcessingJob(job.data);
    console.log(`File processing job completed: ${job.id}`);
    return true;
  } catch (error) {
    console.log(`File processing job failed: ${job.id}`, error);
  }
});
