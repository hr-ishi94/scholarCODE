import * as Yup from 'yup';

export const userSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password:Yup.string().required().min(5),
    confirm_password:Yup.string().required("confirm password is required")
    .oneOf([Yup.ref('password')],'Passwords must match')
})