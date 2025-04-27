import bcryptjs from 'bcryptjs';
import db from '../config/db';
import { createAuthor } from '../models/author.model';

// export const singUpAdminUser = async (userData: any) => {

//   const hashedPassword = await bcryptjs.hash(userData?.password, 10);

//   userData.password = hashedPassword;
//   userData.is_verified = true;
//   userData.is_approve = true;
//   const newUser = new User(userData);

//   const user = await newUser.save();
//   const token = signToken(user.id, user.role, {
//     email: user.email,
//     phone: user.phone ?? '',
//     is_verified: user.is_verified,
//   });

//   return {
//     first_name: user?.first_name,
//     last_name: user?.last_name,
//     email: user?.email,
//     role: user?.role,
//     is_verified: user?.is_verified,
//     is_approve: user?.is_approve,
//     token,
//     profile_image: user?.profile_image,
//     id: user?._id,
//   };
// };

interface Author {
  name: string;
  email: string;
  password: string;
  bio?: string;
  birthdate: string;
}

export const registrationService = async (payload: Author) => {
  const hashedPassword = await bcryptjs.hash(payload?.password, 10);
  payload.password = hashedPassword;

  console.log('bnagla pyaload', payload);

  const newAuthor = await createAuthor(payload);

  console.log('bnalg anew data', newAuthor);

  return newAuthor;
};
