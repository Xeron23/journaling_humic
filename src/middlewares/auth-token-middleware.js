import statusCodes from '../errors/status-codes.js';
import BaseError from '../base_classes/base-error.js';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

class AuthMiddleware {
    constructor(){
        this.JWT_SECRET = process.env.JWT_SECRET || "";
    }

    authenticate = async(req, res, next) => {
        const authHeader = req.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        
        if (token == null)
            throw new BaseError(
                401,
                statusCodes.UNAUTHORIZED.message,
                'UNAUTHORIZED',
                'User Have Not Login',
            );
        

        try {
            
            const decoded = jwt.verify(token, this.JWT_SECRET);
            
            const user = await prisma.user.findUnique({
                where: { 
                    user_id: decoded.id
                },
                select: {
                    fullName: true,
                    username: true,
                    role: true,
                    user_id: true
                }
            });
            
            
            if (!user) {
                return next(
                    new BaseError(
                        403,
                        statusCodes.FORBIDDEN.message,
                        'FORBIDDEN',
                        'User Not Found'
                    )
                );
            }
            
            req.user = user;
        
            next();
            } catch (err) {
            if (err.message === 'invalid signature') {
                return next(
                    new BaseError(403, statusCodes.FORBIDDEN.message, 'FORBIDDEN', 'Invalid Signature')
                );
            } else if (err.message === 'invalid token') {
                return next(
                    new BaseError(403, statusCodes.FORBIDDEN.message, 'FORBIDDEN', 'Invalid Token')
                );
            } else if (err.message === 'jwt expired') {
                return next(
                    new BaseError(403, statusCodes.FORBIDDEN.message, 'FORBIDDEN', 'Token Expired')
                );
            } else {
                return next(
                    new BaseError(
                        403,
                        statusCodes.FORBIDDEN.message,
                        'FORBIDDEN',
                        'Token Is Invalid Or No Longer Valid'
                    )
                );
            }
        }
    }


    authorizeUser = (roles) => (req, res, next) => {
        const user = req.user;
        
        if (!roles.includes(user.role)) {
                return next(
                    new BaseError(
                        403,
                        statusCodes.FORBIDDEN.message,
                        'FORBIDDEN',
                        'access denied'
                    )
            );
        }

        next();
    };
}




const authToken = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null)
        throw new BaseError(
            401,
            statusCodes.UNAUTHORIZED.message,
            'UNAUTHORIZED',
            'User Have Not Login',
        );


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        
        const user = await prisma.user.findUnique({
            where: { 
                user_id: decoded.id
            },
            select: {
                user_id: true,
                first_name: true,
                last_name:true,
                email: true,
            }
        });
        
        
        if (!user) {
            return next(
                new BaseError(
                    403,
                    statusCodes.FORBIDDEN.message,
                    'FORBIDDEN',
                    'User Not Found'
                )
            );
        }
    
        // ✅ simpan user ke req
        req.user = user;
    
        next();
        } catch (err) {
        if (err.message === 'invalid signature') {
            return next(
                new BaseError(403, statusCodes.FORBIDDEN.message, 'FORBIDDEN', 'Invalid Signature')
            );
        } else if (err.message === 'invalid token') {
            return next(
                new BaseError(403, statusCodes.FORBIDDEN.message, 'FORBIDDEN', 'Invalid Token')
            );
        } else if (err.message === 'jwt expired') {
            return next(
                new BaseError(403, statusCodes.FORBIDDEN.message, 'FORBIDDEN', 'Token Expired')
            );
        } else {
            return next(
                new BaseError(
                    403,
                    statusCodes.FORBIDDEN.message,
                    'FORBIDDEN',
                    'Token Is Invalid Or No Longer Valid'
                )
            );
        }
    }
};

export default new AuthMiddleware();