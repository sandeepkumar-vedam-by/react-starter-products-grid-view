import React from "react";
import Container from "@material-ui/core/Container";
import { AppStyles } from "./AppStyles";
import { Routes } from "./routes";

export default function App() {
  const classes = AppStyles();
  return (
    <Container className={classes.appContainer}>
      <Routes />
    </Container>
  );
}
