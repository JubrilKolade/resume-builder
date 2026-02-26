import mongoose, { Schema } from 'mongoose';
import type { Document } from 'mongoose';

export interface ICoverLetter extends Document {
    userId: mongoose.Types.ObjectId;
    personalInfo: any;
    recipientInfo: any;
    letterContent: any;
    template: string;
    style: any;
    createdAt: Date;
    updatedAt: Date;
}

const CoverLetterSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        personalInfo: {
            type: Schema.Types.Mixed,
            required: true,
        },
        recipientInfo: {
            type: Schema.Types.Mixed,
            required: true,
        },
        letterContent: {
            type: Schema.Types.Mixed,
            required: true,
        },
        template: {
            type: String,
            required: true,
        },
        style: {
            type: Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexing for faster queries by user
CoverLetterSchema.index({ userId: 1 });

export default mongoose.model<ICoverLetter>('CoverLetter', CoverLetterSchema);
