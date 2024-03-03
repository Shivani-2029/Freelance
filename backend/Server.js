// server.js
const express = require('express');
const cors=require("cors")
// const usersRouter = require('./routes/users');
const usersRouter=require('./users')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())

// Middleware
app.use(express.json());

// Routes
app.use('/api', usersRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
