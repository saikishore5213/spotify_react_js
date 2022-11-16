import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants.js";
import { useGetTopChartsQuery } from "../redux/services/ShazamCore";
import { useDispatch, useSelector } from "react-redux";
const Discover = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title={"Loading..."} />;
  if (error) return <Error />;
  const genreTitle = "pop";
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 text-white">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            activeSong={activeSong}
            isPlaying={isPlaying}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
