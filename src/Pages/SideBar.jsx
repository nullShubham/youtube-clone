import { Cpu, Gamepad2, Home, LucideTv, Music, Newspaper, Trophy } from 'lucide-react'
import React from 'react'
import { useSideBar } from '../Context/Context'

const SideBar = () => {
    const { isSidebarOn } = useSideBar()
    if (isSidebarOn) {
        return <SideBarForBigScreen />
    } else {
        return <SideBarForSmallScreen />
    }
}


const SideBarForSmallScreen = () => {
    const { isSidebarOn, category, setCategory } = useSideBar()

    return (
        <section className={` pt-4 border-r overflow-auto h-full ${isSidebarOn ? "w-52" : "w-20"} sideBar`}>
            <div className='border-b flex-col px-3 pb-3 flex'>
                <div onClick={() => setCategory(0)} className={`${category == 0 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl justify-center py-3 gap-4`}>
                    <Home className='h-5' />
                </div>
                <div onClick={() => setCategory(20)} className={`${category == 20 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl justify-center py-3 gap-4`}>
                    <Gamepad2 className='h-5' />
                </div>
                <div onClick={() => setCategory(17)} className={`${category == 17 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl justify-center py-3 gap-4`}>
                    <Trophy className='h-5' />
                </div>
                <div onClick={() => setCategory(24)} className={`${category == 24 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl justify-center py-3 gap-4`}>
                    <LucideTv className='h-5' />
                </div>
                <div onClick={() => setCategory(28)} className={`${category == 28 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl justify-center py-3 gap-4`}>
                    <Cpu className='h-5' />
                </div>
                <div onClick={() => setCategory(10)} className={`${category == 10 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl justify-center py-3 gap-4`}>
                    <Music className='h-5' />
                </div>
                <div onClick={() => setCategory(25)} className={`${category == 25 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl justify-center py-3 gap-4`}>
                    <Newspaper className='h-5' />
                </div>
            </div>
            <div className='px-3 py-3'>

                <div className='flex items-center justify-center py-2 hover:bg-gray-100 rounded-lg cursor-pointer'>
                    <img src='../../Public/images/User.webp' className='h-9 w-9 object-cover rounded-full' />
                </div>
                <div className='flex items-center justify-center py-2 hover:bg-gray-100 rounded-lg cursor-pointer'>
                    <img src='../../Public/images/User.webp' className='h-9 w-9 object-cover rounded-full' />
                </div>
                <div className='flex items-center justify-center py-2 hover:bg-gray-100 rounded-lg cursor-pointer'>
                    <img src='../../Public/images/User.webp' className='h-9 w-9 object-cover rounded-full' />
                </div>
                <div className='flex items-center justify-center py-2 hover:bg-gray-100 rounded-lg cursor-pointer'>
                    <img src='../../Public/images/User.webp' className='h-9 w-9 object-cover rounded-full' />
                </div>
                <div className='flex items-center justify-center py-2 hover:bg-gray-100 rounded-lg cursor-pointer'>
                    <img src='../../Public/images/User.webp' className='h-9 w-9 object-cover rounded-full' />
                </div>
            </div>
        </section>
    )
}
const SideBarForBigScreen = () => {
    const { isSidebarOn, category, setCategory } = useSideBar()
    return (
        <section className={` pt-4 border-r overflow-auto h-full ${isSidebarOn ? "w-52" : "w-20"} sideBar`}>
            <div className='border-b flex-col pb-3 gap-3 px-2 flex'>
                <div onClick={() => setCategory(0)} className={`${category == 0 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl px-4 py-2 gap-4`}>
                    <Home className='h-5' />
                    <h3 className='font-medium'>Home</h3>
                </div>
                <div onClick={() => setCategory(20)} className={`${category == 20 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl px-4 py-2 gap-4`}>
                    <Gamepad2 className='h-5' />
                    <h3 className='font-medium'>Gaming</h3>
                </div>
                <div onClick={() => setCategory(17)} className={`${category == 17 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl px-4 py-2 gap-4`}>
                    <Trophy className='h-5' />
                    <h3 className='font-medium'>Sports</h3>
                </div>
                <div onClick={() => setCategory(24)} className={`${category == 24 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl px-4 py-2 gap-4`}>
                    <LucideTv className='h-5' />
                    <h3 className='font-medium'>Entertainment</h3>
                </div>
                <div onClick={() => setCategory(28)} className={`${category == 28 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl px-4 py-2 gap-4`}>
                    <Cpu className='h-5' />
                    <h3 className='font-medium'>Technology</h3>
                </div>
                <div onClick={() => setCategory(10)} className={`${category == 10 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl px-4 py-2 gap-4`}>
                    <Music className='h-5' />
                    <h3 className='font-medium'>Music</h3>
                </div>
                <div onClick={() => setCategory(25)} className={`${category == 25 && "bg-gray-200"} hover:bg-gray-100 cursor-pointer items-center flex rounded-xl px-4 py-2 gap-4`}>
                    <Newspaper className='h-5' />
                    <h3 className=' font-medium'>News</h3>
                </div>
            </div>
            <div className='p-2'>
                <div className='text-center'>
                    <h5 className='font-medium opacity-75'>Subscribed</h5>
                </div>
                <div className='flex items-center py-2 hover:bg-gray-100 px-2 rounded-lg cursor-pointer gap-2'>
                    <img src='../../Public/images/User.webp' className='h-9 w-9 object-cover rounded-full' />
                    <h4 className='font-medium opacity-80'>PewDiePie</h4>
                </div>
                <div className='flex items-center py-2 hover:bg-gray-100 px-2 rounded-lg cursor-pointer gap-2'>
                    <img src='../../Public/images/User.webp' className='h-9 w-9 object-cover rounded-full' />
                    <h4 className='font-medium opacity-80'>PewDiePie</h4>
                </div>
                <div className='flex items-center py-2 hover:bg-gray-100 px-2 rounded-lg cursor-pointer gap-2'>
                    <img src='../../Public/images/User.webp' className='h-9 w-9 object-cover rounded-full' />
                    <h4 className='font-medium opacity-80'>PewDiePie</h4>
                </div>
                <div className='flex items-center py-2 hover:bg-gray-100 px-2 rounded-lg cursor-pointer gap-2'>
                    <img src='../../Public/images/User.webp' className='h-9 w-9 object-cover rounded-full' />
                    <h4 className='font-medium opacity-80'>PewDiePie</h4>
                </div>
                <div className='flex items-center py-2 hover:bg-gray-100 px-2 rounded-lg cursor-pointer gap-2'>
                    <img src='../../Public/images/User.webp' className='h-9 w-9 object-cover rounded-full' />
                    <h4 className='font-medium opacity-80'>PewDiePie</h4>
                </div>
            </div>
        </section>
    )
}

export default SideBar