
import React, { useCallback, useEffect, useState } from 'react'
import SearcBar from "./SearchBar"
import { NavLink, useParams } from 'react-router-dom'
import { Bell, BellRing, Share2, ThumbsDown, ThumbsUp } from 'lucide-react'
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { convertTextToHtml, convertView } from '../Context/Convertor';
import moment from 'moment';
import { useSideBar } from '../Context/Context';

const VideoPLayer = () => {
    const [videoData, setVideoData] = useState(null)
    const [channelData, setChannelData] = useState(null)
    const [comments, setComments] = useState(null)
    const { videoId, categoryId } = useParams()
    const [isDescHeightFull, setIsDescHeightFull] = useState(false)
    const [subscribe, setSubscribe] = useState(true)
    const [suggestedVideosData, setSuggestedVideosData] = useState(null)
    const API_KEY = import.meta.env.VITE_YT_API_KEY;
    const { category } = useSideBar();
    const fetchData = useCallback(async () => {
        try {

            // fetch video data
            const videoDataURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
            const videoDataRes = await fetch(videoDataURL)
            const videosData = await videoDataRes.json()
            const videos = videosData.items[0];
            setVideoData(videos);


            // fetch channel data
            const channelID = videos?.snippet?.channelId;
            if (channelID) {
                const channelDataURL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelID}&key=${API_KEY}`
                const channelDataRes = await fetch(channelDataURL);
                const channelInfo = await channelDataRes.json();
                setChannelData(channelInfo.items[0])
            }

            // fetch comments 

            const commentsDataURL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`

            const response = await fetch(commentsDataURL)
            const commentsData = await response.json();
            setComments(commentsData.items)

            // fetch suggest Videos Data
            const suggestVideoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;

            const res = await fetch(suggestVideoListUrl);

            const data = await res.json();
            setSuggestedVideosData(data.items)
        }
        catch (error) {
            console.log(error);

        }
    }, [videoId, categoryId])

    useEffect(() => {
        fetchData();
    }, [fetchData])
    if (videoData && channelData) {
        return (
            <>
                {/* Search Bar */}
                <SearcBar isSliderBtnVisible={false} />
                <section className='px-10 flex gap-10 py-5 w-full'>
                    {/* video Section Start  */}
                    <div className='w-4/6'>
                        <div className='w-full rounded-2xl overflow-hidden'>
                            <div className='w-full h-96'>
                                <iframe className='w-full h-full' src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow=" accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </div>
                        </div>

                        <div className='w-full'>
                            {/* Video Title Section Start */}
                            <h1 className='font-extrabold text-lg mt-2'>{videoData?.snippet?.title}</h1>
                            <div className='flex justify-between h-12'>
                                <div className="py-2 flex gap-2 items-center">
                                    <img className='h-10 w-10 rounded-full object-cover' src={channelData?.snippet?.thumbnails?.high?.url} alt="" />
                                    <span className='mr-2 flex h-full justify-between flex-col pl-2'>
                                        <span className='text-base leading-none font-bold'>{videoData?.snippet?.channelTitle}</span>
                                        <span className="text-xs leading-none">{channelData && convertView(channelData?.statistics?.subscriberCount)} subscriber</span>
                                    </span>
                                    {subscribe ? (<button onClick={() => setSubscribe(!subscribe)} className='h-full hover:bg-gray-300 px-3 outline-none border-none rounded-full bg-[#E5E5E5] flex items-center'>
                                        <span>
                                            <Bell className='h-4 m-0' />
                                        </span>
                                        <span>
                                            Subscribe
                                        </span>
                                    </button>)
                                        :
                                        (<button onClick={() => setSubscribe(!subscribe)} className='h-full hover:bg-gray-300 px-3 outline-none border-none rounded-full bg-[#E5E5E5] flex items-center'>
                                            <span>
                                                <BellRing className='h-4 m-0' />
                                            </span>
                                            <span>
                                                Subscribed
                                            </span>
                                        </button>)}
                                </div>
                                <div className='flex py-2 gap-2 '>
                                    <div className='flex'>
                                        <button className='px-2 hover:bg-gray-300 rounded-tl-2xl rounded-bl-2xl outline-none border-none  bg-[#E5E5E5] flex items-center' >
                                            <span>
                                                <ThumbsUp className='h-4' />
                                            </span>
                                            <span>{convertView(videoData?.statistics?.likeCount)}</span>
                                        </button>
                                        <span className='h-full w-[2px] bg-gray-400'></span>
                                        <button className='px-2 rounded-tr-2xl rounded-br-2xl hover:bg-gray-300 outline-none border-none  bg-[#E5E5E5] flex items-center'>
                                            <span>
                                                <ThumbsDown className='h-4' />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="flex">
                                        <button className='px-2 hover:bg-gray-300 rounded-2xl outline-none border-none  bg-[#E5E5E5] flex items-center' >
                                            <span>
                                                <Share2 className='h-4' />
                                            </span>
                                            <span>Share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Video Title Section End */}
                            {/* Video description Section Start */}
                            <div className={`${isDescHeightFull && "h-full"} mt-5 bg-[#F2F2F2] cursor-pointer p-3 rounded-xl overflow-hidden`}>
                                <div onClick={() => setIsDescHeightFull(true)} className='TAGS flex items-center leading-none text-sm'>
                                    <span className='font-medium'>{convertView(videoData?.statistics?.viewCount)} Views</span>
                                    <span className='font-medium pl-2'>{moment(videoData?.snippet?.publishedAt).fromNow()}</span>
                                    <span className='pl-2 flex'>#nodejs #mernstack #systemdesign</span>
                                </div>
                                <div onClick={() => setIsDescHeightFull(true)} className='DESCRIPTION'>
                                    <p className='text-sm pt-1 leading-[1.1] opacity-90'>
                                        {parse(DOMPurify.sanitize(convertTextToHtml(isDescHeightFull ? `${videoData?.snippet?.description}` : `${videoData?.snippet?.description.slice(0, 231)}`)))}
                                    </p>
                                </div>
                                <div  >
                                    <span onClick={() => setIsDescHeightFull(prev => !prev)} className='leading-none text-sm font-bold'>{`${isDescHeightFull ? "Show less" : "Show more.."} `}</span>
                                </div>
                            </div>
                            {/* Video description Section End */}
                            {/* Video Comments Section Start */}
                            <div className='mt-8 w-full'>
                                <div>
                                    <strong className='text-xl'>{convertView(videoData?.statistics?.commentCount)} Comments</strong>
                                </div>
                                <div className='flex mt-5 gap-3 items-center'>
                                    <div>
                                        <img className='h-10 w-10 rounded-full object-cover' src="../../Public/images/User.webp" alt="" />
                                    </div>
                                    <div className='w-full'>
                                        <input className='pb-2 outline-none focus:border-b-black placeholder:text-sm w-full h-full border-b' type="text" placeholder='Add a comment..' />
                                    </div>
                                </div>
                                <div className='mt-8 flex flex-col gap-8 '>
                                    {comments && comments.map((comment, index) => (
                                        <Comments
                                            imgUrl={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                                            key={index}
                                            authorUserName={comment.snippet.topLevelComment.snippet.authorDisplayName}
                                            commentText={comment.snippet.topLevelComment.snippet.textOriginal}
                                            commentsLike={convertView(comment.snippet.topLevelComment.snippet.likeCount)}
                                            uploadTime={moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* Video Comments Section End */}
                        </div>
                    </div>
                    {/* video Section End  */}

                    {/* Side Bar // Suggested Start */}
                    <div className='w-3/6 flex flex-col gap-4'>
                        {suggestedVideosData && suggestedVideosData.map(suggestedVideo => (
                            <SuggestedVideos key={suggestedVideo?.id}
                                channelName={suggestedVideo?.snippet?.channelTitle}
                                titleText={suggestedVideo?.snippet?.title}
                                imgUrl={suggestedVideo?.snippet?.thumbnails?.high?.url}
                                viewCount={convertView(suggestedVideo?.statistics?.viewCount)}
                                uploadTime={moment(suggestedVideo?.snippet?.publishedAt).fromNow()}
                                categoryId={suggestedVideo?.snippet?.categoryId}
                                videoId={suggestedVideo?.id}
                            />
                        ))}
                    </div>
                    {/* Side Bar // Suggested End */}
                </section >
            </>
        )
    }
}

const Comments = ({ uploadTime, imgUrl, authorUserName, commentText, commentsLike }) => {
    return (
        <div className='flex'>
            <div className='h-full w-20 '>
                <img className='h-10 w-10 rounded-full object-cover' src={imgUrl} alt="" />
            </div>
            <div className='w-full'>
                <h5 className=' flex gap-3 '>
                    <span className='text-sm font-bold leading-none'>{authorUserName} </span>
                    <span className='leading-none  font-normal opacity-80 text-xs'>{uploadTime}</span>
                </h5>
                <p className='mt-1 text-sm'>{commentText}</p>
                <div className='mt-2 flex gap-3' >
                    <button className='flex items-center  hover:bg-gray-300 rounded-2xl outline-none border-none px-2 py-1 bg-[#E5E5E5]'>
                        <span>
                            <ThumbsUp className='h-4' />
                        </span>
                        <span>{commentsLike}</span>
                    </button>
                    <button className='hover:bg-gray-300 rounded-2xl outline-none border-none px-2 py-1 bg-[#E5E5E5]'>
                        <span>
                            <ThumbsDown className='h-4' />
                        </span>
                    </button>
                </div>
            </div>

        </div>
    )
}

const SuggestedVideos = ({ videoId, imgUrl, categoryId, titleText, channelName, viewCount, uploadTime }) => {
    return (
        <NavLink id="Container" to={`/watch/${categoryId}/${videoId}`} className="w-full hover:bg-gray-100 rounded-xl p-2">
            <div id='Videos' className='w-full flex gap-2'>
                <div className='rounded-xl overflow-hidden'>
                    <img className='h-28 w-[18rem] object-cover' src={imgUrl} alt="" />
                </div>
                <div className='flex w-full flex-col justify-between py-2'>
                    <h4 id='title' className='font-medium leading-[1.2]'>
                        {titleText}
                    </h4>
                    <span className='text-sm' id="Channel">
                        {channelName}
                    </span>
                    <span className='text-sm'>
                        {viewCount} views &bull; {uploadTime}
                    </span>
                </div>
            </div>
        </NavLink>
    )
}
export default VideoPLayer

