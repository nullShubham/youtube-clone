import { ArrowLeftIcon, Search, SidebarClose, SidebarOpen } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSideBar } from '../Context/Context'


const SearchBar = ({ isSliderBtnVisible = true }) => {
    const { isSidebarOn } = useSideBar()
    return (
        <nav className="z-10 shadow-md searchBar h-14  flex items-center justify-between gap-20 px-10">
            <div className='items-center flex gap-4'>
                {isSliderBtnVisible ? (
                    isSidebarOn
                        ? <SidebarCloseComp />
                        : <SidebarOpenComp />
                )
                    : (
                        <NavLink to="/">
                            <ArrowLeftIcon />
                        </NavLink>
                    )
                }
                <NavLink to="/">
                    <img className='h-12 w-16  object-cover' src="../../Public/images/Logo.png" alt="Logo" />
                </NavLink>
            </div>
            <div className='flex flex-[0.5] items-center border px-3 py-2 rounded-full'>
                <input type="text" className='border-none w-full outline-none px-2 bg-transparent' placeholder='Search..' />
                <Search className='cursor-pointer' />
            </div>
            <div>
                <img className='h-10 object-cover rounded-full w-10 cursor-pointer' src="../../Public/images/User.webp" alt="User Image" />
            </div>
        </nav>
    )
}
const SidebarCloseComp = () => {
    const { isSidebarOn, setIsSidebarOn } = useSideBar()
    return <SidebarClose className='cursor-pointer' onClick={() => setIsSidebarOn(!isSidebarOn)} />
}

const SidebarOpenComp = () => {
    const { isSidebarOn, setIsSidebarOn } = useSideBar()
    return <SidebarOpen className='cursor-pointer' onClick={() => setIsSidebarOn(!isSidebarOn)} />
}
export default SearchBar