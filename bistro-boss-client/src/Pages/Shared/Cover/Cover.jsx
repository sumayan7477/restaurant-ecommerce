import { Parallax } from "react-parallax";

const Cover = ({ img, title, text }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      bgImageAlt="the dog"
      strength={-200}
      className="bg-cover"
    >
      <div
        className="hero p-20"
        
      >
        <div className="hero-overlay bg-opacity-60 bg-cover"></div>
        <div className="hero-content text-neutral-content text-center p-10">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
            <p className="mb-5 text-sm">{text}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
