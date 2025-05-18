import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import { blogData } from "../../data/BlogData";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import blogImage from "../../assets/blog.avif";
import StarryBackground from "../../components/3D_Threejs/StarryBackground";
import StickyNavbar from "../../components/layout/Navbar/StickyNavbar";

const BlogDetailPage = () => {
  const { id } = useParams();
  const contentRef = useRef(null);
  const heartRef = useRef(null);

  // Find the blog by ID
  const blog = blogData.find((b) => b._id === id);

  // State for like count and heart fill
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog ? blog.likedUsers.length : 0);

  // GSAP Animation for content
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, []);

  // GSAP Animation for heart hover
  const handleHoverEnter = () => {
    gsap.to(heartRef.current, {
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleHoverLeave = () => {
    gsap.to(heartRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Toggle like state
  const handleLikeClick = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 to-black py-12 px-4 sm:px-6 lg:px-8 relative">
        <StarryBackground />
        <StickyNavbar />
        <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold">Blog Not Found</h1>
          <p className="mt-4 text-lg">The blog with ID {id} does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-black py-12 px-4 sm:px-6 lg:px-8 relative">
      <StarryBackground />
      <StickyNavbar />
      <div className="max-w-4xl mx-auto relative z-10 mt-12" ref={contentRef}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={blog.image || blogImage}
            alt={blog.name}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blog.name}
            </h1>
            <p className="text-gray-600 text-lg mb-4">{blog.description}</p>
            <div
              className="flex items-center mb-6 like-section cursor-pointer"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
              onClick={handleLikeClick}
            >
              {isLiked ? (
                <BsHeartFill
                  className="w-6 h-6 text-red-500 mr-2 heart-icon bg-red-100 rounded-full p-1"
                  ref={heartRef}
                />
              ) : (
                <BsHeart
                  className="w-6 h-6 text-red-500 mr-2 heart-icon"
                  ref={heartRef}
                />
              )}
              <span className="text-gray-600">
                {likeCount} {likeCount === 1 ? "Like" : "Likes"}
              </span>
            </div>
            <div className="prose prose-lg text-gray-800 mb-6">
              <p>{blog.content}</p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Details
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Category:</span>{" "}
                {blog.category || "Unknown"}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Author:</span>{" "}
                {blog.author || "Unknown"}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Created:</span>{" "}
                {new Date(blog.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Updated:</span>{" "}
                {new Date(blog.updatedAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Comments
                </h3>
                {blog.comments.length === 0 ? (
                  <p className="text-gray-600">No comments yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {blog.comments.map((comment, index) => (
                      <li key={index} className="border-b border-gray-200 pb-2">
                        <p className="text-gray-800 font-medium">
                          {comment.username}
                        </p>
                        <p className="text-gray-600">{comment.content}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
