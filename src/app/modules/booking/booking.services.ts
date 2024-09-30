/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import { TBooking } from "./booking.interface";
import { booking } from "./booking.model"
import { Slot } from "../slot/slot.model";
import QueryBuilder from "../../builder/QueryBuilder";

import { Useres } from "../user/user.model";
import AppError from "../../errors/AppError";

const  createBookingIntoDB = async(payload :TBooking,decoded:any)=>{

// console.log("payload booking",payload);
const user = await Useres.findOne({ email: decoded.email });
// console.log("user", user);
 payload ={
  ...payload,
  customer: user!._id,
}
// console.log(" add id payload booking",payload);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
const avalevleSlot = await Slot.findById(payload.slotId)
// console.log(avalevleSlot);
if (avalevleSlot?.isBooked === 'booked') {
  throw new AppError(404,'slot not available');
}

  await Slot.findByIdAndUpdate(payload.slotId,{isBooked:'booked'} , 
  { new: true, session },
  )

    const result =await booking.create([payload],{ session });
    await session.commitTransaction();
    await session.endSession();
    
    return result
    
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }

}



const getAllBookingsFromDB =async ()=>{
  const result = await booking.find().populate('customer').populate('service').populate('slot');
  return result;
}

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

const getAllUserBookingsFromDB = async (query: any, decoded: any) => {
  // Fetch user by email
  const user = await Useres.findOne({ email: decoded.email });
  // console.log("user", user);
  
  // If user not found, throw error
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // console.log("user ID", user._id);

  // Create the query using QueryBuilder
  const slotQuery = new QueryBuilder(
    booking.find({ customer: user._id })
      .populate('customer')
      .populate('serviceId')
      .populate('slotId'), 
    query
  )
    .search(['name', 'email']) // You might need to adjust this based on the fields you are querying
    .filter()
    .sort()
    .paginate()
    .fields();

  // Execute the query
  const result = await slotQuery.modelQuery;
  const meta = await slotQuery.countTotal();

  // Return the result and metadata
  return {
    meta,
    result,
  };
};

  export const bookingService ={
    createBookingIntoDB,
    getAllBookingsFromDB,
    getAllUserBookingsFromDB
  }