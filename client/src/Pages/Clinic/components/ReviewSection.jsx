import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { MdFilterList } from 'react-icons/md';

const ReviewSection = () => {
  const [filter, setFilter] = useState('most-helpful');

  const overallRating = 4.5;
  const totalReviews = 1234;
  const ratingBreakdown = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  const reviews = [
    { id: 1, author: 'John Doe', rating: 5, content: 'Great product! Highly recommended.', helpful: 42, date: '2023-05-15' },
    { id: 2, author: 'Jane Smith', rating: 4, content: 'Good value for money. Could be improved in some areas.', helpful: 28, date: '2023-05-10' },
    { id: 3, author: 'Mike Johnson', rating: 3, content: 'Average product. Does the job but nothing special.', helpful: 15, date: '2023-05-05' },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-yellow-400">
            {index < fullStars ? (
              <BsStarFill />
            ) : index === fullStars && hasHalfStar ? (
              <BsStarHalf />
            ) : (
              <BsStar />
            )}
          </span>
        ))}
      </div>
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className=" p-6 bg-white ">
      <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
      
      <div className="flex flex-col md:flex-row mb-8">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <div className="text-5xl font-bold text-center md:text-left">{overallRating.toFixed(1)}</div>
          <div className="flex justify-center md:justify-start mb-2">
            {renderStars(overallRating)}
          </div>
          <div className="text-gray-600 text-center md:text-left">{totalReviews} reviews</div>
        </div>
        
        <div className="w-full md:w-2/3">
          {ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center mb-2">
              <div className="w-12 text-sm font-medium">{item.stars} star</div>
              <div className="flex-grow mx-4">
                <div className="h-3 bg-gray-200 rounded-full">
                  <div
                    className="h-3 bg-yellow-400 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-sm font-medium text-right">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          onClick={() => alert('Write a review')}
        >
          Write a Review
        </button>
        <div className="flex items-center">
          <MdFilterList className="mr-2" />
          <select
            className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="most-helpful">Most Helpful</option>
            <option value="newest">Newest</option>
            <option value="highest-rated">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-2">
              {renderStars(review.rating)}
              <span className="ml-2 text-gray-600">{review.rating.toFixed(1)}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{review.author}</h3>
            <p className="text-gray-700 mb-2">{review.content}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{review.helpful} people found this helpful</span>
              <span className="mx-2">·</span>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          onClick={() => alert('Load more reviews')}
        >
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;