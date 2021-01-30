import React from 'react';
import { Route, Redirect } from "react-router-dom"
import PropTypes from 'prop-types';
import { connect } from "react-redux";

// ...rest is any custom props that are passed in
const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest  }) => (
  <Route
    { ...rest }
    // if isAuthenticated and loading are false, redirect to login, else load component with any props that are passed in
    render={
      props => !isAuthenticated && !loading ? (
        <Redirect to="/home"/>
      ) : (
        <Component {...props}/>
      )
    }
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(PrivateRoute)
