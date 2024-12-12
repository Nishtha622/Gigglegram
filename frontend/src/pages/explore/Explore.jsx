import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExplorePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch posts from the API
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts/explore');
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className='text-center p-4'>Loading...</div>;
    if (error) return <div className='text-center p-4 text-red-500'>{error}</div>;

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Explore</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {posts.map((post) => (
                    <div key={post.id} className='relative'>
                        <img 
                            src={post.imageUrl} 
                            alt={post.caption} 
                            className='w-full h-64 object-cover rounded-lg' 
                        />
                        <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-2'>
                            <p className='text-white text-sm font-semibold'>{post.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExplorePage;