import React from "react";
import { useSelector } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Typography, Grid } from "@material-ui/core";
import Spinner from "../util/spinner/spinner";

const useStyles = makeStyles({
  borderBottom: {
    borderBottom: "2px solid #000",
    position: "absolute",
    top: "25.5%",
    left: "6.5%",
    bottom: 0,
    height: "40%",
    width: "44%",
  },
  borderLeft: {
    borderLeft: "2px solid #000",
    position: "absolute",
    top: "25.5%",
    left: "6.5%",
    bottom: 0,
    height: "40%",
  },
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  img: {
    height: 240,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  }
});

function Restaurant(props) {
  const classes = useStyles();
  const { loading } = useSelector((state) => state.data);
  const {
    name,
    imageUrl,
    tags,
    costForOne,
    minOrderAmount,
    payment,
    address,
  } = props;
  let paymentString;
  let phoneNo;
  let addressString;

  if (address) {
    phoneNo = address.phoneNo;
    addressString = `${address.aptName}, ${address.locality}, ${address.street}`;
  }

  if (payment ? payment.length === 1 : null)
    paymentString = `Accepts ${payment[0].toLowerCase()} payment`;

  if (payment ? payment.length === 2 : null)
    paymentString = `Accepts ${payment[0].toLowerCase()} & ${payment[1].toLowerCase()} payments`;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Grid container direction="row">
            <Grid item xs={false} sm={1} />
            <Grid item xs={12} sm={6} style={{ marginTop: 120 }}>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                style={{ fontStyle: "bold" }}
              >
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {tags}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Costs Rs.{costForOne} for one
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Minimum order Rs.{minOrderAmount}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                {paymentString}
              </Typography>
              <br />
              <Typography variant="body2" color="textPrimary">
                Address: {addressString}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Call: +91 {phoneNo}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Dine-In Timing: 10AM to 10PM
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: 34 }}>
              {imageUrl ? (
                <img className={classes.img} alt="restaurant" src={`${process.env.REACT_APP_SERVER_URL}/${imageUrl[0]}`} />
              ) : null}
            </Grid>
            <Grid item xs={false} sm={1} />
          </Grid>
        </>
      )}
    </>
  );
}

export default React.memo(Restaurant);
