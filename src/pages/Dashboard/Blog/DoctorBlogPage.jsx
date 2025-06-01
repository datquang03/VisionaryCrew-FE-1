import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MainLayout from "../layout/DashboardLayout";

const DoctorBlogPage = () => {
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const authorRef = useRef(null);
  const tagsRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const categoryRef = useRef(null);
  const submitRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    author: "",
    tags: "",
    description: "",
    image: null,
    content: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Gửi dữ liệu qua API
  };

  useEffect(() => {
    gsap.from(
      [
        nameRef.current,
        authorRef.current,
        tagsRef.current,
        descriptionRef.current,
        imageRef.current,
        contentRef.current,
        categoryRef.current,
      ],
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }
    );

    gsap.from(submitRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 1,
      ease: "elastic.out(1, 0.5)",
    });

    const button = submitRef.current;
    button.addEventListener("mouseenter", () => {
      gsap.to(button, { scale: 1.05, duration: 0.3 });
    });
    button.addEventListener("mouseleave", () => {
      gsap.to(button, { scale: 1, duration: 0.3 });
    });

    const inputs = [
      nameRef.current,
      authorRef.current,
      tagsRef.current,
      descriptionRef.current,
      contentRef.current,
      categoryRef.current,
    ];
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, {
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
          duration: 0.3,
        });
      });
      input.addEventListener("blur", () => {
        gsap.to(input, { boxShadow: "0 0 0 rgba(0, 0, 0, 0)", duration: 0.3 });
      });
    });

    return () => {
      button.removeEventListener("mouseenter", () => {});
      button.removeEventListener("mouseleave", () => {});
      inputs.forEach((input) => {
        input.removeEventListener("focus", () => {});
        input.removeEventListener("blur", () => {});
      });
    };
  }, []);

  return (
    <MainLayout role="Doctor">
      <div className="flex flex-col flex-1 max-h-screen overflow-hidden">
        <div className="overflow-y-auto max-h-screen p-4 custom-scroll">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Create New Blog Post
          </h1>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Blog title"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <input
                ref={authorRef}
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Author name"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags (comma separated)
              </label>
              <input
                ref={tagsRef}
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. health, tips, nutrition"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                ref={descriptionRef}
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Short summary of your blog"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                ref={imageRef}
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <textarea
                ref={contentRef}
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="8"
                className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog content here"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                ref={categoryRef}
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="health-tips">Health Tips</option>
                <option value="medical-news">Medical News</option>
                <option value="wellness">Wellness</option>
                <option value="research">Research</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                ref={submitRef}
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              >
                Create Blog Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorBlogPage;
