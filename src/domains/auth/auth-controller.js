import { successResponse } from "../../utils/response.js";
import AuthService from "./auth-service.js";

class AuthController {
    async login(req, res) {
        const { username, password } = req.body;

        const response = await AuthService.login(username, password);

        if (!response) {
            throw Error("Failed to login");
        }

        return successResponse(res, response);
    }

    async register(req, res) {

        const { fullName, username , birthDate, password, email, gender= null} = req.body;
        const message = await AuthService.register({ fullName, username, birthDate, password, email, gender });

        if (!message) {
            throw Error("Failed to register");
        }

        return successResponse(res, message);
    }

    async getProfile(req, res){
        const user = await AuthService.getProfile(req.user.user_id);

        if (!user) {
            throw Error("Failed to get user profile");
        }

        return successResponse(res, user);
    }

    async updateProfile(req, res){
        const { fullName, username, birthDate, gender } = req.body;

        const user = await AuthService.updateProfile(req.user.user_id, { fullName, username, birthDate, gender });

        if (!user) {
            throw Error("Failed to update user profile");
        }

        return successResponse(res, user);
    }


    async updatePassword(req, res){
        const { old_password, new_password, confirm_password } = req.body;

        if(new_password !== confirm_password){
            throw Error("Failed to update user password")
        }

        const message = await AuthService.updatePasswordProfile(req.user.user_id, old_password, new_password);

        if (!message) {
            throw Error("Failed to update user password");
        }

        return successResponse(res, message);
    }

    async refreshToken(req, res) {
        const { refresh_token } = req.body;

        const token = await AuthService.refreshToken(refresh_token);

        if (!token) {
            throw Error("Failed to refresh token");
        }

        return successResponse(res, { access_token: token });
    }

    async emailResetPassword(req, res){
        const {email} = req.body;

        const response = await AuthService.generateEmailResetPassword(email)
        if(!response){
            throw Error("Failed to generate email");
        }
        return successResponse(res, response)
    }

    async verifyResetPassword(req, res){
        const {token} = req.params;

        const response = await AuthService.verifyResetPassword(token);

        if (response.status !== 200) {
            return res.redirect(`${process.env.FE_URL}/change-password?verify=failed&message=${response.message}`);
        }
        console.log(response);
        

        return res.redirect(`${process.env.FE_URL}/change-password?verify=success&token=${response.data}`);
    }

    async resetPassword(req, res){
        const {new_password, confirm_password, token } = req.body;

        if(new_password !== confirm_password){
            throw Error("Failed to update user password")
        }

        const message = await AuthService.resetPassword(new_password, token);

        if(!message){
            throw Error("failed to reset password")
        }
        return successResponse(res, message);
    }
}

export default new AuthController();