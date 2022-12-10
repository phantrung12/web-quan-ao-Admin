<<<<<<< HEAD
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Category from './pages/Category';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { isUserLoggedIn } from './redux/actions/auth.actions';
import { getInitialData } from './redux/actions/initialData.actions';
import NewPage from './pages/NewPage';
import UserPage from './pages/UserPage';
import UserChat from './pages/UserChat';
import ImportExport from './pages/ImportExport';
import ProductsList from './pages/Products/products';
import 'antd/dist/antd.min.css';
import CategoryList from './pages/Category/Category';
import UserList from './pages/UserPage/UserPage';
=======
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
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
import ProductsList from "./pages/Products/products";
import "antd/dist/antd.min.css";
import Home from "./pages/Home/Home";
>>>>>>> c5f32b6e084a702dc8f48dcbf25aa16bcc12d0b4

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
                    <ProductsList />
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
                <Route path="/cate">
                    <CategoryList />
                </Route>
                <Route path="/user">
                    <UserList />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
