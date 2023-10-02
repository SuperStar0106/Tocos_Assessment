import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true, default: () => new mongoose.Types.ObjectId() },
  senderId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
});

export const Transaction = mongoose.model('transactions', transactionSchema);