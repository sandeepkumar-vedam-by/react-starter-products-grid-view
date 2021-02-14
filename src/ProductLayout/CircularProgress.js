import React from "react";
import { Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  progressIcon: {
    position: "absolute",
    textAlign: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

export const MuiCircularProgress = (props) => {
  const classes = useStyles();
  const { loaderMessage, loaderSize, className } = props;
  return (
    <Box
      className={
        Boolean(className)
          ? clsx(classes.progressIcon, className)
          : classes.progressIcon
      }
    >
      <CircularProgress variant="indeterminate" size={loaderSize || "3rem"} />
      {loaderMessage && (
        <Typography variant="body1">{loaderMessage}</Typography>
      )}
    </Box>
  );
};
