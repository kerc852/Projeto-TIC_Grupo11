import {MdContactMail } from "react-icons/md";
import { Link } from "react-router-dom";
import React from "react";
import {HiMenuAlt3} from "react-icons/hi"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {FaLocationDot} from "react-icons/fa6"
import { useState } from "react"


interface MenuProps {
    username: string
}

export default function Menu( {username}: MenuProps){
    const  menus = [
        {name: "Produto", link:'/produto', icon:AiOutlineShoppingCart},
        {name: "Local", link:'/local', icon:FaLocationDot},
        {name: "Forncedor", link:'/fornecedor', icon:MdContactMail},
        {name: "Estado", link:'/estado', icon:MdContactMail},
    ]

    const [open, setOpen] = useState(true);
    return (
        <section className="flex gap-6">
            <div className={`bg-[#0e0e0e] min-h-screen ${open ? 'w-72' : 'w-16 '} duration-500 text-gray-100 px-4`}>

                <div className="py-3 flex justify-end">
                    <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)}></HiMenuAlt3>
                </div>


                <div className="mt-4 flex flex-col gap-4 relative">
                    {
                    menus?.map((menu,i) =>(
                        <Link to={menu?.link} key={i} className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-indigo-950 rounded-md">
                        <div>
                            {React.createElement(menu?.icon, {size: "20"})} </div>
                            <h2 style={{transition: `${i +3}00ms`}} 
                            className={` whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}</h2>
                            <h2 className={` ${open && 'hidden'} absolute left-48 bg-white font-semibold 
                            whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden`}>
                                {menu?.name}
                            </h2>
                        </Link>))                  
                    }       
                </div>
            </div>

        </section>
    )
}