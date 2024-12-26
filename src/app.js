const express = require('express');
const path = require('path');
require('dotenv').config();
const { getDashboardData } = require('./dashboard/dashboard');

const app = express();
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.get('/dashboard', async (req, res) => {
  // Mock data for testing
  try {
    const data = {
      emailQueueStatus: process.env.TEST_ENV
        ? { active: 2, completed: 5, failed: 1 }
        : (await getDashboardData()).emailQueueStatus,
      fileProcessingQueueStatus: process.env.TEST_ENV
        ? { active: 3, completed: 7, failed: 0 }
        : (await getDashboardData()).fileProcessingQueueStatus,
    };
    res.render('dashboard', data);
  } catch (error) {
    console.error('Error rendering dashboard:', error); // Log the error
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;
