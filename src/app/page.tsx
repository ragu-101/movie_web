'use client'

import Image from "next/image";
import { ApiServices } from "./services/apiServices";
import { useEffect, useState } from "react";
import { HiStar } from "react-icons/hi";
// import MoviesListsComp from "./components/moviesListsComp";

export default function Home() {
  const [genreLists, setGenreLists] = useState<any>([]);
  const [genreMovies, setGenreMovies] = useState<any>([]);
  const [activeGenre, setActiveGenre] = useState('popular');


  const fetchDatas = async () => {
    await ApiServices.get('/genre/movie/list').then((data) => setGenreLists(data.genres)).catch(() => { throw new Error('Unable to fetch genres') });

    await ApiServices.get('/movie/popular').then((data)=>setGenreMovies(data.results)).catch(()=>{throw new Error('unable to fetch popular movies')});
  }
  useEffect(() => {
    fetchDatas()
  }, []);

  const getGenreBasedMovies = async (genre_num: number) => {
    setGenreMovies([]);
    await ApiServices.get(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.asc&with_genres=${genre_num}`).then((data) => setGenreMovies(data.results)).catch(() => { throw new Error('Unable to fetch movies based on Genre') })
  }

  // console.log('moviesss', genreMovies);

  const getReleaseYear = (release_date: string): string => {
    return release_date ? release_date.slice(0,4) : 'Not Available';
  }

  return (
    <div className="">
      <div className="container">
        <div className="py-4">
          <ul className="flex items-center flex-wrap gap-2">
            {
              genreLists.length > 0 &&   <li className={`rounded-full px-3 py-1 text-base font-normal cursor-pointer bg-[#808080] text-white hover:bg-white hover:text-black ${activeGenre === 'popular' ? 'bg-white text-black!' : ''}`}>Popular</li>
            }
          
            {genreLists.map((item: any) => (
              <li className={`rounded-full px-3 py-1 text-base font-normal cursor-pointer bg-[#808080] text-white hover:bg-white hover:text-black ${activeGenre === item.name ? 'bg-white text-black!' : ''}`} key={item.id} onClick={() => { setActiveGenre(item.name); getGenreBasedMovies(item.id) }}>{item.name}</li>
            ))}

          </ul>
        </div>

        {
          genreMovies.length > 0 ? <div className="homecardsetup gap-4 pb-4">
            {
              genreMovies.map((item: any, index: number) => (
                <div key={index} className="w-full">
                  <div className="relative rounded-xl overflow-hidden aspect-[2/3]">
                    <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw"  />
                  </div>
                  <div className="pt-2">
                    <p className="text-base font-medium pb-2">{item.title}</p>
                    <p className="flex items-center gap-4 font-medium text-sm">{getReleaseYear(item.release_date)} <span className="flex items-center gap-2 text-sm font-normal"><HiStar color='green' />{item.vote_average.toFixed(1)}</span></p>
                  </div>
                </div>
              ))
            }
          </div> :
            <p className="text-center">Loading...</p>
        }


        {/* top rated */}
        {/* <MoviesListsComp url="/movie/popular?language=en-US&page=1" heading="Top Rated" /> */}
        {/* Trending */}
        {/* <MoviesListsComp url="/trending/movie/day" heading="Trending" /> */}
      </div>
    </div>
  );
}
