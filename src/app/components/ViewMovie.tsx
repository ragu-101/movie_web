'use client'
import React from 'react'
import Image from 'next/image';
import { ApiServices } from '../services/apiServices';
import { useEffect, useState } from 'react';
// import MovieCard from '../components/movieCard';
import MoviesListsComp from './moviesListsComp';
// import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function ViewMovie() {
    const [movieDetails, setMovieDetails] = useState<any>([]);
    const [movieImages, setMovieImages] = useState<any>([]);
    const [castImages, setCastImages] = useState<any>([]);
    const [videos,setVideos] = useState<any>([]);
    let trailervideo_id:any = [];
    const movie_id = useSelector((state: RootState) => state.counter.movieId);   

    const fetchMovieData = async () => {

        await ApiServices.get(`/movie/${movie_id}`).then((data) => setMovieDetails(data)).catch((err) => { throw new Error('Unable to fetch Individuals details') });

        await ApiServices.get(`/movie/${movie_id}/images`).then((data) => setMovieImages(data.backdrops)).catch((err) => { throw new Error('unable to fetch movie Images') });
        
        await ApiServices.get(`/movie/${movie_id}/credits?language=en-US`).then((data) => setCastImages(data.cast)).catch((err) => { throw new Error('Unable to cast Images') });

        await ApiServices.get(`/movie/${movie_id}/videos`).then((data) => setVideos(data.results)).catch((err) => { throw new Error('Unable to fetch videos') });

    }


    useEffect(() => {
        fetchMovieData();
    }, [])


    const getRuntime = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = (totalMinutes % 60).toString().padStart(2, '0');
        return `${hours}hrs ${minutes}min`;
    }

    console.log("response",movieDetails);

    const getTrailer = (videos:any) => {
        if(videos.length > 0){
            trailervideo_id = videos.filter((item:any)=>{
                if(item.type === 'Trailer' && item.official)
                    return item;
            })
        }
    }
    getTrailer(videos);

    console.log('videos',trailervideo_id)

    return (
        <>
            <div className='container'>
                {/* <span>{movie_idd}</span> */}
                {
                    Object.keys(movieDetails).length > 0 ? <>
                        <h4 className='group headingh4'>{movieDetails?.original_title}</h4>
                        <div className='md:h-[360px] lg:h-[420px] flex flex-col md:flex-row items-center gap-3 mb-4'>
                            <div className='w-full md:w-[220px] lg:w-[320px] h-[320px] md:h-full rounded-xl relative overflow-hidden'>
                                <Image src={`https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`} alt='movie' fill sizes="(max-width: 768px) 100vw, 50vw" />
                            </div>
                            <div className='relative w-full md:grow h-[320px] md:h-full'>
                                <iframe className='rounded-xl absolute w-full h-full inset-0' src={`https://www.youtube.com/embed/${trailervideo_id[0]?.key}?autoplay=1&mute=1`}>
                                </iframe>
                            </div>
                        </div>

                        {/* lists */}
                        <ul className='m-0 py-4'>
                            <li className='list-none text-sm border-b-[1px] py-3 pt-0'>{movieDetails.overview}</li>
                            <li className='list-none text-sm border-b-[1px] py-3 '>
                                <div className='flex flex-wrap gap-3 items-center'>
                                    {
                                        movieDetails?.genres?.map((genre: any) => (
                                            <span key={genre.id} className='bg-primary_3 rounded-xl px-3 py-1.5 text-sm text-white'>{genre.name}</span>
                                        ))
                                    }
                                </div>
                            </li>
                            
                            <li className='list-none text-sm border-b-[1px] py-3'>Directed By</li>
                            <li className='list-none text-sm border-b-[1px] py-3'>Duration <span> {getRuntime(movieDetails.runtime)} </span></li>
                            <li className='list-none text-sm border-b-[1px] py-3'><Link href={`https://www.imdb.com/title/${movieDetails.imdb_id}/`} target='_blank' rel="noopener noreferrer" className='text-blue-500'>View in Imbd</Link></li>
                        </ul>

                        {/* Photos */}
                        <div className='flex items-center flex-wrap gap-4'>
                            {
                                movieImages.map((item:any,index:number)=>{
                                    if(index < 10){
                                        return (
                                            <div key={index} className='relative w-32 h-34'>
                                                <Image src={`https://image.tmdb.org/t/p/original${item.file_path}`} alt='image_path' fill />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>

                        {/* videos */}
                        <div>
                            <div className='relative w-[calc(100%-220px)] '>
                                <iframe className='rounded-xl absolute w-full h-full inset-0' src={`https://www.youtube.com/embed/V0Fqdb-smqo?autoplay=1&mute=1`}>
                                </iframe>
                            </div>
                        </div>

                        {/* cast */}
                        {/* <h4 className='group headingh4 py-4'>Top Cast <HiChevronRight className='group-hover:ml-1 transition-all duration-200' /></h4>
                        <div className='grid grid-cols-2 gap-4'>
                            {
                                castImages.map((item: any, index: number) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        {
                                            item.profile_path !== null ? <div className='w-20 h-20 rounded-full overflow-hidden'>
                                                <Image src={`https://image.tmdb.org/t/p/original/${item.profile_path}`} alt={`${item.original_name}`} width={80}
                                                    height={80}
                                                    style={{ objectFit: 'cover' }} />
                                            </div>
                                                :
                                                <div className='w-20 h-20 rounded-full overflow-hidden bg-white grid place-content-center'>
                                                    <Image src={`/profile_avatar.png`} alt={`${item.original_name}`} width={60}
                                                        height={60}
                                                        style={{ objectFit: 'cover' }} />
                                                </div>
                                        }

                                        <div>
                                            <p className='text-base'>{item.original_name}</p>
                                            <p className='text-sm text-gray-500'>{item.character}</p>
                                        </div>

                                    </div>
                                ))
                            }

                        </div> */}
                        
                        {/* Recommendations */}
                        <div>
                            <MoviesListsComp url={`/movie/${movie_id}/recommendations`} heading='Recommendations'/>
                        </div>
                        {/* similar */}
                        <div>
                            <MoviesListsComp url={`/movie/${movie_id}/similar`} heading='Similar'/>
                        </div>
                    </>
                        :
                        <p>Loading...</p>
                }

            </div>
        </>
    )
}