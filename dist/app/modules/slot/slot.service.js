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
exports.slotServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const services_model_1 = require("../services/services.model");
const slot_constan_1 = require("./slot.constan");
const slot_model_1 = require("./slot.model");
const createSlotIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { startTime, endTime } = payload;
    // console.log(payload.service)
    const ser = yield services_model_1.Services.findById(payload.service);
    // console.log('ser',ser)
    const serviceDuration = ser === null || ser === void 0 ? void 0 : ser.duration;
    const startInMinutes = convertTimeToMinutes(startTime); // 09:00 → 540
    const endInMinutes = convertTimeToMinutes(endTime); // 14:00 → 840
    // Calculate the total duration
    const totalDuration = endInMinutes - startInMinutes; // 840 - 540 = 300 minutes
    // Calculate the number of slots
    const numberOfSlots = totalDuration / serviceDuration; // 300 / 60 = 5 slots
    // Array to store the slots
    const slots = [];
    // Generate the time slots
    for (let i = 0; i < numberOfSlots; i++) {
        const slotStartInMinutes = startInMinutes + i * serviceDuration;
        const slotEndInMinutes = slotStartInMinutes + serviceDuration;
        // Convert minutes back to time format (HH:mm)
        const slotStartTime = convertMinutesToTime(slotStartInMinutes);
        const slotEndTime = convertMinutesToTime(slotEndInMinutes);
        // Add slot to the array
        slots.push({
            service: payload.service,
            date: payload.date,
            startTime: slotStartTime,
            endTime: slotEndTime,
            isBooked: 'available',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    // console.log('slot',slots)
    const result = yield slot_model_1.Slot.insertMany(slots);
    return result;
});
// Helper function to convert time (HH:mm) to minutes from midnight
const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};
// Helper function to convert minutes from midnight to time (HH:mm)
const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
};
// const getAllSlotsFromDB =async ()=>{
//   const slots = await Slot.find({});
//   return slots;
// }
const getAllAvailableSlotsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const slotQuery = new QueryBuilder_1.default(slot_model_1.Slot.find(), query)
        .search(slot_constan_1.slotSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield slotQuery.modelQuery;
    const meta = yield slotQuery.countTotal();
    return {
        meta,
        result,
    };
});
exports.slotServices = {
    createSlotIntoDB,
    getAllAvailableSlotsFromDB,
};
