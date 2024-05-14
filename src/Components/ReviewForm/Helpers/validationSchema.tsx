import * as yup from "yup";

export const validationSchema = yup.object({
  review: yup
    .string()
    .required("Review is required")
    .max(100, "Reviews must be less than 100 characters"),
});
