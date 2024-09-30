"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotValidations = void 0;
const zod_1 = require("zod");
const createSlotValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.string({
            required_error: "service is required"
        }),
        date: zod_1.z.string({
            required_error: "date is required"
        }),
        startTime: zod_1.z.number({
            required_error: "startTime is required",
        }),
        endTime: zod_1.z.number({
            required_error: "endTime is required",
        }),
        isBooked: zod_1.z.boolean({
            required_error: "isBooked is required",
        })
    })
});
exports.slotValidations = {
    createSlotValidationSchema
};
