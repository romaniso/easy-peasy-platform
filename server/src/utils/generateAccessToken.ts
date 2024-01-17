import { RoleName } from '../enums/role';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { ObjectId } from 'mongodb';

export const generateAccessToken = (
    id: ObjectId,
    roles: RoleName[],
    refresh?: true
): string => {
    const payload = {
        id: id.toString(), // Convert ObjectId to string if needed
        roles,
    };

    try {
        return refresh
            ? jwt.sign(payload, 'shh', { expiresIn: '1d' })
            : jwt.sign(payload, config.secretToken as string, { expiresIn: '1m' }); // Adjusted access token expiration to 15 minutes
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
};
