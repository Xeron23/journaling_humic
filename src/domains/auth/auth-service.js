import BaseError from "../../base_classes/base-error.js";
import { generateVerifEmail } from "../../utils/bodyEmail.js";
import sendEmail from "../../utils/sendEmail.js";
import { parseJWT, generateToken } from "../../utils/jwtTokenConfig.js";
import joi from "joi";
import prisma from "../../config/db.js";
import { hashPassword, matchPassword } from "../../utils/passwordConfig.js";


class AuthService {
    async login(username, password) {
        let user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });
        if(!user){
            user = await prisma.user.findFirst({
                where: {
                    email: username
                }
            });
            if (!user) {
                throw BaseError.badRequest("Invalid credentials");
            }
        }
        
        const now = new Date();
        await prisma.user.update({
            where: { user_id: user.user_id },
            data: {
                last_login_at: user.current_login_at,
                current_login_at: now
            }
        });

        const isMatch = await matchPassword(password, user.password);
        
        if (!isMatch) {
            throw BaseError.badRequest("Invalid credentials");
        }

        const accessToken = generateToken(user.user_id, "1d");
        const refreshToken = generateToken(user.user_id, "365d");

        return { access_token: accessToken, refresh_token: refreshToken };
    }

    async register(data) {
        const emailExist = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        const usernameExist = await prisma.user.findUnique({
            where: {
                username: data.username,
            }
        })

        if (emailExist || usernameExist) {
            let validation = "";
            let stack = [];

            if (usernameExist) {
                validation = "Username already taken.";

                stack.push({
                    message: "Username already taken.",
                    path: ["username"]
                });
            }

            if (emailExist) {
                validation += "Email already taken.";

                stack.push({
                    message: "Email already taken.",
                    path: ["email"]
                });
            }
            throw new joi.ValidationError(validation, stack);
        }

        data.password = await hashPassword(data.password);
        data.birthDate = new Date(data.birthDate);
        const createdUser = await prisma.user.create({
            data: data
        });

        if (!createdUser) {
            throw Error("Failed to register");
        }

        return {message: "User registered successfully."};
    }

    async getProfile(id) {
        const user = await prisma.user.findUnique({
            where: {
                user_id: id
            },
            select: {
                user_id: true,
                username: true,
                role: true,
                email: true,
                birthDate: true,
                last_login_at: true,
            }
        });

        if (!user) {
            throw BaseError.notFound("User not found");
        }

        return user;
    }

    async updateProfile(id, data) {
        const user = await prisma.user.findUnique({
            where: {
                user_id: id
            }
        });

        if (!user) {
            throw BaseError.notFound("User not found");
        }
        data.birthDate = new Date(data.birthDate);
        const updatedUser = await prisma.user.update({
            where: {
                user_id: user.user_id
            },
            data: data,
            select: {
                user_id: true,
                username: true,
                birthDate: true,
                fullName: true,
            }
        });

        return updatedUser;
    }

    async updatePasswordProfile(id, oldPassword, newPassword) {
        const user = await prisma.user.findUnique({
            where: {
                user_id: id
            }
        })

        if (!user) {
            throw BaseError.notFound("User not found");
        }

        const isMatch = await matchPassword(oldPassword, user.password);

        if (!isMatch) {
            throw new joi.ValidationError("Wrong Password", [{'message': 'Wrong Password', 'path': ['old_password']}]);
        }

        if (oldPassword === newPassword) {
            throw new joi.ValidationError("New password cannot be the same as the old password", [{'message': 'New password cannot be the same as the old password', 'path': ['new_password']}]);
        }

        user.password = await hashPassword(newPassword);
        await prisma.user.update({
            where: {
                user_id: id
            },
            data: {
                password: user.password
            }
        })

        return { message: "Password updated successfully" };
    }
    
    async refreshToken(token) {
        
        const decoded = parseJWT(token);
        
        if (!decoded) {
            throw BaseError.unauthorized("Invalid token");
        }

        const user = await prisma.user.findUnique({
            where: {
                user_id: decoded.id
            }
        });

        if (!user) {
            throw BaseError.notFound("User not found");
        }

        const accessToken = generateToken(user.user_id, "1d");

        return accessToken;
    }

    async generateEmailResetPassword(email){
        const user = await prisma.user.findFirst({
            where: {
                email: email
            },
            select: {
                fullName: true,
                user_id: true,
                email: true,
                role: true
            }
        })
        if(!user){
            throw BaseError.notFound("user not found");
        }

        const token = generateToken(user.user_id, "5m");
            const verificationLink = `${process.env.BE_URL}/api/v1/auth/verify-reset-password/${token}`;
            console.log("link: ", verificationLink);
        
        const emailHtml = generateVerifEmail(verificationLink);

        sendEmail(
                user.email,
                "Reset password dari Mou: Journaling",
                "Silankah mengklik link di bawah",
                emailHtml
        );

        return {message: "Successfully send reset password. Please check your email to reset your password"};
    }

    async verifyResetPassword(token){
        const decoded = parseJWT(token);

        if(!decoded){
            return { status: 400, message: "Invalid token" };
        }

        const user = await  prisma.user.findUnique({
            where: {
                user_id: decoded.id
            },
            select: {
                fullName: true,
                user_id: true,
                email: true,
                role: true
            }
        });
        

        if (!user) {
            return { status: 400, message: "User Not Found" }
        }

        return {status: 200, message: "Password verification successfully", data: token}
    }

    async resetPassword(newPassword, token){
        const decoded = parseJWT(token);
        console.log(decoded);
        

        if(!decoded){
            return { status: 400, message: "Invalid token" };
        }

        const user = await prisma.user.findUnique({
            where: {
                user_id: decoded.id,
            }
        })
        if(!user){
            throw BaseError.notFound("user not found");
        }

        user.password = await hashPassword(newPassword);
        await prisma.user.update({
            where: {
                user_id: user.user_id
            },
            data: {
                password: user.password
            }
        })

        return {message: "Password reset succesfully"}
    }
}

export default new AuthService();