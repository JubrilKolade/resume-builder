import type { Request, Response } from 'express';
import User from '../models/User.js';

export const getSettings = async (req: Request, res: Response) => {
    try {
        // @ts-ignore - user is attached by auth middleware
        const userId = req.user.id;
        const user = await User.findById(userId).select('settings');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.settings || {});
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateSettings = async (req: Request, res: Response) => {
    try {
        // @ts-ignore - user is attached by auth middleware
        const userId = req.user.id;
        const newSettings = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Merge or replace settings
        // Depending on how deep the frontend sends updates, assigning directly might be sufficient
        // if the frontend always sends the full settings object
        user.settings = { ...user.settings, ...newSettings };

        // Save using markModified since settings is a Mixed type
        user.markModified('settings');
        await user.save();

        res.json(user.settings);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
