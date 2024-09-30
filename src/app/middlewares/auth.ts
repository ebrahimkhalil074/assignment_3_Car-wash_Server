/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import AppError from '../errors/AppError';

import catchAsync from '../utils/catchAsync';
import { Useres } from '../modules/user/user.model';
import { verifyToken } from '../utils/verifyToken';
import { JwtPayload } from 'jwt-decode';


const auth = (...requiredRoles:any) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
// console.log("token",token);

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = verifyToken(token);

    const { role, email,}:any = decoded;
    // console.log(role,requiredRoles);
    

    // checking if the user is exist
    const user =  await Useres.findOne({email});

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    

   

    

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  role!',
      );
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
