import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { allStoriesState } from '../atom/states';
import { useRecoilState } from 'recoil';
import axiosInstance from '../axiosConfig/axiosConfig';

const CharacterBuilding = () => {
    const { storyId } = useParams();  // Story ID from the route params
    const [currentStories] = useRecoilState(allStoriesState);

    const [character, setCharacter] = useState({
        name: '',
        role: '',
        traits: '',
        background: ''
    });
    const [storyTitle, setStoryTitle] = useState('');
    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await axiosInstance.get(`/story/get/${storyId}`);  // Update the URL as per your backend route
                const story = response.data.data;
                console.log(response)
                setStoryTitle(story.title);
            } catch (error) {
                console.error("Error fetching story data:", error);
            }
        };

        fetchStory();
    }, [storyId]);
        console.log(storyTitle)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Character Data:', { storyId, ...character });
    };

    return (
        <div className='p-4'>
            <h2 className='text-xl text-gray-600 font-semibold'>Let's Build Story Character</h2>
            {
                storyTitle &&<h2 className='text-xl text-gray-800 my-3 font-semibold'>Story : {storyTitle}</h2>
            }
            <form onSubmit={handleSubmit} className='mt-4 space-y-4 mx-auto shadow my-4 p-4 md:w[500px]'>
                <div>
                    <label className='block text-gray-700'>Character Name</label>
                    <input
                        type="text"
                        name="name"
                        value={character.name}
                        onChange={handleChange}
                        placeholder="Enter character's name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div>
                    <label className='block text-gray-700'>Character Role</label>
                    <input
                        type="text"
                        name="role"
                        value={character.role}
                        onChange={handleChange}
                        placeholder="Main protagonist, antagonist, etc."
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div>
                    <label className='block text-gray-700'>Character Traits</label>
                    <input
                        type="text"
                        name="traits"
                        value={character.traits}
                        onChange={handleChange}
                        placeholder="e.g., brave, intelligent, cunning"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className='block text-gray-700'>Character Background</label>
                    <textarea
                        name="background"
                        value={character.background}
                        onChange={handleChange}
                        placeholder="Provide a brief background of the character"
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="4"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save Character
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CharacterBuilding;
