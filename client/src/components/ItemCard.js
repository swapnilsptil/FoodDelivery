import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Snackbar
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import useForm from "../hooks/forms";
import MyButton from "../util/MyButton";
import { deleteItem, editItem } from "../redux/actions/dataActions";
import ItemDialog from "../components/ItemDialog";
import { addToCart, clearUserCart } from "../redux/actions/dataActions";
import { ROLE_SELLER } from "../util/Const";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    height: "180px",
    width: "50%",
  },
  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ItemCard(props) {
  const classes = useStyles();
  const { title, imageUrl, description, price, _id, creator } = props;
  const imageUrlSplit = imageUrl.split("\\");
  const finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrlSplit[0]}`;

  const dispatch = useDispatch();

  const {
    authenticated,
    account: { role },
  } = useSelector((state) => state.auth);
  const { addCartSuccess, cart } = useSelector((state) => state.data);

  const [open, setOpen] = useState(false);
  const [openSnackBar, setSnackBar] = useState(false);
  const [image, setImage] = useState(null);
  const { inputs, handleInputChange } = useForm({
    title: "",
    description: "",
    price: "",
  });

  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
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
    if (image !== null) itemData.append("image", image);
    else itemData.append("image", imageUrl);
    itemData.append("title", inputs.title);
    itemData.append("description", inputs.description);
    itemData.append("price", inputs.price);
    dispatch(editItem(itemData, _id)); // eslint-disable-next-line
    handleClose();
  };

  const openEdit = () => {
    inputs.title = title;
    inputs.price = price;
    inputs.description = description;
    setOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteItem(_id));
  };

  const handleCart = () => {
    let isDiffRest = false;
    cart.forEach(cartItem => {
      const { itemId } = cartItem;
      if (itemId.creator !== creator) {
        isDiffRest = true;
      }
    })

    const itemData = {
      itemId: _id,
    };
    if (!isDiffRest) {
      dispatch(addToCart(itemData));
    } else {
      const confirmation = window.confirm("You have items in cart from different Restaurant. Do you want to clear cart before adding item ?");
      if (confirmation) {
        dispatch(clearUserCart(itemData));
      }
    }

  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      setSnackBar(false);
      return;
    }

    setSnackBar(false);
  };

  const handleSnackBar = (event, reason) => {
    if (addCartSuccess || addCartSuccess == null) setSnackBar(true);
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" noWrap>
              {description}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Rs.{price}
            </Typography>
          </CardContent>
          {role === ROLE_SELLER ? (
            <div style={{ textAlign: "center" }}>
              <MyButton tip="Edit" onClick={openEdit}>
                <EditIcon style={{ color: "green" }} />
              </MyButton>
              <MyButton tip="Delete" onClick={handleDelete}>
                <DeleteIcon style={{ color: "#f44336" }} />
              </MyButton>
            </div>
          ) : authenticated ? (
            <Button
              color="secondary"
              style={{
                color: "#000",
                margin: "16px",
              }}
              onClick={() => {
                handleCart();
                handleSnackBar();
              }}
              variant="contained"
            >
              Add to Cart
            </Button>
          ) : (
            <Link to="/login">
              <Button
                color="secondary"
                style={{
                  color: "#000",
                  margin: "16px",
                }}
                variant="contained"
              >
                Add to Cart
              </Button>
            </Link>
          )}
        </div>
        <CardMedia
          className={classes.cover}
          image={finalImageUrl}
          title="Item order"
        />
      </Card>
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
          open={openSnackBar}
          autoHideDuration={3600}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            style={{ backgroundColor: "#157a21" }}
          >
            Item added to cart!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
