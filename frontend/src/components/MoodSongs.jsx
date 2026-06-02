import { useState } from "react";

const MoodSongs = ({ Songs }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (index) => {
    if (isPlaying === index) {
      setIsPlaying(false);
    } else {
      setIsPlaying(index);
    }
  };

  return (
    <div className="px-20 py-15">
      <h1 className="text-3xl ">Recommended Songs</h1>

      <div>
        {Songs.map((song, index) => {
          return (
            <div key={index} className="my-5 flex items-top justify-between">
              <div>
                <h2 className="text-xl font-bold">{song.title}</h2>
                <h1>{song.mood}</h1>
                <p className="text-gray-600">{song.artist}</p>
              </div>
              <div className="text-2xl mt-2 cursor-pointer flex items-center gap-5">
                {isPlaying === index ? (
                  <audio
                    src={song.audio}
                    autoPlay={isPlaying === index}
                    controls
                  />
                ) : null}
                <button
                  onClick={() => togglePlay(index)}
                  className=" px-4 py-2 rounded transition-colors duration-300 cursor-pointer hover:bg-gray-200"
                >
                  {isPlaying === index ? (
                    <i class="ri-pause-large-line"></i>
                  ) : (
                    <i class="ri-play-large-fill"></i>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSongs;
