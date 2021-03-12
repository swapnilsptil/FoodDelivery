import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import coverNew from "../images/food-delivery.png";

const useStyles = makeStyles((theme) => ({
  presentation: {
    display: "flex",
    width: "90%",
    margin: "auto",
    minHeight: "80vh",
    alignItems: "center",
    // eslint-disable-next-line
    ["@media (max-width:1024px)"]: {
      flexDirection: "column",
    },
  },
  introduction: {
    flex: 1,
    paddingLeft: 60,
    height: "340px",
  },
  safeFood: {
    fontSize: 64,
    fontWeight: 400,
  },
  delivery: {
    color: "#157a21",
    fontSize: 64,
    fontWeight: "bold",
    marginTop: -30,
    marginBottom: 20,
  },
  paragraph: {
    width: 400,
    fontSize: 14.5,
  },
  cover: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    height: "72vh",
  },
  coverImg: {
    height: "100%",
  },
  ctaOrder: {
    fontSize: 18,
    backgroundColor: "#f7a692",
    marginTop: 30,
  },
}));

const HomeStart = () => {
  const classes = useStyles();
  return (
    <section className={classes.presentation}>
      <div className={classes.introduction}>
        <Typography className={classes.safeFood} noWrap>
          Food
        </Typography>
        <Typography className={classes.delivery} noWrap>
          DELIVERY
        </Typography>
        <Typography variant="inherit" className={classes.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.
        </Typography>
      </div>
      <div className={classes.cover}>
        <img src={coverNew} alt="safe-delivery" className={classes.coverImg} />
      </div>
    </section>
  );
};

export default React.memo(HomeStart);
