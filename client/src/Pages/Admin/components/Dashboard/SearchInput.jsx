import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({placeholder,data,setData}) => {
    const filterData = (e) => {
        const value = e.target.value;
        const filter = data?.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        setData(filter);
    }
    return (
        <div className='flex items-center px-4 my-3 max-w-md rounded-full bg-gray-50  mx-4 gap-3'>
            <FaSearch className='text-gray-600' /> <input onChange={(e)=>filterData(e)} type="text" placeholder={placeholder} className='outline-none bg-gray-50 p-2 w-full' />
        </div>
    );
}

export default SearchInput;
