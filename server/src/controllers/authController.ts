import type { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';
const JWT_EXPIRES_IN = '7d';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        user = new User({ email, password, name });
        await user.save();

        // Generate JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;
        // @ts-ignore - user is attached by auth middleware
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            // For security, do not reveal that the user doesn't exist
            return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
        }

        // In a real application, you would generate a secure token here,
        // save it to the user object or a token collection with an expiration,
        // and send an email to the user with a link to the reset page.
        // For this implementation, we simulate the token generation.
        const resetToken = jwt.sign({ id: user._id, purpose: 'reset' }, JWT_SECRET, { expiresIn: '1h' });

        // Simulating sending email by returning the token in the response 
        // (In production, NEVER return this directly, always send via email)
        res.json({
            message: 'If an account with that email exists, a password reset link has been sent.',
            dev_resetToken: resetToken // REMOVE this in production
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, purpose: string };

        if (decoded.purpose !== 'reset') {
            return res.status(400).json({ message: 'Invalid token type' });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: 'Invalid token or user does not exist' });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password has been reset successfully' });
    } catch (error: any) {
        res.status(400).json({ message: 'Invalid or expired token', error: error.message });
    }
};

