import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/auth-context";

export function ratingGenerator(rating) {
  let ratingArray = [];
  for (let i = 0; i < rating; i++) {
    ratingArray = ratingArray.concat(i);
  }

  return ratingArray;
}

export function findItemById(product, state) {
  return !!state.find((item) => item.product._id === product._id);
}

export function PrivateRoute({ path, ...rest }) {
  const { isUserLoggedIn } = useAuth();
  return isUserLoggedIn ? (
    <Route path={path} {...rest} />
  ) : (
    <Navigate state={{ from: path }} to="login" replace />
  );
}
