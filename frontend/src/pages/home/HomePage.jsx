import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";
const HomePage = ({ id }) => {
  const [feedType, setFeedType] = useState("forYou");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feed/forYou'); // Use full URL if needed
        console.log(response.data);
        setPosts(response.data.posts || []);  // Ensure `posts` is an array
      } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
      }
    };
    

    fetchPosts();
  }, [feedType]);

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      <div className="flex w-full border-b border-gray-700">
        <div
          className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          onClick={() => setFeedType("forYou")}
        >
          For you
          {feedType === "forYou" && <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>}
        </div>
        <div
          className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          onClick={() => setFeedType("following")}
        >
          Following
          {feedType === "following" && <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>}
        </div>
      </div>

      <CreatePost />

      <div>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id}>{post.content}</div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
