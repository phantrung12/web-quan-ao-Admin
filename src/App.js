import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/Signup';
import { isUserLoggedIn } from './redux/actions/auth.actions';
import { getInitialData } from './redux/actions/initialData.actions';

import UserChat from './pages/UserChat';
import ImportExport from './pages/ImportExport';
import ProductsList from './pages/Products/products';
import 'antd/dist/antd.min.css';
import Home from './pages/Home/Home';
import CategoryList from './pages/Category/Category';
import UserList from './pages/UserPage/UserPage';
import Orders from './pages/Order/Order';
import Login from './pages/Login/Login';
import ProductDetail from './pages/Products/product-detail';

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

                <PrivateRoute exact path="/orders">
                    <Orders />
                </PrivateRoute>
                <PrivateRoute exact path="/importexport">
                    <ImportExport />
                </PrivateRoute>
                <PrivateRoute exact path="/chats">
                    <UserChat />
                </PrivateRoute>
                <PrivateRoute path="/category">
                    <CategoryList />
                </PrivateRoute>
                <PrivateRoute path="/users">
                    <UserList />
                </PrivateRoute>
                <Route path="/signin">
                    <Login />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
