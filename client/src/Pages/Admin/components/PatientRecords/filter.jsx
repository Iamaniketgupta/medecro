import { useState } from 'react';

const FilterChecklist = () => {
    const [filters, setFilters] = useState({
        male: false,
        female: false,
    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
    };

    return (
        <div className="p-3 px-5 bg-gray-100 rounded-md flex gap-4 items-center">
            <h3 className="text-gray-800 font-semibold ">Filter By</h3>
            <div className="flex  gap-2 items-center">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="name"
                        checked={filters.male}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                    />
                    Male
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="age"
                        checked={filters.female}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                    />
                    Female
                </label>
             
            </div>
        </div>
    );
};

export default FilterChecklist;
