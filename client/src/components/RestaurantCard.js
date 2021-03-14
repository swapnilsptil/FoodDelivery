import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
  cardContent: {
  },
  img: {
    height: 240,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  }
});

export default function RestaurantCard(props) {
  const {
    name,
    tags,
    costForOne,
    minOrderAmount,
    payment,
    imageUrl,
    _id,
  } = props;

  let restUrl = name.split(" ");
  restUrl = restUrl.join("-").toLowerCase();
  const classes = useStyles();
  let paymentString;

  const imagePath = `${process.env.REACT_APP_SERVER_URL}/${imageUrl[0]}`;

  if (payment.length === 1)
    paymentString = `Accepts ${payment[0].toLowerCase()} payment`;

  if (payment.length === 2)
    paymentString = `Accepts ${payment[0].toLowerCase()} & ${payment[1].toLowerCase()} payments`;

  return (
    <Card variant="outlined">
      <img alt="restaurant" className={classes.img} src={imagePath} />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" noWrap>
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
      </CardContent>
      <hr />
      <CardActions>
        <Link
          to={{
            pathname: `order/${restUrl}`,
            state: {
              restId: _id,
            },
          }}
        >
          <Button size="small" color="primary">
            Order Online
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
