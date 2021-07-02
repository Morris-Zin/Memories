import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles.js";
import { Link } from "react-router-dom";

const PaginationComponent = () => {
  const classes = useStyles();
  return (
    <Pagination
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${1}`}
        ></PaginationItem>
      )}
    />
  );
};

export default PaginationComponent;
