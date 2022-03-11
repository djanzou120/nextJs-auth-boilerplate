import * as yup from "yup";

import schemas from "../utils/schema";

export const forgotPasswordSchema = yup.object({
    email : schemas.email
})
