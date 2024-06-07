import mongoose from 'mongoose';

export const baseSchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (_doc: mongoose.Document, ret: Record<string, string>) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
};
