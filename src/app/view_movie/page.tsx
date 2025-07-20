'use client'
import React from 'react'
import Image from 'next/image';
import { ApiServices } from '../services/apiServices';
import { useEffect, useState } from 'react';
// import MovieCard from '../components/movieCard';
import MoviesListsComp from '../components/moviesListsComp';
import { HiChevronRight } from 'react-icons/hi';

export default function ViewMovie() {
    const [movieDetails, setMovieDetails] = useState<any>([]);
    const [movieImages, setMovieImages] = useState<any>([]);
    const [castImages, setCastImages] = useState<any>([]);
    const movie_id = 424;
    const base_imgurl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log("image url", base_imgurl);

    const fetchMovieData = async () => {
        await ApiServices.get(`/movie/${movie_id}`).then((data) => setMovieDetails(data)).catch((err) => { throw new Error('Unable to fetch Individuals details') });

        await ApiServices.get(`/movie/${movie_id}/images`).then((data) => setMovieImages(data.backdrops)).catch((err) => { throw new Error('unable to fetch movie Images') });

        await ApiServices.get(`/movie/${movie_id}/credits?language=en-US`).then((data) => setCastImages(data.cast)).catch((err) => { throw new Error('Unable to cast Images') });
    }


    useEffect(() => {
        fetchMovieData();
    }, [])

    console.log('movie details', movieDetails);

    const getRuntime = (time: number) => {
        let total_min = time / 60;
        let min = total_min - Math.trunc(total_min);
        return {
            hrs: Math.trunc(total_min), min: min
        }
    }

    return (
        <>
            <div className='container'>
                {
                    Object.keys(movieDetails).length > 0 ? <>
                        <h4 className='group headingh4'>{movieDetails?.original_title}</h4>
                        <div className='md:h-[360px] lg:h-[420px] flex flex-col md:flex-row items-center gap-3 mb-4'>
                            <div className='w-full md:w-[220px] lg:w-[320px] h-[320px] md:h-full rounded-xl relative overflow-hidden'>
                                <Image src={`https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`} alt='movie' fill />
                            </div>
                            <div className='relative w-full md:grow h-[320px] md:h-full'>
                                <iframe className='rounded-xl absolute w-full h-full inset-0' src={`https://www.youtube.com/embed/V0Fqdb-smqo?autoplay=1&mute=1`}>
                                </iframe>
                            </div>
                        </div>

                        {/* genre */}
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
                            <li className='list-none text-sm border-b-[1px] py-3'>Duration <span></span></li>
                        </ul>

                        {/* Photos */}
                        <div className='flex items-center flex-wrap gap-4'>
                            {
                                movieImages.map((item:any,index:number)=>{
                                    // console.log('item',item)
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
                        {/* <div>
                            <div className='relative w-[calc(100%-220px)] '>
                                <iframe className='rounded-xl absolute w-full h-full inset-0' src={`https://www.youtube.com/embed/V0Fqdb-smqo?autoplay=1&mute=1`}>
                                </iframe>
                            </div>
                        </div> */}

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