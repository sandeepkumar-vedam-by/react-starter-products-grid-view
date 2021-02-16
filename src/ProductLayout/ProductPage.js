import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Grid,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import Carousel from "react-material-ui-carousel";
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

  const width = window.innerWidth;
  // The width below which the mobile view should be rendered
  const breakpoint = 620;

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

  const renderImagesSlider = () => {
    const images =
      Array.isArray(productData.media.images.urls) &&
      productData.media.images.urls.length > 0
        ? productData.media.images.urls
        : [];
    return (
      <Carousel autoPlay={false}>
        {images.map((image) => {
          return <img className={classes.image} src={image} alt={"image"} />;
        })}
      </Carousel>
    );
  };

  const renderProductInfo = () => {
    return (
      <div className={classes.padding}>
        <Typography variant="h5" component="h5">
          Product Information
        </Typography>
        <Typography variant="p" component="span">
          Product Code: {productData.productId}
        </Typography>
        <div
          dangerouslySetInnerHTML={{
            __html: productData.details.productInformation,
          }}
        ></div>
      </div>
    );
  };

  const renderProductSpecification = () => {
    const specifications = productData.details.features[0].attributes;
    return (
      <div className={classes.padding}>
        <Typography
          variant="h5"
          component="h5"
          className={classes.paddingBottom}
        >
          Product Specification
        </Typography>
        {specifications.map((item) => {
          return (
            <React.Fragment>
              <Divider />
              <div key={item.name} className={classes.paddingTopBottom}>
                <Typography variant="p" component="span">
                  {item.name}
                </Typography>
                <Typography
                  className={classes.rightAlign}
                  variant="p"
                  component="span"
                >
                  {item.value}
                </Typography>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderProductPricing = () => {
    return (
      <React.Fragment>
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
            {Array.isArray(productData.additionalServices?.includedServices) &&
              productData.additionalServices?.includedServices.length > 0 &&
              productData.additionalServices?.includedServices[0]}
          </Typography>
        )}
      </React.Fragment>
    );
  };

  const renderProductDetails = () => {
    return (
      <Grid className={classes.productPageGrid} container spacing={1}>
        <Grid item xs spacing={2}>
          {renderImagesSlider()}
          {width < breakpoint && (
            <div className={classes.padding}>{renderProductPricing()}</div>
          )}
          {renderProductInfo()}
          <Divider />
          {renderProductSpecification()}
        </Grid>
        {width >= breakpoint && (
          <Grid item xs spacing={2}>
            {renderProductPricing()}
          </Grid>
        )}
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
