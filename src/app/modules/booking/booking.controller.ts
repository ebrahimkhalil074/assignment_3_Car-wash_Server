import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.services";

import AppError from "../../errors/AppError";
import { verifyToken } from "../../utils/verifyToken";



const createBooking =catchAsync(async(req,res)=>{
    // console.log( 'createBooking',req.body);
    const {refreshToken} =req.cookies
    const token = refreshToken?.split(' ')[1];
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'No token provided!');
    }
 
    // Verify the token
    const decoded = verifyToken(token);
    // console.log('de',decoded);
    
    const result = await bookingService.createBookingIntoDB(req.body,decoded);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'booking succesfully',
        data: result,   
    })
})
const getAllBookings =catchAsync(async(req,res)=>{

    const result = await bookingService.getAllBookingsFromDB();
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'services is created succesfully',
        data: result,   
    })
})
const getAllUserBookings =catchAsync(async(req,res)=>{
const{ query} = req.query
   const {refreshToken} =req.cookies
   const token = refreshToken?.split(' ')[1];
   if (!token) {
     throw new AppError(httpStatus.UNAUTHORIZED, 'No token provided!');
   }

   // Verify the token
   const decoded = verifyToken(token);
//    console.log('de',decoded);
   
   
    const result = await bookingService.getAllUserBookingsFromDB(query,decoded,);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "User bookings retrieved successfully",
        data: result,   
    })
})


export const bookingController={
    createBooking,
    getAllBookings,
    getAllUserBookings
 
}