import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import openSocket from "socket.io-client";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import useForm from "../hooks/forms";
import ItemDialog from "../components/ItemDialog";
import RestaurantInfo from "../components/RestaurantInfo";
import RestaurantItems from "../components/RestaurantItems";
import { addItem } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    width: "40%",
    margin: "40px 0 0 30%",
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SellerDashboard() {
  const classes = useStyles();
  const sellerData = useSelector((state) => state.auth);
  const [openOrderBar, setOpenOrderBar] = useState(false);
  const { items, _id } = sellerData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (items) {
      setFilteredItemsState(items);
    }
  }, [items]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_SERVER_URL);
    socket.emit("add-user", { userId: _id });
    socket.on("orders", (data) => {
      if (data.action === "create") {
        setOpenOrderBar(true);
      }
    });
  }, [_id]);

  const [filteredItemsState, setFilteredItemsState] = useState(
    items ? [] : null
  );
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({});
  const { inputs, handleInputChange } = useForm({
    title: "",
    description: "",
    price: "",
  });

  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    inputs.title = "";
    inputs.description = "";
    inputs.price = "";
    setImage(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    const itemData = new FormData();
    itemData.append("image", image);
    itemData.append("title", inputs.title);
    itemData.append("description", inputs.description);
    itemData.append("price", inputs.price);
    dispatch(addItem(itemData));
    if(inputs.title && inputs.description && inputs.price && image){
      handleClose();
    }
  };

  return (
    <>
      <RestaurantInfo {...sellerData} />
      <Grid container direction="row" style={{ marginTop: 40 }}>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={12}>
          <Typography
            gutterBottom
            variant="h5"
            style={{ textAlign: "center", marginBottom: 30 }}
            noWrap
          >
            Add, Edit, Delete Items in your Restaurant&nbsp;&nbsp;
            <span role="img" aria-label="burger" style={{ fontSize: 40 }}>
              🍜
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={1} />
        <RestaurantItems items={filteredItemsState} />
      </Grid>
      <Button fullWidth className={classes.button} onClick={handleOpen}>
        Add Item
      </Button>
      <ItemDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        inputs={inputs}
        handleInputChange={handleInputChange}
      />
      <div className={classes.snackbar}>
        <Snackbar
          open={openOrderBar}
          autoHideDuration={3600}
          onClose={()=>setOpenOrderBar(false)}
        >
          <Alert
            onClose={()=>setOpenOrderBar(false)}
            style={{ backgroundColor: "#157a21" }}
          >
            New order received.
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
