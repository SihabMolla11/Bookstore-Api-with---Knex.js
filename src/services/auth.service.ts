import bcryptjs from 'bcryptjs';
import { AuthorType, createAuthor } from '../models/author.model';

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


export const registrationService = async (payload: AuthorType) => {
  const hashedPassword = await bcryptjs.hash(payload?.password, 10);
  payload.password = hashedPassword;
  const newAuthor = await createAuthor(payload);
  return newAuthor;
};


export const findIsExistingEmail = async (email:string)=>{
  
}