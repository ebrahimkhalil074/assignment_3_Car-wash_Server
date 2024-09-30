"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt_decode_1 = require("jwt-decode");
const verifyToken = (token) => {
    console.log('vf', token);
    return (0, jwt_decode_1.jwtDecode)(token);
};
exports.verifyToken = verifyToken;
