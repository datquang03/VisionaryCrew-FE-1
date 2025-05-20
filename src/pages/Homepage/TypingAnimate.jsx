// components/TypingDescription.jsx
import { useState, useEffect } from "react";

const TypingDescription = () => {
  const texts = [
    "Không biết phải làm gì ? ",
    "Đừng lo hãy trải nghiệm với từng bước một.",
    "Hãy ấn vào nút Bắt đầu trải nghiệm",
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 50; // Speed of typing (ms per character)
  const deletingSpeed = 10; // Speed of deleting (ms per character)
  const pauseDuration = 5000; // Pause between cycles (ms)

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let timer;

    if (!isDeleting && displayedText.length < currentText.length) {
      // Typing
      timer = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === currentText.length) {
      // Pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timer = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, deletingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      // Move to next text
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTextIndex, texts]);

  return (
    <div className="max-w-md">
      <p className="text-lg p-2 bg-gray-200 text-black rounded-lg font-bold h-10 leading-snug break-words">
        {displayedText}
        <span className="inline-block w-1 h-3.5 bg-black animate-pulse ml-1"></span>
      </p>
    </div>
  );
};

export default TypingDescription;
