import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { isUserLoggedIn } from "./redux/actions/auth.actions";
import { getInitialData } from "./redux/actions/initialData.actions";
import NewPage from "./pages/NewPage";
import UserPage from "./pages/UserPage";
import UserChat from "./pages/UserChat";
import ImportExport from "./pages/ImportExport";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/products">
          <Products />
        </PrivateRoute>
        <PrivateRoute exact path="/page">
          <NewPage />
        </PrivateRoute>
        <PrivateRoute exact path="/orders">
          <Orders />
        </PrivateRoute>
        <PrivateRoute exact path="/category">
          <Category />
        </PrivateRoute>
        <PrivateRoute exact path="/users">
          <UserPage />
        </PrivateRoute>
        <PrivateRoute exact path="/importexport">
          <ImportExport />
        </PrivateRoute>
        <PrivateRoute exact path="/chats">
          <UserChat />
        </PrivateRoute>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
