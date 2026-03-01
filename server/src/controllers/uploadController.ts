import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';

export const uploadFile = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // In a real app, you might upload to S3/Cloudinary here
        // For now, we return the local path or a simulated URL
        const fileUrl = `/uploads/${req.file.filename}`;

        res.status(200).json({
            message: 'File uploaded successfully',
            url: fileUrl,
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            size: req.file.size
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
