import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "./api/posts";
import useWindowSize from "./hooks/useWindowSize";

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import EditPost from "./EditPost";

function App() {
  //useNavigate use instantiation to navigate programmatically
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { width } = useWindowSize();

  //useEffect used for CRUD operation READ, to READ posts from json server
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // if not in 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchPosts();
  }, []);

  //useEffect used to search results from all posts
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

  const handleUpdate = async (postId) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const postUpdates = {
      postId,
      title: editTitle,
      datetime,
      body: editBody,
    };
    try {
      //use axios' PUT call to updated entire post. PATCH would have been used if we were only updating certain fields
      const response = await api.put(`/posts/${postId}`, postUpdates);
      //Use map to return a new array with only the 'updated post' updated in the array
      setPosts(
        posts.map((post) => (post.id === postId ? { ...response.data } : post))
      );
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  //CRUD operation DELETE
  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      //Filter out post that is to be deleted
      const postList = posts.filter((post) => post.id != postId);
      setPosts(postList);
      //once post has been removed then head back to home screen/url
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  //CRUD operation CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id,
      title: postTitle,
      datetime,
      body: postBody,
    };

    try {
      const response = await api.post("/posts", newPost);
      const newPostsState = [...posts, response.data];
      setPosts(newPostsState);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <Header title="React JS Blog" width={width} />
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

        {/* /post URL shows the NewPost component */}
        <Route
          path="edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleUpdate}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
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
