"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesValidations = void 0;
const zod_1 = require("zod");
const createServicesValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required"
        }),
        description: zod_1.z.string({
            required_error: "description is required"
        }),
        price: zod_1.z.number({
            required_error: "price is required",
        }),
        duration: zod_1.z.number({
            required_error: "duration is required",
        }),
        isDeleted: zod_1.z.boolean({
            required_error: "isDeleted is required",
        })
    })
});
exports.servicesValidations = {
    createServicesValidationSchema
};
