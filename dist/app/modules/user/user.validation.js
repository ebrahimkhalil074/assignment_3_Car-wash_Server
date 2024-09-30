"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required"
        })
            .min(3, { message: "Name must be at least 3 characters long" })
            .max(20, { message: "Name must be at most 20 characters long" }),
        email: zod_1.z.string({
            required_error: "email is required"
        })
            .email({ message: "Invalid email address" })
            .min(1, { message: "Email is required" }),
        password: zod_1.z.string({
            required_error: "password is required"
        })
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(20, { message: "Password must be at most 20 characters long" })
            .min(1, { message: "Password is required" }),
        phone: zod_1.z.string({
            required_error: "phone is required"
        })
            .min(1, { message: "Phone number is required" })
            .refine((val) => val.toString().length >= 10, {
            message: "Phone number must be at least 10 digits long",
        }),
        role: zod_1.z.enum(["user", "admin"]).default("user"),
        address: zod_1.z.string({
            required_error: "address is required"
        })
    })
});
exports.userValidations = {
    createUserValidationSchema
};
