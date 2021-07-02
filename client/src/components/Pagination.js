import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts.js";

const PaginationComponent = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPage } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  const classes = useStyles();
  return (
    <Pagination
      count={numberOfPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        ></PaginationItem>
      )}
    />
  );
};

export default PaginationComponent;
