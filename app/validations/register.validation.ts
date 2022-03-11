import * as yup from "yup";

import schemas from "../utils/schema";

export const registerSchema = yup.object({
    firstname : schemas.firstname,
    lastname : schemas.lastname,
    email : schemas.email,
    password : schemas.password,
    confirm_password : schemas.confirm_password
})
