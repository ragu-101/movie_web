'use client'

import { HiOutlineSearch,HiMenu } from "react-icons/hi";
import { MdOutlineAddToPhotos } from "react-icons/md";

function TopBar(){
    return (
        <div className=" bg-white h-[60px]">
        <div className="flex items-center justify-between gap-4 px-4 bg-1  max-w-[1200px] mx-auto h-full">
            <span className=''>
                {/* <img src="" alt="" /> */}
                LOGO
            </span>
            <span className="flex items-center gap-1 cursor-pointer"><HiMenu />Menu</span>

            <div className="inline-flex items-center border rounded-md border-primary_3 px-1.5 h-[40px] bg-white focus-within:border-primary_2 hover:border-primary_2">
                <HiOutlineSearch />
                <input className="outline-none pl-1" type="text" name="" id="" />
            </div>
            <span className="flex items-center gap-1 cursor-pointer"><MdOutlineAddToPhotos /> WatchList</span>
        </div>
        </div>
    )
}
export default TopBar;