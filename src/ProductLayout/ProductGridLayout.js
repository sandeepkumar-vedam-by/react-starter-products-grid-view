import React, { useState, useEffect } from "react";
import { Paper, Box, Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";
import { PRODUCT_LIST_API_URL } from "../constants";
import { MuiCircularProgress } from "./CircularProgress";

function ProductGridLayout() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasError, setErrorStatus] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(PRODUCT_LIST_API_URL)
      .then((response) => response.data)
      .then((data) => {
        const updatedProducts = data.products || [];
        setErrorStatus(false);
        setProducts(updatedProducts);
      })
      .catch((error) => {
        setErrorStatus(true);
        console.error("Error while fetching records", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onProductDetails = (product) => {
    let path = `/productDetails/${product.productId}`;
    history.push(path);
  };

  const renderGridList = () => {
    return (
      <div className={classes.gridList}>
        {products.map((product) => (
          <Box
            className={classes.gridItem}
            key={product.productId}
            onClick={() => onProductDetails(product)}
          >
            <img src={product.image} alt={product.title} />
            <Typography variant="p" component="div" align="left">
              {product.title}
            </Typography>
            <Box fontWeight="fontWeightMedium">£{product.price.now}</Box>
          </Box>
        ))}
      </div>
    );
  };

  return (
    <Box className={classes.pageBackground} p={0}>
      <Box p={1}>
        <Typography
          variant="p"
          component="div"
          align="center"
          className={classes.centerText}
        >
          {`Dishwashers (${products.length})`}
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
        {!isLoading && products.length > 0 && renderGridList()}
        {hasError && !isLoading && (
          <Typography
            color="error"
            className={classes.alignCenter}
            align="center"
          >
            Error while fetching products.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default ProductGridLayout;
