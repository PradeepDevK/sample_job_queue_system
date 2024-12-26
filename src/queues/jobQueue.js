const Bull = require('bull');

// Create Queues
const emailQueue = new Bull('emailQueue');
const fileProcessingQueue = new Bull('fileProcessingQueue');

// Export Queues
module.exports = {
  emailQueue,
  fileProcessingQueue,
};
