import { RoleName } from '../enums/role';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
// import { ObjectId } from 'mongodb';

export const generateAccessToken = (
    // id: ObjectId,
    username: string,
    roles: RoleName[],
    refresh?: true
): string => {
    const payload = refresh
        ? {username}
        : {
        'UserInfo': {
            // id, // Convert ObjectId to string if needed
            username,
            roles,
        }
    };

    try {
        return refresh
            ? jwt.sign(payload, config.refreshToken as string, { expiresIn: '1d' })
            : jwt.sign(payload, config.secretToken as string, { expiresIn: '1m' }); // Adjusted access token expiration to 15 minutes
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
};
