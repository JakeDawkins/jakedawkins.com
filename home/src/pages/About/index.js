import React from "react";

//components
import SVGIcons from "../../components/SVGIcons";
import PostHeader from "../../components/PostHeader";
import Footer from "../../components/Footer";
import Post from "../../components/Post";

// Load data do display on page
import data from "../../api/data.js";
const aboutData = data.pages.about;

const About = (props) =>
  <div style={{height:"100%"}}>
    <SVGIcons />

    <PostHeader title={aboutData.title} description={aboutData.description} />

    <Post markdown={aboutData.content} />

    <Footer />
  </div>

export default About;
