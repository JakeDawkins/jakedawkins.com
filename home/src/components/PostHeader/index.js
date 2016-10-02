import React from "react";
import "../Header/header.scss";

//given unix timestamp
const renderDate = (dateTime) => {
  let date = new Date(dateTime);

  let month = date.getMonth()+1;
  let day = date.getDate();
  let year = date.getFullYear();
  let dateString = `${month} - ${day} - ${year}`;

  return <time itemProp="datePublished" dateTime={dateTime} className="date">{dateString}</time>
}

const PostHeader = (props) => (
  <header className="header-post" role="banner">
      <div className="content">
          {renderDate(props.dateTime)}
          <h1 className="post-title" itemProp="name">{props.title}</h1>
          <p itemProp="description" className="subtitle">{props.description}</p>
      </div>
       <a className="down" data-scroll href="#scroll"><svg className="icon icon-angle-down"><use xlinkHref="#icon-angle-down"></use></svg></a>
  </header>
);

export default PostHeader;
