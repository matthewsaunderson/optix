import React from "react";
import { Button } from "@mui/material";

interface RefreshButtonProps {
  onRefresh: () => void;
  isDisabled: boolean;
}
export function RefreshButton({ onRefresh, isDisabled }: RefreshButtonProps) {
  return (
    <Button
      color="primary"
      variant="contained"
      onClick={onRefresh}
      disabled={isDisabled}
    >
      Refresh
    </Button>
  );
}
