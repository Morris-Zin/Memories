import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({setCurrentId}) => {
  const posts = useSelector((state) => state.posts); 
  const classes = useStyles();
  return (
      !posts.length ? <CircularProgress/> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map(post =>  
            <Grid key={post._id} xs={12} sm={6} item>
                <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
            )}
        </Grid>
      )
  );
};

export default Posts;
