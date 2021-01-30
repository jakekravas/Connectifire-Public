import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getFollowingPosts } from "../../actions/post";
import FeedPost from "../layout/FeedPost";
import loadingGif from "../../img/loading-gif.gif";

const Feed = ({ post: { postsOfFollowing, loading }, authLoading, isAuthenticated, getFollowingPosts }) => {
  
  const [receivedPosts, setReceivedPosts] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!receivedPosts) {
      getFollowingPosts();
      setReceivedPosts(true);
    } else {
      if (postsOfFollowing !== null && postsOfFollowing !== undefined) {
        if (postsOfFollowing.length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false); 
        }
      }
    }
  }, [postsOfFollowing]);

  if (!isAuthenticated && !authLoading) {
    return <Redirect to="/login"/>
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m10 offset-m1">
          <div className="card" id="feed-card">
            {!isEmpty &&
              <div className="card-title center-align">Your Feed</div>
            }
            <div className="card-content card-content-pf-list">
              {loading &&
              <div style={{textAlign:"center"}}>
                {/* <Preloader/> */}
                <img src={loadingGif} alt="loading"/>
              </div>
              }
              {!loading && postsOfFollowing &&
                postsOfFollowing.map(post => (
                  <FeedPost post={post}/>
                ))
              }
              {/* {!loading && postsOfFollowing === null && */}
              {!loading && isEmpty &&
                <div className="center-align">
                  <i className="far fa-comment empty-feed"/>
                  <h4>Your feed is empty</h4>
                  <p>Visit the Connect page to find people to follow</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading,
  post: state.post
});

export default connect(mapStateToProps, { getFollowingPosts })(Feed)
