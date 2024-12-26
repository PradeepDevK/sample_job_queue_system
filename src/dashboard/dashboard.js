const { emailQueue, fileProcessingQueue } = require('../queues/jobQueue');

const getDashboardData = async () => {
  return {
    emailQueueStatus: await emailQueue.getJobCounts(),
    fileProcessingQueueStatus: await fileProcessingQueue.getJobCounts(),
  };
};

module.exports = {
  getDashboardData,
};
