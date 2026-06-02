import { Link } from "react-router-dom";

const BackgroundVideo = () => {
  return (
    <div className="relative min-h-[calc(100svh-4rem)] w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, pointerEvents: "none" }}
      >
        <source src="/background-color.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        style={{ position: "absolute", inset: 0, zIndex: 20, color: "white" }}
        className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Welcome to <span className="text-purple-400">Hueify</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 sm:text-xl lg:text-2xl">
            Personalize your color palette and tailor perfect matches to your images with ease.
          </p>
          <div className="mt-7 flex w-full justify-center sm:mt-8">
            <Link to={'/colors'} type="button" className="btn inline-flex items-center justify-center">
              <strong>Discover</strong>
              <div id="container-stars">
                <div id="stars"></div>
              </div>

              <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundVideo;
