import React from "react";

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1698620943272-59963ac1070f?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
        />
      </div>
      <div className="texts">
        <h2>Title: The Dummy Dispatch: Tales from the Typing Tribe</h2>
        <p className="info">
          <a href="" className="author">
            David duzzeta
          </a>
          <time> 2023-01-06 16:55</time>
        </p>
        <p></p>
        <p className="summary">
          In the quietude of a mist-laden morning, the ethereal dance of
          sunlight on dew-kissed petals is a spectacle that transcends the
          ordinary. As the world awakens from its nocturnal slumber, nature
        </p>
      </div>
    </div>
  );
};

export default Post;
