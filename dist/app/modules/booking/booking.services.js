"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.bookingService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = require("./booking.model");
const slot_model_1 = require("../slot/slot.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createBookingIntoDB = (payload, decoded) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("payload booking",payload);
    const user = yield user_model_1.Useres.findOne({ email: decoded.email });
    // console.log("user", user);
    payload = Object.assign(Object.assign({}, payload), { customer: user._id });
    // console.log(" add id payload booking",payload);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const avalevleSlot = yield slot_model_1.Slot.findById(payload.slotId);
        // console.log(avalevleSlot);
        if ((avalevleSlot === null || avalevleSlot === void 0 ? void 0 : avalevleSlot.isBooked) === 'booked') {
            throw new AppError_1.default(404, 'slot not available');
        }
        yield slot_model_1.Slot.findByIdAndUpdate(payload.slotId, { isBooked: 'booked' }, { new: true, session });
        const result = yield booking_model_1.booking.create([payload], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.booking.find().populate('customer').populate('service').populate('slot');
    return result;
});
// const getAllUserBookingsFromDB = async (
//   query :any,decoded:any
// ) => {
//   const user =await Useres.findOne({email:decoded.email})
//  console.log("user",user);
//  if (!user) {
//  throw new AppError(404,'not found')
//  }
//  console.log("user",user._id);
//   const slotQuery = new QueryBuilder(booking.find({customer:user._id}).populate('customer').populate('service').populate('slot'), query)
//     .search(['name', 'email',])
//     .filter()
//     .sort()
//     .paginate()
//     .fields();
//   const result = await slotQuery.modelQuery;
//   const meta = await slotQuery.countTotal();
//   return {
//     meta,
//     result,
//   };
// };
const getAllUserBookingsFromDB = (query, decoded) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch user by email
    const user = yield user_model_1.Useres.findOne({ email: decoded.email });
    // console.log("user", user);
    // If user not found, throw error
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    // console.log("user ID", user._id);
    // Create the query using QueryBuilder
    const slotQuery = new QueryBuilder_1.default(booking_model_1.booking.find({ customer: user._id })
        .populate('customer')
        .populate('serviceId')
        .populate('slotId'), query)
        .search(['name', 'email']) // You might need to adjust this based on the fields you are querying
        .filter()
        .sort()
        .paginate()
        .fields();
    // Execute the query
    const result = yield slotQuery.modelQuery;
    const meta = yield slotQuery.countTotal();
    // Return the result and metadata
    return {
        meta,
        result,
    };
});
exports.bookingService = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getAllUserBookingsFromDB
};
