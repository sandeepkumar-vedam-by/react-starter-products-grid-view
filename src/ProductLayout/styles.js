import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
  return {
    pageBackground: {
      backgroundColor: "#eceff1",
    },
    noPadding: {
      padding: theme.spacing(0),
    },
    listContainer: {
      width: "100%",
      height: "100%",
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "100%",
      height: "500px",
      overflowY: "auto",
      display: "flex",
      flexWrap: "wrap",
      backgroundColor: theme.palette.background.paper,
    },
    gridItem: {
      flex: "1 0 21%",
      margin: 0,
      padding: "16px",
      height: "250px",
      border: "1px solid rgba(0, 0, 0, 0.12)",
      "& img": {
        height: "175px",
        display: "flex",
        margin: "auto",
      },
      cursor: "pointer",
    },
    image: {
      height: "175px",
      display: "flex",
      margin: "auto",
    },
    productPageGrid: {
      width: "100%",
      height: "100%",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    centerText: {
      display: "flex",
      margin: "auto",
      textAlign: "center",
      justifyContent: "center",
    },
    alignCenter: {
      position: "absolute",
      textAlign: "center",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    productBorder: {
      border: "1px solid rgba(0, 0, 0, 0.12)",
      "& .MuiGridListTile-tile": {
        height: "185px",
        padding: theme.spacing(2),
      },
    },
    padding: {
      padding: theme.spacing(2),
    },
    paddingTopBottom: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    paddingBottom: {
      paddingBottom: theme.spacing(2),
    },
    rightAlign: {
      float: "right",
    },
  };
});
