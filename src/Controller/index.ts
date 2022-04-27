import { signInInit } from "./User/signIn/signIn";
import { signOutInit } from "./User/signOut/signOut";
import { signUpInit } from "./User/signUp/signUp";
import { searchBookInit } from "./Book/searchBook/searchBook";
import { addToShelfInit } from "./Book/addToShelf/addToShelf";
import { getUserBookInit } from "./Book/getUserBooks/getUserBooks";
import { deleteUserBookInit } from "./Book/deleteUserBook/deleteUserBook";
import { authenticatUserInit } from "./User/authenticateUser/authenticateUser";
import { contactUsInit } from "./customerSupport/contactUs/contactUs";

export const signIn = signInInit();
export const signUp = signUpInit();
export const signOut = signOutInit();
export const authenticatUser = authenticatUserInit();

export const searchBook = searchBookInit();
export const addToShelf = addToShelfInit();
export const getUserBooks = getUserBookInit();
export const deleteUserBooks = deleteUserBookInit();

export const contactUs = contactUsInit();
