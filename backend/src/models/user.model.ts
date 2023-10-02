import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true, default: () => new mongoose.Types.ObjectId() },
  balance: {
    type: Number,
    required: true,
  },
});

export const User = mongoose.model('users', userSchema);