import React, { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import { Link } from "react-router-dom";
import { getCopyPasta } from "./actions/CopyPasta.actions";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCopyPasta();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!posts.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">No posts available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8">List of Posts</h1>
      <Link
        to="/create"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Create CopyPasta
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <CardComponent
            key={post.copypasta_id}
            content={post.content}
            id={post.copypasta_id}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
