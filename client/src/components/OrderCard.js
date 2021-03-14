import React from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  Button,
  Paper,
  Typography
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import makeStyles from "@material-ui/core/styles/makeStyles";
import localizedFormat from "dayjs/plugin/localizedFormat";
import SummaryExpansion from "./FilterExpansion";
import { changeOrderStatus, blockUser } from "../redux/actions/dataActions";
import { ROLE_USER, ROLE_SELLER, CANCELLED, BLOCKED, PLACED, ACCEPTED, PROCESSING, IN_ROUTE, DELIVERED, RECEIVED } from '../util/Const';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  title: {
    margin: "20px 0px 10px 260px",
    display: "inline-block",
    marginRight: "40%",
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  address: {
    "& > *": {
      margin: theme.spacing(4),
      width: "25ch",
    },
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
  buttonCancel: {
    backgroundColor: "#cf0700",
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
    "&:disabled": {
      backgroundColor: "#5a5c5a",
      color: "white",
    },
  },
  buttonAccept: {
    backgroundColor: "#118a27",
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}));

const OrderCard = (props) => {
  const order = props.order;
  const role = props.role;
  const classes = useStyles();
  // dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  const dispatch = useDispatch();

  const handleBlock = () => {
    const body = {
      clientId: order.user.userId,
      sellerId: order.seller.sellerId
    };
    dispatch(blockUser(order.user.userId, body, order._id));
  };

  const handleStatus = status => {
    const body = {
      status: status,
    };
    dispatch(changeOrderStatus(order._id, body));
  }

  return (
    <Paper
      style={{
        backgroundColor: "#faf7f7",
        marginRight: 20,
        marginBottom: 20,
      }}
      elevation={4}
    >
      <div style={{ marginLeft: 20 }}>
        <Typography gutterBottom variant="body1" color="textSecondary">
          OrderId - #{order._id}
        </Typography>
        <Typography gutterBottom variant="body1" color="textPrimary">
          {role === ROLE_USER && `Ordered From - ${order.seller.name}`}
          {role === ROLE_SELLER &&
            `Ordered By - ${order.user.name}, +91 ${order.user.address.phoneNo}`}
        </Typography>
        {role === ROLE_USER && (
          <Typography gutterBottom variant="body1" color="textPrimary">
            Call - +91 {order.seller.phone}
          </Typography>
        )}

        {role === ROLE_SELLER && (
          <Typography gutterBottom variant="body1" color="textPrimary">
            {`Address - ${order.user.address.aptName} ${order.user.address.locality}`}
          </Typography>
        )}
        <div style={{ margin: "10px 20px 10px 0px" }}>
          <SummaryExpansion condition="Orders" items={order.items} />
        </div>
        <Typography gutterBottom variant="body1" color="textPrimary">
          Ordered - {dayjs(order.createdAt).format('L LT')}
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FiberManualRecordIcon
            disabled
            className={
              (order.status === CANCELLED || order.status === BLOCKED) ? classes.red : classes.green
            }
          />
          <Typography gutterBottom variant="body1" color="textPrimary">
            Order {order.status} - {dayjs(order.updatedAt).format('L LT')}
          </Typography>
        </div>
        {role === ROLE_USER && order.status === PLACED && (
          <Button
            className={classes.buttonCancel}
            onClick={() => handleStatus(CANCELLED)}
            disabled={order.status !== PLACED}
          >
            Cancel Order
          </Button>
        )}
        {role === ROLE_SELLER && order.status === PLACED && (
          <>
            <div style={{ display: "inline-block" }}>
              {/* <Button className={classes.buttonCancel} onClick={handleCancel}>
                Cancel Order
              </Button> */}
              <Button className={classes.buttonAccept} onClick={() => handleStatus(ACCEPTED)}>
                Accept Order
              </Button>
              <Button className={classes.buttonCancel} onClick={handleBlock}>
                Block Customer
              </Button>
            </div>
          </>
        )}
        {role === ROLE_SELLER && order.status === PROCESSING && (
          <Button className={classes.buttonAccept} onClick={() => handleStatus(IN_ROUTE)}>
            In Route
          </Button>
        )}
        {role === ROLE_SELLER && order.status === ACCEPTED && (
          <Button className={classes.buttonAccept} onClick={() => handleStatus(PROCESSING)}>
            Processing
          </Button>
        )}
        {role === ROLE_SELLER && order.status === IN_ROUTE && (
          <Button className={classes.buttonAccept} onClick={() => handleStatus(DELIVERED)}>
            Order Delivered
          </Button>
        )}
        {role === ROLE_USER && order.status === DELIVERED && (
          <Button className={classes.buttonAccept} onClick={() => handleStatus(RECEIVED)}>
            Order Received
          </Button>
        )}
        <br />
      </div>
    </Paper>
  );
};

export default OrderCard;
