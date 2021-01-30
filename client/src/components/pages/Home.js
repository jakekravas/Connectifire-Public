import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Preloader from "../layout/Preloader";

const Home = ({
  profile,
  loading,
  isAuthenticated
}) => {
  
  if (!loading && isAuthenticated && profile.profile === null) {
    return <Redirect to="/createprofile"/>
  }

  if (!loading && isAuthenticated && profile.profile !== null) {
    return <Redirect to="/feed"/>
  }

  if (isAuthenticated === null) {
    return <Redirect to="/login"/>
  }

  return <Preloader/>
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.profile.loading,
  profile: state.profile
});

export default connect(mapStateToProps, {})(Home)
