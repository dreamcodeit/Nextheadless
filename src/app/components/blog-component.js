'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";

const Blogcomponents = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://test-work.dreamcodeit.com//wp-json/wp/v2/posts?per_page=${perPage}&page=${currentPage}`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{post.title.rendered}</h2>
            {post.featured_media && (
              <img
                src={post.featured_image_url}
                alt={post.title.rendered}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <div
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            ></div>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-blue-600 hover:underline"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blogcomponents;