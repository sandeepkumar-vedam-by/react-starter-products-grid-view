import React, { useState, useEffect } from "react";
import { Paper, Box, Typography, IconButton, Grid } from "@material-ui/core";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import InfiniteCarousel from "react-leaf-carousel";
import { useStyles } from "./styles";
import { PRODUCT_PAGE_API_URL } from "../constants";
import { MuiCircularProgress } from "./CircularProgress";

function ProductPage() {
  const classes = useStyles();
  const { productId } = useParams();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [productData, setProductData] = useState();
  const [hasError, setErrorStatus] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(PRODUCT_PAGE_API_URL + productId)
      .then((response) => response.data)
      .then((data) => {
        const updatedProduct = data || {};
        setErrorStatus(false);
        setProductData(updatedProduct);
      })
      .catch((error) => {
        setErrorStatus(true);
        console.error("Error while fetching records", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  const onProductDetails = (product) => {
    let path = `newPath`;
    history.push(path);
  };

  const renderImagesSlider = () => {
    const images =
      Array.isArray(productData.media.images.urls) &&
      productData.media.images.urls.length > 0
        ? productData.media.images.urls
        : [];
    return (
      <InfiniteCarousel dots={true} showSides={false} scrollOnDevice={true}>
        {images.map((image) => {
          return (
            <div>
              <img className={classes.image} src={image} alt={"image"} />
            </div>
          );
        })}
      </InfiniteCarousel>
    );
  };

  const renderProductDetails = () => {
    return (
      <Grid
        className={classes.productPageGrid}
        container
        direction="row"
        justify="center"
        alignItems="stretch"
      >
        <Grid item>{renderImagesSlider()}</Grid>
        <Grid item>
          <Typography align="left" component="h5">
            <Box fontWeight="fontWeightMedium">£{productData.price.now}</Box>
          </Typography>
          {productData.displaySpecialOffer && (
            <Typography align="left" color="error">
              {productData.displaySpecialOffer}
            </Typography>
          )}
          {productData.additionalServices && (
            <Typography variant="p" component="span">
              {Array.isArray(
                productData.additionalServices?.includedServices
              ) &&
                productData.additionalServices?.includedServices.length > 0 &&
                productData.additionalServices?.includedServices[0]}
            </Typography>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <Box className={classes.pageBackground} p={0}>
      <Box p={1} display="flex">
        <IconButton
          aria-label="back"
          size="small"
          onClick={() => {
            history.push("/");
          }}
        >
          <ArrowBackIos fontSize="inherit" />
        </IconButton>
        <Typography variant="p" component="div" className={classes.centerText}>
          {productData?.title}
        </Typography>
      </Box>
      <Paper
        className={classes.listContainer}
        elevation={0}
        variant="outlined"
        square
        p={0}
      >
        {isLoading && <MuiCircularProgress />}
        {!isLoading && productData && renderProductDetails()}
        {hasError && !isLoading && (
          <Typography
            color="error"
            className={classes.alignCenter}
            align="center"
          >
            Error while fetching product details.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default ProductPage;
