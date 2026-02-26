import type { Request, Response } from 'express';
import CoverLetter from '../models/CoverLetter.js';

export const getCoverLetters = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const letters = await CoverLetter.find({ userId }).sort({ updatedAt: -1 });
        res.json(letters);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getCoverLetterById = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const letter = await CoverLetter.findOne({ _id: req.params.id as string, userId });

        if (!letter) {
            return res.status(404).json({ message: 'Cover letter not found' });
        }
        res.json(letter);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const createCoverLetter = async (req: Request, res: Response) => {
    try {
        const { personalInfo, recipientInfo, letterContent, template, style } = req.body;
        // @ts-ignore
        const userId = req.user.id;

        const newLetter = new CoverLetter({
            userId,
            personalInfo,
            recipientInfo,
            letterContent,
            template,
            style,
        });

        const savedLetter = await newLetter.save();
        res.status(201).json(savedLetter);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateCoverLetter = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { personalInfo, recipientInfo, letterContent, template, style } = req.body;

        const letter = await CoverLetter.findOne({ _id: req.params.id as string, userId });

        if (!letter) {
            return res.status(404).json({ message: 'Cover letter not found' });
        }

        if (personalInfo) letter.personalInfo = personalInfo;
        if (recipientInfo) letter.recipientInfo = recipientInfo;
        if (letterContent) letter.letterContent = letterContent;
        if (template) letter.template = template;
        if (style) letter.style = style;

        const updatedLetter = await letter.save();
        res.json(updatedLetter);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteCoverLetter = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const letter = await CoverLetter.findOneAndDelete({ _id: req.params.id as string, userId });

        if (!letter) {
            return res.status(404).json({ message: 'Cover letter not found' });
        }

        res.json({ message: 'Cover letter removed' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
