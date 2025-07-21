'use client'
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import Image from 'next/image';

interface movieCardProps{
    poster_path:string,
    original_title:string,
    vote_average:number,
}

const MovieCard:React.FC<movieCardProps> = ({poster_path,original_title,vote_average}) => {
    return (
        <div className='w-full bg-white rounded-xl overflow-hidden'>
        <div className='w-full h-[220px] relative'>
            <Image src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={`${original_title}`} fill sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className='p-2 flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <span className='flex items-center gap-1 '>
                    <HiStar color='green' />{vote_average.toFixed(1)}
                </span>
                <span className='cursor-pointer'>
                    <Tooltip>
                        <TooltipContent>
                            Add to Favorites
                        </TooltipContent>
                        <TooltipTrigger> <HiOutlineStar /></TooltipTrigger>
                    </Tooltip>
                </span>
            </div>
            <div className='h-10'>
                <p className='text-base/[20px] font-medium line-clamp-2'>{original_title}</p>
            </div>

            {/* <p className='text-sm'>{item.overview}</p> */}
            <Link href={'/'} className='text-center cursor-pointer hover:text-primary_1'>View More</Link>
        </div>
    </div>
    )
}

export default MovieCard;