import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({placeholder}) => {
    return (
        <div className='flex items-center px-4 my-3 max-w-md rounded-full bg-gray-50  mx-4 gap-3'>
            <FaSearch className='text-gray-600' /> <input type="text" placeholder={placeholder} className='outline-none bg-gray-50 p-2 w-full' />
        </div>
    );
}

export default SearchInput;
