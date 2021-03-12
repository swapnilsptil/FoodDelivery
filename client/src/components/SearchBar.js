import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  rootHome: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 860,
  },
  rootItems: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: "#edebeb",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    position: "relative",
  },
  iconButton: {
    padding: 10,
  },
}));

export default function CustomizedInputBase({page, handleSearch }) {
  const classes = useStyles();

  const handleSearchFn = (event) => handleSearch(event.target.value);

  return (
    <Paper
      component="form"
      className={page !== "items" ? classes.rootHome : classes.rootItems}
    >
      <InputBase
        className={classes.input}
        placeholder="Search Items"
        onChange={handleSearchFn}
        inputProps={{ "aria-label": "search for items" }}
      />
      <SearchIcon className={classes.iconButton} />
    </Paper>
  );
}
