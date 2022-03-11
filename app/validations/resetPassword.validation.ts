import * as yup from "yup"

import schemas from "../utils/schema";

export const resetPasswordSchema = yup.object({
    otp : schemas.code,
    password : schemas.password,
    confirm_password : schemas.confirm_password
})
