import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import HomeStart from "../components/HomeStart";
import Spinner from "../util/spinner/spinner";
import RestaurantContent from "../components/RestaurantContent";
import { fetchRestaurants } from "../redux/actions/dataActions";
import { ROLE_SELLER } from "../util/Const";

const useStyles = makeStyles(() => ({
  center: {
    textAlign: "center",
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.data);
  const {
    account: { role },
    authenticated,
  } = useSelector((state) => state.auth);

  useEffect(()=>{
    dispatch(fetchRestaurants());
  },[dispatch]);

  
  return (
    <>
      {authenticated && role === ROLE_SELLER ? (
        <Redirect to="/seller/dashboard" />
      ) : (
        <>
          <HomeStart />
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h5" className={classes.center} noWrap>
                Your favourite food, delivered with Toptal&nbsp;&nbsp;
                <span style={{ fontSize: 40 }}>🍽</span>
              </Typography>
            </Grid>
            <Grid item container>
              <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={10}>
                {loading ? <Spinner /> : <RestaurantContent />}
              </Grid>
              <Grid item xs={false} sm={1} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
