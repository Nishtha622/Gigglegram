import User from "../../../backend/models/user.model.js";
import Post from "../../../backend/models/post.model.js";

export const getUsers = async () => {
  try {
    const response = await fetch('/api/admin/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    console.log("API Response - getUsers: ", data); // Debugging
    return data;
  } catch (error) {
    console.error('Error in getUsers API:', error);
    throw error; 
  }
};
  
  export const getPosts = async () => {
    const response = await fetch('/api/admin/posts', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  };
  
  export const blockUser = async (id) => {
    const response = await fetch(`/api/admin/users/block/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  };
  
  export const unblockUser = async (id) => {
    const response = await fetch(`/api/admin/users/unblock/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  };
  export const getCounts = async (req, res) => {
    try {
      const userCount = await User.countDocuments();
      const postCount = await Post.countDocuments();
      res.status(200).json({ userCount, postCount });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch counts" });
    }
  };