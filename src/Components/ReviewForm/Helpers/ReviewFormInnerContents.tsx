import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { postReview } from "./postReview";
import { validationSchema } from "./validationSchema";

interface ReviewFormInnerContentsProps {
  closeDialog?: () => void;
}

export function ReviewFormInnerContents({
  closeDialog,
}: ReviewFormInnerContentsProps) {
  const formik = useFormik({
    initialValues: {
      review: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await postReview(values.review);
        if (response.ok) {
          formik.resetForm();
          closeDialog?.();
        }
        alert((await response.json()).message);
      } catch (error: unknown) {
        console.error(error);
        alert("Failed to submit review");
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      style={{
        maxWidth: 500,
        padding: 20,
        margin: 10,
        borderColor: "ActiveBorder",
        borderWidth: "thin",
        borderStyle: "solid",
      }}
    >
      <h2>Post a review</h2>
      <TextField
        fullWidth={true}
        id={"review"}
        label="Review"
        multiline
        value={formik.values.review}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.review && !!formik.errors.review}
        helperText={formik.touched.review && formik.errors.review}
      />

      <Button
        color="primary"
        variant="contained"
        type="submit"
        fullWidth={true}
        disabled={!!formik.errors.review}
      >
        Submit
      </Button>
      <Button
        color="secondary"
        variant="contained"
        type="reset"
        fullWidth={true}
        onClick={() => closeDialog?.()}
      >
        Cancel
      </Button>
    </form>
  );
}
