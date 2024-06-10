import { z } from "zod";

// single Input Schema
const userNameSchema = z.string({message:"Username must be string"}).min(4,{message:"Username at least 4 characters"}).max(100,{message:"username so long"});
const emailSchema = z.string().email({message:"Invalid email address"}).min(10,{message:"Email address must be at least 10 characters"}).max(80,{message:"Email address so long"}).trim()
const passwordSchema = z.string().min(8,{message:"Password must be at least 8 Characters"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, { message: 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one symbol (!@#$%^&*)' }).trim()

// Validation Schema
export const registerValidationSchema = z.object({
    username: userNameSchema,
    email:emailSchema,
    password:passwordSchema
});

const loginValidationSchema = z.object({
    email:emailSchema,
    password:passwordSchema
})
