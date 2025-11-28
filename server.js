const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const UserSchema = new mongoose.Schema({
  telegramId: Number,
  coins: { type: Number, default: 0 },
  energy: { type: Number, default: 1000 },
  coinsPerTap: { type: Number, default: 1 },
  maxEnergy: { type: Number, default: 1000 },
  energyRegenRate: { type: Number, default: 1 }
});

const User = mongoose.model('User', UserSchema);

app.get('/api/user/:telegramId', async (req, res) => {
  let user = await User.findOne({ telegramId: req.params.telegramId });
  if (!user) user = new User({ telegramId: req.params.telegramId });
  res.json(user);
});

app.post('/api/user/:telegramId', async (req, res) => {
  const user = await User.findOneAndUpdate(
    { telegramId: req.params.telegramId },
    req.body,
    { new: true, upsert: true }
  );
  res.json(user);
});

mongoose.connect('mongodb://localhost:27017/qicx');
app.listen(3000);
