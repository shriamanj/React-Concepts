import { useEffect, useState } from "react";
import Button from "../../components/Button";

const RestApi = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");

  // GET: Fetch posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  // POST: Create a new post
  const handleCreate = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: newPostTitle,
        body: "Sample body",
        userId: 1,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setPosts([data, ...posts]);
        setNewPostTitle("");
      });
  };

  // PUT: Replace an existing post (by id)
  const handleReplace = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: "Replaced Title",
        body: "New replaced body",
        userId: 1,
      }),
    })
      .then(res => res.json())
      .then(updated => {
        setPosts(posts.map(p => (p.id === id ? updated : p)));
      });
  };

  // PATCH: Update part of an existing post
  const handlePatch = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: "Patched Title",
      }),
    })
      .then(res => res.json())
      .then(updated => {
        setPosts(posts.map(p => (p.id === id ? updated : p)));
      });
  };

  // DELETE: Delete a post
  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPosts(posts.filter(p => p.id !== id));
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">REST API Methods Demo</h1>

      <div className="mt-4">
        <input
          type="text"
          placeholder="New Post Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={handleCreate}
          className="bg-gray-700 text-white px-2 py-1 rounded"
        >
          Create Post (POST)
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border p-2">
            <strong>{post.title}</strong>
            <div className="space-x-2 mt-6">
              <button
                onClick={() => handleReplace(post.id)}
                className="bg-gray-500 text-white px-2 py-1 rounded cursor-pointer"
              >
                Replace
              </button>
              <button
                onClick={() => handlePatch(post.id)}
                className="bg-gray-400 text-white px-2 py-1 rounded cursor-pointer"
              >
                Patch 
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-gray-800 text-white px-2 py-1 rounded cursor-pointer"
              >
                Delete 
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestApi;
