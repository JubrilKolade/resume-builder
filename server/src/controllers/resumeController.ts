import type { Response } from 'express';
import Resume from '../models/Resume.js';
import type { AuthRequest } from '../middleware/auth.js';

export const createResume = async (req: AuthRequest, res: Response) => {
    try {
        const { data, template, style } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Basic Validation
        if (!data || !template || !style) {
            return res.status(400).json({ message: 'Please provide all required fields (data, template, style)' });
        }

        const resume = new Resume({
            userId,
            data,
            template,
            style,
        });

        await resume.save();
        res.status(201).json({
            id: resume._id,
            title: resume.title,
            data: resume.data,
            template: resume.template,
            style: resume.style,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getResumes = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getResumeById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!id || !userId) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        const resume = await Resume.findOne({ _id: id, userId });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json(resume);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateResume = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { data, template, style } = req.body;
        const userId = req.user?.id;

        if (!id || !userId) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        const resume = await Resume.findOneAndUpdate(
            { _id: id, userId },
            { data, template, style },
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json(resume);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteResume = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!id || !userId) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        const resume = await Resume.findOneAndDelete({ _id: id, userId });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json({ message: 'Resume deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
