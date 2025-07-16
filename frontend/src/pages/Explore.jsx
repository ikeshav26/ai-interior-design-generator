import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AppContext } from '../context/Provider'

const Explore = () => {
  const [data, setData] = useState([])
  const {user,setuser,navigate}=useContext(AppContext)

  useEffect(() => {
    const getDesigns = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/design/explore`,
          {
            withCredentials: true,
          }
        )

        if (res.status === 200 || res.status === 201) {
          setData(res.data)
          toast.success('Designs loaded successfully')
        } else {
          toast.error('Failed to load designs. Please try again later.')
        }
      } catch (error) {
        console.error('Error fetching designs:', error)
        
        if (error.response?.status === 401) {
          toast.error('Unauthorized access. Please log in again.')
          setuser(false)
          localStorage.removeItem("user")
          navigate('/')
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error('Failed to load designs. Please try again later.')
        }
      }
    }

    getDesigns()
  }, [])

  console.log('Fetched designs:', data)

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Design Gallery
          </h1>
          <p className="text-lg text-base-content/60">
            Discover amazing interior designs ✨
          </p>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-xl text-base-content/70 mb-2">No designs available yet</p>
            <p className="text-base-content/50">Be the first to create something amazing!</p>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-6">
              <p className="text-base-content/60 font-medium">
                Showing {data.length} amazing designs
              </p>
            </div>

            {/* Pinterest-style Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
              {data.map((design, index) => (
                <div
                  key={design._id}
                  className="break-inside-avoid group bg-white/50 dark:bg-base-300/50 backdrop-blur-sm rounded-3xl border border-base-content/5 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden mb-6"
                >
                  {/* Image with dynamic height for Pinterest effect */}
                  <div className="relative overflow-hidden">
                    <img
                      src={design.imageUrl}
                      alt={design.roomType || 'Interior Design'}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{
                        // Random heights for Pinterest effect
                        height: `${250 + (index % 4) * 80}px`,
                        objectFit: 'cover'
                      }}
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    
                    {/* Room type badge on image */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full border border-white/20 shadow-lg">
                        {design.roomType?.replace('-', ' ').toUpperCase() || 'DESIGN'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Room type */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-primary uppercase tracking-wide">
                        {design.roomType?.replace('-', ' ') || 'Interior Design'}
                      </h3>
                      
                      {/* User info */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {design.userId?.username?.charAt(0).toUpperCase() || '?'}
                          </span>
                        </div>
                        <span className="text-xs text-base-content/60 font-medium">
                          {design.userId?.username || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Explore
