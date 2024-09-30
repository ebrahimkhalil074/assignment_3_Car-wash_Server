
import httpStatus from 'http-status';

import config from '../../config';
import AppError from '../../errors/AppError';

import { createToken, verifyToken } from './auth.utils';
import { Useres } from '../user/user.model';

interface IJwtPayload {
  email: string;
  role: string;
  name: string;
}
interface ILoginPayload {
  email: string;
  password: string;
}
const loginUser = async (payload:ILoginPayload) => {
  // console.log(payload);
  
  // checking if the user is exist
   const user = await Useres.findOne({email:payload.email});
  //  console.log(user)

   if (!user) {
     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
   }
  // checking if the user is already deleted

  // const isDeleted = user?.isDeleted;

  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  // }

  // checking if the user is blocked

  // const userStatus = user?.status;

  // if (userStatus === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  // }

  //checking if the password is correct

  // if (!(await User.isPasswordMatched(payload?.password, user?.password)))
  //   throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload: IJwtPayload = {
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken: `Bearer ${accessToken}`,
    refreshToken: `Bearer ${refreshToken}`,
  };
};



const refreshToken = async (token: string): Promise<{ accessToken: string }> => {
  // console.log(token);
  // Verifying the given token
  const decoded = verifyToken(token, config.jwt_refresh_secret as string) as IJwtPayload;

  const { email } = decoded;
  // console.log('first', email);

  // Checking if the user exists
  const user = await Useres.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }



  // Create JWT payload
  const jwtPayload: IJwtPayload = { email: user.email, role: user.role, name: user.name };

  // Create a new access token
  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);

  return { accessToken };
};

export const AuthServices = {
  loginUser,

  refreshToken,

};
