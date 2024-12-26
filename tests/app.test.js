const request = require('supertest');
const path = require('path');

const app = require('../src/app');

let server;

beforeAll(() => {
  // Start the server before running tests
  server = app.listen(3000, () => {
    console.log('Test server running on port 3000');
  });

  app.set('views', path.join(__dirname, '../views')); // Ensure correct views path
  app.set('view engine', 'ejs');
});

afterAll(async () => {
  // Close the server after tests to release resources
  console.log('Closing server and connections...');

  if (server) {
    console.log('Closing Express server...');
    await new Promise((resolve) => server.close(resolve)); // Ensures the server closes correctly
  }

  // Clear any remaining timers or async operations
  jest.clearAllTimers();
});

describe('GET /dashboard', () => {
  it('should return the dashboard page with queue stats', async () => {
    const response = await request(app).get('/dashboard');

    // Check response status
    expect(response.status).toBe(200);

    // Check if the response contains specific queue stats
    expect(response.text).toContain('Email Queue Status');
    expect(response.text).toContain('File Processing Queue Status');
  });
});
