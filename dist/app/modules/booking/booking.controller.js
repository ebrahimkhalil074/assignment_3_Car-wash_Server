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
exports.bookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_services_1 = require("./booking.services");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const verifyToken_1 = require("../../utils/verifyToken");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log( 'createBooking',req.body);
    const { refreshToken } = req.cookies;
    const token = refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.split(' ')[1];
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'No token provided!');
    }
    // Verify the token
    const decoded = (0, verifyToken_1.verifyToken)(token);
    // console.log('de',decoded);
    const result = yield booking_services_1.bookingService.createBookingIntoDB(req.body, decoded);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'booking succesfully',
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.bookingService.getAllBookingsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'services is created succesfully',
        data: result,
    });
}));
const getAllUserBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    const { refreshToken } = req.cookies;
    const token = refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.split(' ')[1];
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'No token provided!');
    }
    // Verify the token
    const decoded = (0, verifyToken_1.verifyToken)(token);
    //    console.log('de',decoded);
    const result = yield booking_services_1.bookingService.getAllUserBookingsFromDB(query, decoded);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User bookings retrieved successfully",
        data: result,
    });
}));
exports.bookingController = {
    createBooking,
    getAllBookings,
    getAllUserBookings
};
