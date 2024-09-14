import React, { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import axiosInstance from '../axiosConfig/axiosConfig';
import { allStoriesState } from '../atom/states';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const  AllStories = () => {
    const [allStories, setAllStories] = useRecoilState(allStoriesState);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStories, setFilteredStories] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    const fetchAllStories = async () => {
        try {
            const { data } = await axiosInstance.get('/story/getAll');
            setAllStories(data?.data);
            console.log(data)
            setLoading(false);

        } catch (error) {
            console.error("Error fetching stories:", error);
            setLoading(false);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setFilteredStories(
            allStories.filter(story =>
                story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                story.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, allStories]);

    useEffect(() => {
        fetchAllStories();
    }, []);

    return (
        <>
            <Navbar />

            <div className='p-3'>
                <h1 className='text-2xl font-gray-800 font-bold text-center'>All Stories</h1>

                {/* Search input */}
                <div className='my-4 flex gap-2 items-center px-4'>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search stories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md w-96'
                    />
                </div>

                {/* Loader */}
                {loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-12 w-12"></div>
                    </div>
                ) : (
                    /* Display filtered stories */
                    <div className='flex items-center p-4 justify-between gap-4 flex-wrap'>
                        {filteredStories.length > 0 ? (
                            filteredStories.map(story => (
                                <Link to={`/story/${story._id}`} key={story._id} className='bg-gray-100 p-4 rounded-md h-46 shadow-md'>
                                    <h3 className='text-lg font-semibold'>{story.title}</h3>
                                    <p className='text-gray-600'>{story.description}</p>
                                </Link>
                            ))
                        ) : (
                            <p className='text-center text-gray-500'>No stories found.</p>
                        )}
                    </div>
                )}
            </div>
        </>

            )
        }
export default AllStories