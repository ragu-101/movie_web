'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiOutlineSearch, HiMenu } from "react-icons/hi";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { ApiServices } from "../services/apiServices";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { getMovieId } from "@/store/slices/conterSlice";

function TopBar() {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [debouncedValue, setDebouncedValue] = useState('');
    // const [openSuggestions,setOpenSuggestions] = useState<boolean>(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (movie_id: string,title:string) => {
        dispatch(getMovieId(movie_id));
        router.push(`/viewmovie`);
        setSearch('');
        setSuggestions([]);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const fetchData = async () => {
        await ApiServices.get(`/search/movie?query=${search}&language=en-US&page=1`).then((data) => setSuggestions(data.results)).catch((err) => { console.log("error", err) });
    }

    useEffect(() => {
        fetchData();
    }, [debouncedValue]);

    const getReleaseYear = (release_date: string): string => {
        return release_date ? release_date.slice(0, 4) : 'Not Available';
    }

    // debounce
    useEffect(() => {
        // Clear any existing timeout
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Set new debounce timeout
        debounceRef.current = setTimeout(() => {
            setDebouncedValue(search); // Update debounced value
        }, 500); // 500ms delay

        // Cleanup timeout on unmount or input change
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [search]);

    // console.log('suggestion', suggestions)

    return (
        <div className=" bg-white h-[60px]">
            <div className="flex items-center justify-between gap-4 px-4 bg-1  max-w-[1200px] mx-auto h-full">
                <span className=''>
                    {/* <img src="" alt="" /> */}
                    LOGO
                </span>
                <span className="flex items-center gap-1 cursor-pointer"><HiMenu />Menu</span>

                <div className="relative inline-flex items-center border rounded-md border-primary_3 px-1.5 h-[40px] bg-white focus-within:border-primary_2 hover:border-primary_2">
                    <HiOutlineSearch />
                    <input onChange={handleChange} className="outline-none pl-1" type="text" value={search} />
                    {
                        search.length > 0 && <div className="absolute w-xl py-2 bg-white top-12 rounded-lg left-[50%] -translate-x-[50%] max-h-80 overflow-y-auto z-9">
                            {
                                suggestions.map((item: any, index: number) => (
                                    <div className="flex gap-2 py-1 cursor-pointer hover:bg-gray-500 hover:text-white px-4" onClick={() => handleClick(item.id,item.title)}>
                                        <div className="w-10 h-10 rounded-md relative overflow-hidden shrink-0">
                                            <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="img" fill sizes="(max-width: 768px) 100vw, 50vw"  />
                                        </div>
                                        <div>
                                            <span className="text-sm font-normal block">{item.title}</span>
                                            <span className="text-xs font-medium">{getReleaseYear(item.release_date)}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }

                </div>
                <span className="flex items-center gap-1 cursor-pointer"><MdOutlineAddToPhotos />WatchList</span>
            </div>
        </div>
    )
}
export default TopBar;