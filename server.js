const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const User = require('./models/User'); 

dotenv.config(); // Load .env file

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Mongo error:', err));

// Example signup route with error handling
app.post('/api/auth/register', async (req, res) => {
  console.log('Received signup request', req.body); // Log incoming data
  try {
    const { username, email, password } = req.body;

    // ✅ Check if fields are missing
    if (!username || !email || !password) {
      console.log('Missing signup fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    // ✅ Optional: check if the email is already used
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ error: 'User already exists' });
    }

    // ✅ Create and save the new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    console.log('Signup successful');
    res.json({ message: 'Signup successful' });
  } catch (err) {
    console.log('Error during signup:', err.message);
    res.status(500).json({ error: 'Server error during signup' });
  }
});


app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
