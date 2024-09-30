"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_utils_1 = require("./auth.utils");
const user_model_1 = require("../user/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    // checking if the user is exist
    const user = yield user_model_1.Useres.findOne({ email: payload.email });
    //  console.log(user)
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    // const isDeleted = user?.isDeleted;
    // if (isDeleted) {
    //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    // }
    // checking if the user is blocked
    // const userStatus = user?.status;
    // if (userStatus === 'blocked') {
    //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    // }
    //checking if the password is correct
    // if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    //   throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    //create token and sent to the  client
    const jwtPayload = {
        email: user.email,
        role: user.role,
        name: user.name,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(token);
    // Verifying the given token
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    // console.log('first', email);
    // Checking if the user exists
    const user = yield user_model_1.Useres.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
    }
    // Create JWT payload
    const jwtPayload = { email: user.email, role: user.role, name: user.name };
    // Create a new access token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return { accessToken };
});
exports.AuthServices = {
    loginUser,
    refreshToken,
};
