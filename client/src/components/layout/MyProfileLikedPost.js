import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleLikePost, getLikedPosts} from "../../actions/post";
import M from "materialize-css/dist/js/materialize.min.js";

const MyProfileLikedPost = ({
  post: {_id, name, username, avatar, text, likes},
  user,
  toggleLikePost,
  getLikedPosts
}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});

    if (likes.filter(l => l.user === user).length === 1) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes]);

  const onLike = async () => {
    await toggleLikePost(_id);
    getLikedPosts();
  }

  return (
    <div className="post-container">
      <Link to={`/profile/${username}`}>
        <img className="avi-post" src={avatar} alt="avatar"/>
      </Link>
      <div className="post-content">
        <div className="post-user-container">
          <Link to={`/profile/${username}`} className="bold-text m-0 liked-post-link post-name">{name}</Link>&nbsp;&nbsp;
          <Link to={`/profile/${username}`} className="grey-text text-darken-1 m-0 liked-post-link post-name">@{username}</Link>
          &nbsp;<span className="grey-text text-darken-1">&middot;</span>&nbsp;
          <p className="grey-text text-darken-1 m-0 post-name">2h</p>
          <i className="fas fa-angle-down grey-text text-darken-1"/>
        </div>
        <div className="post-text-container">
          <p className="m-0">{text}</p>
        </div>
        <div className="post-actions-container grey-text text-darken-2">
          {/* <span><i className="far fa-clock"/> 12/25/1997</span> */}
          <span><i className="far fa-comment pointer"/></span>
          <span onClick={onLike}>
            {likes.length > 0 && likes.length}&nbsp;
            <i className={!liked ? "far fa-thumbs-up pointer" : "fas fa-thumbs-up pointer"}/>
          </span>
          {/* <span><i className="far fa-trash-alt pointer"/></span> */}
        </div>
      </div>
    </div>
  )
}

export default connect(null, { toggleLikePost, getLikedPosts })(MyProfileLikedPost)
