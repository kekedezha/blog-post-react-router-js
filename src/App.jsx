import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";

function App() {
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        {/* Base URL shows the Home component */}
        <Route exact path="" element={<Home />} />

        {/* /post URL shows the NewPost component */}
        <Route exact path="post" element={<NewPost />} />

        {/* /post/:id URL shows details of a specific post through the PostPage component */}
        <Route path="post/:id" element={<PostPage />} />

        {/* /about URL shows the About component */}
        <Route path="about" element={<About />} />

        {/* Wild card to catch any other path that may be entered as a url for this website. Redirected to Missing component. */}
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
