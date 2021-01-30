import React, { useEffect, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileByUsername, loadProfile } from "../../actions/profile";
import { getPostsByUsername, getLikedPostsOfUser } from "../../actions/post";
import ProfileInfo from "../layout/ProfileInfo";
import ProfilePost from "../layout/ProfilePost";
import LikedPostOfUser from "../layout/LikedPostOfUser";
import Preloader from "../layout/Preloader";
import M from "materialize-css/dist/js/materialize.min.js"

const Profile = ({
  match,
  auth,
  getProfileByUsername,
  getPostsByUsername,
  getLikedPostsOfUser,
  profile: {profileToView, loading, profile},
  post: {postsToView, likedPostsOfUser},postLoading,
  loadProfile
}) => {

  useEffect(() => {
    getProfileByUsername(match.params.id);
    getPostsByUsername(match.params.id);
    // getLikedPostsOfUser(match.params.id);
    if (profile === null) {
      loadProfile();
    }
    let tabElems = document.querySelector('.tabs');
    let modalElems = document.querySelectorAll('.modal');
    M.Tabs.init(tabElems, {});
    M.Modal.init(modalElems, {});
  }, [match.params.username]);

  if (!auth.isAuthenticated) {
    return <Redirect to="/login"/>
  }

  const likeTabClick = () => {
    getLikedPostsOfUser(profileToView.username);
  }

  return (
    <Fragment>
      {/* {loading || profileToView === null || profile === null ? <span>Loading...</span> :  */}
      {loading || profileToView === null || profile === null ?
      <div style={{textAlign:"center"}}><Preloader/></div> : 
      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1">
            <div className="card">
              <ProfileInfo
                profileToView={profileToView}
                profile={profile}
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
                  {/* {postsToView && !postLoading ? postsToView.map(post => (
                    <ProfilePost
                      key={post._id}
                      post={post}
                    />
                  )) : <Preloader/>} */}
                  {postsToView && !postLoading && postsToView.map(post => (
                    <ProfilePost
                      key={post._id}
                      post={post}
                    />
                  ))}
                </div>
                <div id="tab2" className="col s12">
                  {/* {likedPostsOfUser && !postLoading ? likedPostsOfUser.map(post => (
                    <LikedPostOfUser
                      key={post._id}
                      post={post}
                      user={profile.user}
                      pftv={profileToView}
                    />
                  )) : <Preloader/>} */}
                  {likedPostsOfUser && !postLoading && likedPostsOfUser.map(post => (
                    <LikedPostOfUser
                      key={post._id}
                      post={post}
                      user={profile.user}
                      pftv={profileToView}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed-action-btn">
          
        </div>
      </div>
      }
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post,
  postLoading: state.post.loading
})

export default connect(mapStateToProps, { getProfileByUsername, getPostsByUsername, loadProfile, getLikedPostsOfUser })(Profile)
