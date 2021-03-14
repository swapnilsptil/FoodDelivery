import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import Spinner from "../util/spinner/spinner";
import RestaurantInfo from "../components/RestaurantInfo";
import RestaurantItems from "../components/RestaurantItems";
import SearchBar from "../components/SearchBar";
import { fetchRestaurant } from "../redux/actions/dataActions";

export default function Restaurant(props) {
  const restId = props.location.state.restId;
  const { loading } = useSelector((state) => state.data);
  const restaurant = useSelector((state) => state.data.restaurant);
  const { items } = useSelector((state) => state.data.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    if (items) {
      setItemsState(items);
      setFilteredItemsState(items);
    }
  }, [items]);

  const [itemsState, setItemsState] = useState(items ? [] : null);
  const [filteredItemsState, setFilteredItemsState] = useState(
    items ? [] : null
  );

  const handleSearch = (value) => {
    let currentList = [];
    let newList = [];

    if (value !== "") {
      currentList = itemsState;
      newList = currentList.filter((item) => {
        const lc = item.title.toLowerCase();
        const filter = value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = itemsState;
    }
    setFilteredItemsState(newList);
  };

  useEffect(() => {
    dispatch(fetchRestaurant(restId));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <RestaurantInfo {...restaurant} />
          <Grid container direction="row" style={{ marginTop: 40 }}>
            <Grid
              item
              xs={12}
              sm={8}
              style={{
                paddingLeft: "520px",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                noWrap
                style={{ textAlign: "center" }}
              >
                Why starve when you have us&nbsp;&nbsp;
                <span role="img" aria-label="fries" style={{ fontSize: 40 }}>
                  🍟
                </span>
              </Typography>
              <Typography
                variant="body1"
                noWrap
                style={{ textAlign: "center" }}
              >
                Order from wide varieties of different available Items below
              </Typography>
              <br />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{ marginTop: 20, paddingLeft: 40 }}
            >
              <SearchBar page="items" handleSearch={handleSearch} />
            </Grid>
            <RestaurantItems items={filteredItemsState} />
          </Grid>
        </>
      )}
    </>
  );
}
