import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import Feed from './Pages/Feed'
import SearchBar from './Pages/SearchBar'
import SideBar from './Pages/SideBar'
import VideoPLayer from './Pages/VideoPLayer'


const Home = () => {
  return (
    <section className=' flex flex-col h-screen w-full'>
      <SearchBar />
      <main className='flex-1 overflow-auto flex'>
        <SideBar />
        <section className="flex-1 flex flex-wrap pl-1 overflow-auto pt-4 pb-20 videosList">
          <Feed />
        </section>
      </main>
    </section>
  )
}
const Video = () => {
  return (
    <VideoPLayer />
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/watch/:categoryId/:videoId",
    element: <Video />
  }
])
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App