import React, { useEffect, useState } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { MdFilterList } from 'react-icons/md';
import axiosInstance from '../../../axiosConfig/axiosConfig';
import {useSelector} from "react-redux"
import { toast } from 'react-toastify';

const ReviewSection = ({clinicId}) => {
  const [filter, setFilter] = useState('most-helpful');
  const [userRating, setUserRating] = useState(0);  // State for star rating (1-5)
  const [userComment, setUserComment] = useState('');  // State for user comment
  const [isWritingReview, setisWritingReview] = useState(false)
  const [reviews, setreviews] = useState([])
  const user = useSelector(state=>state.auth.user)
  const [reload, setreload] = useState(null)

  const fetchClinicReviews = async()=>{
    try {
      const res = await axiosInstance(`/review/${clinicId}`);
      if(res.data){
        
        console.log(res.data);
        setreviews(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const overallRating = reviews.reduce((acc, review) => acc + review.rating, 0)/reviews.length ;
  const totalReviews = reviews.length;
  const ratingBreakdown = [
    { stars: 5, percentage: reviews.filter((review) => review.rating === 5).length / totalReviews * 100 },
    { stars: 4, percentage: reviews.filter((review) => review.rating === 4).length / totalReviews * 100 },
    { stars: 3, percentage: reviews.filter((review) => review.rating === 3).length / totalReviews * 100 },
    { stars: 2, percentage: reviews.filter((review) => review.rating === 2).length / totalReviews * 100},
    { stars: 1, percentage: reviews.filter((review) => review.rating === 1).length / totalReviews * 100},
  ];

  // const reviews = [
  //   { id: 1, author: 'John Doe', rating: 5, comment: 'Great product! Highly recommended.', helpful: 42, date: '2023-05-15' },
  //   { id: 2, author: 'Jane Smith', rating: 4, comment: 'Good value for money. Could be improved in some areas.', helpful: 28, date: '2023-05-10' },
  //   { id: 3, author: 'Mike Johnson', rating: 3, comment: 'Average product. Does the job but nothing special.', helpful: 15, date: '2023-05-05' },
  // ];

  // Function to render stars for review display (static, not clickable)
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

  // Function to render clickable stars for the review input
  const renderClickableStars = () => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer text-3xl ${index < userRating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => setUserRating(index + 1)}  // Set the star rating based on the selected star
          >
            <BsStarFill />
          </span>
        ))}
      </div>
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleReviewSubmit = async(e) => {
    e.preventDefault();
    if (userRating === 0 || userComment.trim() === '') {
      toast.warn('Please provide both a rating and comment.');
      return;
    }
    
    
    try {
      const res = await axiosInstance.post('/review', {
        rating: userRating,
        comment: userComment,
        clinicId,
        userId:user._id
      })

      if(res.data){
        toast.success("Review Submitted Successfully")
        setreload(Math.random)
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to submit review")
    }finally{
      setisWritingReview(false);
    }
    setUserRating(0); 
    setUserComment(''); 
  };


  useEffect(() => {
    fetchClinicReviews();
  }, [reload])
  

  return (
    <div className="p-6 bg-white">
      <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

      <div className="flex flex-col md:flex-row mb-8">  
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <div className="text-5xl font-bold text-center md:text-left">{!isNaN(overallRating.toFixed(1))?overallRating.toFixed(1):0}</div>
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
              <div className="w-12 text-sm font-medium text-right">{item.percentage.toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          onClick={() => setisWritingReview(!isWritingReview)}
        >
          {!isWritingReview  ?  "Write a Review"  : "Cancel"}
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

            {/* Review Form Section */}
            {isWritingReview && 
      <div className="my-8 bg-gray-100 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Your Rating</label>
          {renderClickableStars()}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Your Comment</label>
          <textarea
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Write your comment here..."
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
      
      }

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-2">
              {renderStars(review.rating)}
              <span className="ml-2 text-gray-600">{review.rating.toFixed(1)}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{review.userId?.fullName}</h3>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{review.createdAt.slice(0,10)}</span>
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
