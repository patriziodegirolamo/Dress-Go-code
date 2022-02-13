import React from "react";
import PropTypes from "prop-types";

function YoutubeEmbed(props){
  return <div className="video-responsive">
    <iframe
      src={"https://www.youtube.com/embed/" + props.embedId}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
}

export default YoutubeEmbed;