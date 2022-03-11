import * as yup from "yup";

import schemas from "../utils/schema";

export const loginSchema = yup.object({
    email : schemas.email,
    password : schemas.password_min
})
