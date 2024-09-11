import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading text-center lg:max-w-[50vw]">
          Ready to elevate <span className="text-purple">your</span> software solution?
        </h1>
        <p className="text-gray-300 md:mt-8 my-5 text-center max-w-2xl">
          Whether it&apos;s a web app, mobile solution, or a custom platform, let’s discuss how we can bring your ideas to life.
        </p>
        <a href="mailto:contact@devblend.tech">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 DevBlend
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Image
                src={info.img}
                alt="social media icon"
                width={20}
                height={20}
                layout="fixed"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
