import { Button, Dialog, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { ReviewFormInnerContents } from "./Helpers/ReviewFormInnerContents";

export function ReviewForm() {
  const [isModalDisplayed, setIsModalDiasplayed] = useState(false);

  const isMobileDevice = !useMediaQuery("(min-width:600px)");

  if (isMobileDevice) {
    return (
      <>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setIsModalDiasplayed(true)}
        >
          Post review
        </Button>
        <Dialog
          open={isModalDisplayed}
          onClose={() => setIsModalDiasplayed(false)}
        >
          <ReviewFormInnerContents
            closeDialog={() => setIsModalDiasplayed(false)}
          />
        </Dialog>
      </>
    );
  } else {
    return <ReviewFormInnerContents />;
  }
}
