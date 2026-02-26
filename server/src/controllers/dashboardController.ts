import type { Request, Response } from 'express';
import Resume from '../models/Resume.js';
import CoverLetter from '../models/CoverLetter.js';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;

        // Count total resumes
        const totalResumes = await Resume.countDocuments({ userId });

        // Count total cover letters
        const totalCoverLetters = await CoverLetter.countDocuments({ userId });

        // Count favorite resumes
        const favoriteResumes = await Resume.countDocuments({ userId, isFavorite: true });

        // Get recent resumes (last 5)
        const recentResumesList = await Resume.find({ userId })
            .sort({ updatedAt: -1 })
            .limit(5)
            .select('title template isFavorite updatedAt');

        // Aggregate template usage
        const templateUsage = await Resume.aggregate([
            { $match: { userId } },
            { $group: { _id: '$template', count: { $sum: 1 } } }
        ]);

        const templatesUsed: Record<string, number> = {};
        templateUsage.forEach((item) => {
            templatesUsed[item._id] = item.count;
        });

        res.json({
            stats: {
                totalResumes,
                totalCoverLetters,
                favoriteResumes,
                templatesUsed,
            },
            recentResumes: recentResumesList
        });

    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
