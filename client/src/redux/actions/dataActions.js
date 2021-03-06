import {
  SET_RESTAURANTS,
  LOADING_DATA,
  SET_RESTAURANT,
  LOADING_UI,
  SET_ERROR_ITEM,
  SERVER_ERROR,
  CLEAR_ERRORS,
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  ADD_CART_SUCCESS,
  ADD_CART_FAIL,
  SET_CART,
  DELETE_ITEM_CART,
  SET_ERRORS,
  SET_ORDERS,
  EDIT_STATUS,
  BLOCKED_USER
} from "../types";
import axios from "../../util/axios";
import { getUserData } from "./authActions";

export const fetchRestaurants = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/restaurants")
    .then((res) => {
      dispatch({
        type: SET_RESTAURANTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_RESTAURANTS,
        payload: [],
      });
    });
};

export const fetchRestaurant = (restId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/restaurant/${restId}`)
    .then((res) => {
      dispatch({
        type: SET_RESTAURANT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_RESTAURANT,
        payload: {},
      });
    });
};

export const addItem = (itemData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/seller/create-item`, itemData)
    .then((res) => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data.item,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERROR_ITEM,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const deleteItem = (itemId) => (dispatch) => {
  axios
    .delete(`/seller/delete-item/${itemId}`)
    .then((res) => {
      dispatch({
        type: DELETE_ITEM,
        payload: itemId,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const editItem = (itemData, itemId) => (dispatch) => {
  axios
    .put(`/seller/edit-item/${itemId}`, itemData)
    .then((res) => {
      dispatch({
        type: EDIT_ITEM,
        payload: res.data.item,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERROR_ITEM,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const addToCart = (itemData) => (dispatch) => {
  axios
    .post("/cart", itemData)
    .then((res) => {
      dispatch({
        type: ADD_CART_SUCCESS,
        payload: itemData.itemId,
      });
      dispatch(getCart());
    })
    .catch((err) => {
      dispatch({
        type: ADD_CART_FAIL,
      });
    });
};

export const clearUserCart = (itemData) => (dispatch) => {
  axios
    .post("/clearUserCart")
    .then((res) => {
      dispatch(addToCart(itemData));
    })
    .catch((err) => {
      dispatch({
        type: ADD_CART_FAIL,
      });
    });
};

export const getCart = () => (dispatch) => {
  axios
    .get("/cart")
    .then((res) => {
      dispatch({
        type: SET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_CART,
        payload: [],
      });
    });
};

export const deleteCartItem = (itemData) => (dispatch) => {
  axios
    .post("/delete-cart-item", itemData)
    .then((res) => {
      dispatch({
        type: DELETE_ITEM_CART,
      });
      dispatch(getCart());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const removeCartItem = (itemID) => (dispatch) => {
  axios
    .post(`/remove-cart-item/${itemID}`)
    .then((res) => {
      dispatch(getCart());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const fetchAddress = (userData, history) => (dispatch) => {
  dispatch(addAddress(userData, history));
};

export const addAddress = (userData, history) => (dispatch) => {
  axios
    .post("/user/address", userData)
    .then((res) => {
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch(placeOrder(history));
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const placeOrder = (history) => (dispatch) => {
  axios
    .post("/order")
    .then((res) => {
      if (res.status === 200) {
        history.push("/orders");
        dispatch(getOrders());
        dispatch(getCart());
      } else {
        dispatch({
          type: BLOCKED_USER,
          payload: res.data
        });
        dispatch(getCart());
      }
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const getOrders = (history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/orders")
    .then((res) => {
      dispatch({
        type: SET_ORDERS,
        payload: res.data.orders,
      });
    })
    .catch((err) => {
      console.log(err.response);
      history.push("/");
    });
};

export const changeOrderStatus = (orderId, body) => (dispatch) => {
  axios
    .post(`/order-status/${orderId}`, body)
    .then((res) => {
      dispatch({
        type: EDIT_STATUS,
        payload: res.data.updatedOrder,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const blockUser = (userId, body, id) => (dispatch) => {
  axios
    .post(`/blocked/${userId}`, body)
    .then((res) => {
      const body = {
        status: "Blocked",
      };
      dispatch(changeOrderStatus(id, body));
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const socketStatusUpdate = (order) => (dispatch) => {
  dispatch({
    type: EDIT_STATUS,
    payload: order,
  });
};
