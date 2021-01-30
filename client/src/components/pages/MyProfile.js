import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import MyProfilePost from "../layout/MyProfilePost";
import MyProfileLikedPost from "../layout/MyProfileLikedPost";
import MyProfileInfo from "../layout/MyProfileInfo";
import { getLoggedInPosts, getLikedPosts } from "../../actions/post";
import Preloader from "../layout/Preloader";
import M from "materialize-css/dist/js/materialize.min.js";
import Modal from "../layout/Modal";

const MyProfile = ({
  getLoggedInPosts,
  getLikedPosts,
  isAuthenticated,
  postLoading,
  authLoading,
  loading,
  profile,
  post: {posts, likedPosts}
}) => {
  
  useEffect(() => {
    let tabElems = document.querySelector('.tabs');
    let modalElems = document.querySelectorAll('.modal');
    M.Tabs.init(tabElems, {});
    M.Modal.init(modalElems, {});
    if (!loading && profile.profile !== null) {
      getLoggedInPosts(profile.profile.user);
      getLikedPosts();
    }
  }, [loading]);

  const likeTabClick = () => {
    getLikedPosts();
  }

  // Redirect user to login page if they're not logged in 
  if (!isAuthenticated && !authLoading) {
    return <Redirect to="/login"/>
  }

  if (loading) {
    return <Preloader/>
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m10 offset-m1">
          <div className="card">
            <MyProfileInfo
              profile={profile.profile}
            />
            <div className="row">
              <div className="col s12">
                <ul className="tabs">
                  <li className="tab col s6">
                    <a href="#tab1">Posts</a>
                  </li>
                  <li onClick={likeTabClick} className="tab col s6">
                    <a href="#tab2">Likes</a>
                  </li>
                </ul>
              </div>
              <div id="tab1" className="col s12">
                {posts && !postLoading ? posts.map(post => (
                  <MyProfilePost
                    key={post._id}
                    post={post}
                    profile={profile.profile}
                  />
                  )) : <Preloader/>}
              </div>
              <div id="tab2" className="col s12">
                {likedPosts && !postLoading ? likedPosts.map(post => (
                  <MyProfileLikedPost
                  key={post._id}
                  post={post}
                  user={profile.profile.user}
                  />
                )) : <Preloader/>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed-action-btn">
        <Modal profile={profile.profile}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading,
  loading: state.profile.loading,
  profile: state.profile,
  post: state.post,
  postLoading: state.post.loading
});

export default connect(mapStateToProps, { getLoggedInPosts, getLikedPosts })(MyProfile)
