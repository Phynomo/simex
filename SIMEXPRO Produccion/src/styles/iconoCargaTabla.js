import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid/Grid";

const LoadingIcon = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (showLoading) {
    return (
      <Grid
        container
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        marginY={'10px'}
      >
        <Grid item xs={12}>
          <CircularProgress style={{ color: "#634a9e" }} />
        </Grid>
        <Grid item xs={12}>
          Cargando...
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default LoadingIcon;
