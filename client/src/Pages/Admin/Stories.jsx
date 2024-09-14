
import axios from 'axios';
 // Assuming you use React Router for navigation
import axiosInstance from '../axiosConfig/axiosConfig';
import { useRecoilState } from 'recoil';
import { userData } from '../atom/states';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming y

const Stories = () => {
    const [stories, setStories] = useState([
        {
            _id: "1",
            title: "The Enchanted Forest",
            description: "A magical journey through an enchanted forest filled with mythical creatures and ancient spells. Discover the secrets that lie within.",
            coverImage: "https://via.placeholder.com/300x200?text=The+Enchanted+Forest",
            isPublish: false,
            chapters: [] // Assuming each story has a chapters array
        },
        {
            _id: "2",
            title: "The Lost Kingdom",
            description: "An epic tale of a lost kingdom rediscovered after centuries of obscurity. Join the quest to unveil its hidden treasures and ancient secrets.",
            coverImage: "https://via.placeholder.com/300x200?text=The+Lost+Kingdom",
            isPublish: true,
            chapters: [] // Assuming each story has a chapters array
        },
        // Initial mock data
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', theme: '' });
    const navigate = useNavigate();
    const [currentuser] = useRecoilState(userData);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axiosInstance.get(`/story/getStoriesByUserId/${currentuser._id}`);
                
                // Adjust the endpoint as needed

                console.log("response  : response" , response)
                setStories(response.data.data);
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };

        fetchStories();
    }, []);

    const handleSave = async () => {
        try {
            const response = await axios.post('/api/stories', formData); // Adjust the endpoint as needed
            setStories(prevStories => [...prevStories, response.data]); // Add the newly created story to the list
            setIsAddModalOpen(false);
            setFormData({ title: '', description: '', theme: '' });
            if (response.data) {
                navigate(`/story`);
            }
        } catch (error) {
            console.error('Error saving story:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const openStoryModal = (story) => {
        setSelectedStory(story);
        setIsModalOpen(true);
    };

    const handlePublish = async () => {
        if (selectedStory) {
            try {
                const response = await axios.patch(`/api/stories/${selectedStory._id}`, { isPublish: true });
                setStories(prevStories => prevStories.map(story => 
                    story._id === selectedStory._id ? response.data : story
                ));
                setSelectedStory(response.data);
            } catch (error) {
                console.error('Error publishing story:', error);
            }
        }
    };

    const viewStory = () => {
        if (selectedStory) {
            navigate(`/viewStory/${selectedStory._id}`); // Adjust the route as needed
        }
    };

    return (
        <div className="relative p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-6 text-blue-600">Stories</h1>

            {/* Add Story Button */}
            <button 
                onClick={() => setIsAddModalOpen(true)}
                className="absolute top-6 right-6 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
            >
                Add Story
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
                {stories?.map(story => (
                    <div key={story._id} className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => openStoryModal(story)}>
                        {/* Badge for publish status */}
                        <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full text-white ${story.isPublish ? 'bg-green-500' : 'bg-gray-500'}`}>
                            {story.isPublish ? 'Published' : 'Draft'}
                        </div>
                        <img 
                            src={story.coverImage || 'https://via.placeholder.com/300x200'} 
                            alt={story.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{story.title}</h2>
                            <p className="text-gray-600">{story.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Story Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">Add New Story</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                            <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Cover Image</label>
                             <input type="file" typeof='image' />

                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    value={formData.description} 
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
                                <input 
                                    type="text" 
                                    id="theme" 
                                    name="theme" 
                                    value={formData.theme} 
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button 
                                    type="button" 
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Story Detail Modal */}
            {isModalOpen && selectedStory && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">{selectedStory.title}</h2>
                        <img 
                            src={selectedStory.coverImage || 'https://via.placeholder.com/300x200'} 
                            alt={selectedStory.title} 
                            className="w-full h-48 object-cover mb-4"
                        />
                        <p className="text-gray-600 mb-4">{selectedStory.description}</p>
                        { !selectedStory.isPublish && (
                            <button
                                onClick={handlePublish}
                                className="mx-5 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                            >
                                Publish
                            </button>
                        )}
                        <button
                            onClick={viewStory}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
                        >
                            View Story
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gray-500 mx-5 text-white py-2 px-4 rounded-md hover:bg-gray-600 mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stories;
