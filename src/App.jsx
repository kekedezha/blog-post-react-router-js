import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";

function App() {
  //useNavigate use instantiation to navigate programmatically
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "June 25th, 2024 12:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "June 25th, 2024 12:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "June 25th, 2024 12:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "June 25th, 2024 12:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
  ]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Filter results to include posts that include the search term in the body or title
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    //Set the Search Results which is what will be displayed in the Home component and show them in order from latest post to oldest post
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleDelete = (postId) => {
    //Filter out post that is to be deleted
    const postList = posts.filter((post) => post.id != postId);
    setPosts(postList);
    //once post has been removed then head back to home screen/url
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id,
      title: postTitle,
      datetime,
      body: postBody,
    };

    const newPostsState = [...posts, newPost];
    setPosts(newPostsState);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        {/* Base URL shows the Home component */}
        <Route exact path="" element={<Home posts={searchResults} />} />

        {/* /post URL shows the NewPost component */}
        <Route
          exact
          path="post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />

        {/* /post/:id URL shows details of a specific post through the PostPage component */}
        <Route
          path="post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />

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
