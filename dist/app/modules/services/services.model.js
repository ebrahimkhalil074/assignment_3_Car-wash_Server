"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const mongoose_1 = require("mongoose");
const servicsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 20
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        minlength: 8,
        maxlength: 20
    },
    duration: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false,
    collection: 'services'
});
exports.Services = (0, mongoose_1.model)('Services', servicsSchema);
