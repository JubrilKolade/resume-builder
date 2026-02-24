import mongoose, { Schema } from 'mongoose';
import type { Document } from 'mongoose';

export interface IResume extends Document {
    userId: mongoose.Types.ObjectId;
    data: any; // ResumeData structure from frontend
    template: string;
    style: any; // ResumeStyle structure from frontend
    createdAt: Date;
    updatedAt: Date;
}

const ResumeSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        data: {
            type: Schema.Types.Mixed,
            required: true,
        },
        template: {
            type: String,
            required: true,
            enum: ['classic', 'modern', 'sidebar', 'creative'],
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
ResumeSchema.index({ userId: 1 });

export default mongoose.model<IResume>('Resume', ResumeSchema);
