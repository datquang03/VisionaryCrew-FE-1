import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { blogData } from "../../data/BlogData";
import { BsHeart } from "react-icons/bs";
import blogImage from "../../assets/blog.avif";
import { useNavigate } from "react-router-dom";
import StarryBackground from "../../components/3D_Threejs/StarryBackground";
import StickyNavbar from "../../components/layout/Navbar/StickyNavbar";

const BlogPage = () => {
  const blogRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    blogRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
        }
      );
    });
  }, []);

  const handleHoverEnter = (index) => {
    gsap.to(blogRefs.current[index], {
      scale: 1.05,
      y: -10,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleHoverLeave = (index) => {
    gsap.to(blogRefs.current[index], {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-black py-12 px-4 sm:px-6 lg:px-8 relative">
      <StarryBackground />
      <StickyNavbar />
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Blog Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog, index) => (
            <div
              key={blog._id}
              ref={(el) => (blogRefs.current[index] = el)}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
              onMouseEnter={() => handleHoverEnter(index)}
              onMouseLeave={() => handleHoverLeave(index)}
            >
              <img
                src={blog.image || blogImage}
                alt={blog.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {blog.name}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.description}
                </p>
                <div className="flex items-center mb-4">
                  <BsHeart className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-gray-600">
                    {blog.likedUsers.length}{" "}
                    {blog.likedUsers.length === 1 ? "Like" : "Likes"}
                  </span>
                </div>
                <a
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
