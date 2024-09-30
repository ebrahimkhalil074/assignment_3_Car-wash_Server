"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booking = void 0;
const mongoose_1 = require("mongoose");
const booking_interface_1 = require("./booking.interface");
const bookingSchema = new mongoose_1.Schema({
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Useres', required: true }, // Reference to User
    serviceId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Services', required: true }, // Reference to Service
    slotId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Slot', required: true }, // Reference to Slot
    vehicleType: {
        type: String,
        enum: booking_interface_1.VehicleType,
        required: true
    },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true, unique: true }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});
exports.booking = (0, mongoose_1.model)('Booking', bookingSchema);
