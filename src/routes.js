import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import ProductGridLayout from "./ProductLayout/ProductGridLayout";
import ProductPage from "./ProductLayout/ProductPage";

export const Routes = () => {
  return (
    <Router>
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/products" />;
        }}
      />
      <Route path="/products" component={ProductGridLayout} />
      <Route path="/productDetails/:productId" component={ProductPage} />
    </Router>
  );
};
