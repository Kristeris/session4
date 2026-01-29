import {Body, Controller, Post, Get, Route, FormField, Query} from "tsoa";
import {UserLoginRequest} from "../models/messages/UserLoginRequest";
import {UserLoginResponse} from "../models/messages/UserLoginResponse";
import {ControllerDatabase} from "./ControllerDatabase";
import {UserLogoutRequest} from "../models/messages/UserLogoutRequest";
import {UserLogoutResponse} from "../models/messages/UserLogoutResponse";

@Route("users")
export class ControllerUsers {

    @Post("login")
    public async login(@Body() request: UserLoginRequest): Promise<UserLoginResponse> {
        let response : UserLoginResponse = {
            is_success: false,
            session_token: ""
        }
        try{
            let session = await ControllerDatabase.instance.login(
                request.email,
                request.password
            )
            if (session){
                response.session_token = session.session_token;
                response.is_success = true;
            } else{
                response.error_message = "wrong_password_or_email";
            }

        }
        catch(exc) {
            console.error(exc.message);
            response.error_message = "unexpected_error";
        }
        return response;
    }

    @Post("logout")
    public async logout(@Body() request: UserLogoutRequest): Promise<UserLogoutResponse> {
        let response : UserLogoutResponse = {
            is_success: false
        };
        try{
            await ControllerDatabase.instance.logout(
                request.session_token
            )
            response.is_success = true;

        }
        catch(exc) {
            console.error(exc.message);
        }
        return response;
    }
}
