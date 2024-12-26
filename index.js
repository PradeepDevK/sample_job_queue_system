const app = require('./src/app');
const { emailQueue, fileProcessingQueue } = require('./src/queues/jobQueue');
require('./src/workers/worker');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/dashboard`);
});

// Example job addition
emailQueue.add({ email: 'user@example.com' }, { priority: 1 });
fileProcessingQueue.add({ fileName: 'file.txt' }, { priority: 2 });
