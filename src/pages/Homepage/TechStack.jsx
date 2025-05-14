import { techStackIcons } from "../../components/constants/index";
import TechIcon from "../../components/Models/TechLogo/TechIcon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 90%",
        },
      }
    );
  });

  return (
    <div
      id="skills"
      className="w-full from-gray-400 via-gray-600 to-black bg-gradient-to-br shadow-lg text-white py-16 mt-10 rounded-4xl"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Thư viện</h1>
        <p className="text-lg mt-2">
          Những công nghệ chính mà chúng tôi sử dụng.
        </p>
      </div>

      <div className="flex justify-center gap-6 flex-wrap px-4">
        {techStackIcons.map((icon) => (
          <div
            key={icon.name}
            className="tech-card card-border overflow-hidden group xl:rounded-full rounded-lg bg-[#111] p-6 w-40 h-40 flex items-center justify-center"
          >
            <div className="tech-card-animated-bg" />
            <div className="tech-card-content flex flex-col items-center justify-center h-full">
              <div className="tech-icon-wrapper w-24 h-24">
                <TechIcon model={icon} />
              </div>
              <p className="mt-3 text-center text-sm">{icon.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
