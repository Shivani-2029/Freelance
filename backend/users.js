// users.js
const express = require('express');
const client=require('./Client')

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await client.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
