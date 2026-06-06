import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'isuryaprakashh_portfolio_visitors',
  },
  value: {
    type: Number,
    required: true,
    default: 98,
  }
}, { timestamps: true });

export default mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
