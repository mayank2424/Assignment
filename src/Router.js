import React, { Suspense, lazy } from "react";
import { Router, Switch, Route, Redirect} from "react-router-dom"
import { connect } from 'react-redux';
import { history } from "./history"
import { Spinner } from 'reactstrap';
import { LOGIN_ROUTE, USER_ROUTE, REGISTER_ROUTE } from './allRoutes';

const Login = lazy(() =>
  import("./components/Auth/Login")
)

const UserList = lazy(() =>
  import("./components/User/UserList")
)


const Register = lazy(() =>
    import("./components/Auth/Register")
)

/* 
    Private Auth Route
*/
const AuthRouteConfig = ({ 
    component: Component, 
    user,
    ...rest 
}) => (
    <Route {...rest} render={props => (
         user.isAuthenticated
            ? 
            <Suspense fallback={
                <div className="spinner w-100 h-100 d-flex align-items-center justify-content-center">
                    <Spinner
                        color="primary"
                        type="grow"
                        />
                </div>
            }>
                <Component {...props} />
            </Suspense>
            : 
            <Redirect to={{ pathname: '/login' }} />
    )} />
)

const UnauthRouteConfig = ({ 
    component: Component, 
    user,
    ...rest 
}) => (
    <Route {...rest} render={props => (
        user.isAuthenticated
            ? 
            <Redirect to={{ pathname: '/'}} />
            : 
            <Suspense fallback={
                <div className="spinner w-100 h-100 d-flex align-items-center justify-content-center">
                    <Spinner
                        color="primary"
                        type="grow"
                        />
                </div>
            }>
                <Component {...props} />
            </Suspense>
    )} />
)

const mapStateToProps = state => {
    return {
      user: state.auth.login,
    }
  }


const ProtectedRoute = connect(mapStateToProps)(AuthRouteConfig);
const UnauthRoute = connect(mapStateToProps)(UnauthRouteConfig);


class AppRouter extends React.Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        component={UserList}
                        title={"Dashboard"}
                    />
                    <UnauthRoute
                        path={LOGIN_ROUTE}
                        component={Login}
                        title={"Login"}
                    />    
                    <UnauthRoute
                        path={REGISTER_ROUTE}
                        component={Register}
                        title={"Register"}
                    />    
                    
                </Switch>
          </Router>
        )
    }
}


export default connect(mapStateToProps)(AppRouter)