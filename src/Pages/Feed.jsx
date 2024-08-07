import React, { useCallback, useEffect, useState } from 'react'
import { useSideBar } from "../Context/Context"
import { NavLink } from 'react-router-dom'
import moment from 'moment';
import { convertView } from '../Context/Convertor';
const Feed = () => {
  const { category, isSidebarOn } = useSideBar();
  const [data, setData] = useState([]);

  const fetchData = useCallback(
    async () => {
      const API_KEY = import.meta.env.VITE_YT_API_KEY;

      const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;

      const res = await fetch(videoListUrl);

      const data = await res.json();
      setData(data.items)

    }, [category])

  useEffect(() => { fetchData() }, [fetchData, category])

  return (
    <>
      {data.map(item => (
        <NavLink key={item?.id} to={`/watch/${item?.snippet?.categoryId}/${item?.id}`} className={`mb-4 hover:bg-slate-50 rounded-lg p-2 ${isSidebarOn ? "w-72" : "w-[20rem] "}  flex flex-col items-center`}>
          <div className={`${isSidebarOn ? "h-[9.7rem]" : "h-44"} rounded-lg overflow-hidden w-full`}>
            <img className=' h-full w-full object-cover' src={item?.snippet?.thumbnails?.standard?.url} alt="Logo" />
          </div>
          <div className='flex w-full flex-col gap-1 pt-2'>
            <h3 className="text-sm title font-medium leading-[1.1] text-start">{item?.snippet?.title}</h3>
            <h4 className='text-sm font-medium opacity-80'>{item?.snippet?.channelTitle}</h4>
            <p className='opacity-70 text-xs'>{convertView(item?.statistics?.viewCount)} &bull; {moment(item?.snippet?.publishedAt).fromNow()} </p>
          </div>
        </NavLink >
      ))}
    </>
  )
}



export default Feed