import React, { useState, useEffect, useContext } from 'react'
import { User, Edit3, Trash2, Camera, Save, X, Settings, Grid3X3, Calendar, Download } from 'lucide-react'
import { AppContext } from '../context/Provider'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, setuser, theme, updateUser } = useContext(AppContext)
  const [userDesigns, setUserDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [newUsername, setNewUsername] = useState(user?.username || '')
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)
  const [newAvatar, setNewAvatar] = useState(user?.avatar || '')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [stats, setStats] = useState({
    totalDesigns: 0
  })

  useEffect(() => {
    if (user) {
      setNewUsername(user.username)
      setNewAvatar(user.avatar || '')
      fetchUserDesigns()
    }
  }, [user])

  const fetchUserDesigns = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/design/my-designs`,
        { withCredentials: true }
      )
      
      if (res.status === 200) {
        setUserDesigns(res.data.designs || [])
        // Calculate stats
        const designs = res.data.designs || []
        setStats({
          totalDesigns: designs.length
        })
        console.log("fetched successfully")
      }
    } catch (error) {
      console.error('Error fetching user designs:', error)
      toast.error('Failed to load your designs')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUsername = async () => {
    if (!newUsername.trim()) {
      toast.error('Username cannot be empty')
      return
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/user/update/username`,
        { username: newUsername },
        { withCredentials: true }
      )

      console.log('Username update response:', res.data) // Debug log

      if (res.status == 200 || res.status == 201) {
        // Update user state immediately using the context function
        updateUser({ username: newUsername })
        setIsEditingUsername(false)
        toast.success('Username updated successfully!')
      }
    } catch (error) {
      console.error('Error updating username:', error)
      toast.error(error.response?.data?.message || 'Failed to update username')
    }
  }

  const handleUpdateAvatar = async () => {
    if (!newAvatar.trim()) {
      toast.error('Please enter a valid avatar URL')
      return
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/user/update/avatar`,
        { avatar: newAvatar },
        { withCredentials: true }
      )

      console.log('Avatar update response:', res.data) // Debug log

      if (res.status == 200 || res.status == 201) {
        // Update user state immediately using the context function
        updateUser({ avatar: newAvatar })
        setIsEditingAvatar(false)
        toast.success('Avatar updated successfully!')
      }
    } catch (error) {
      console.error('Error updating avatar:', error)
      toast.error(error.response?.data?.message || 'Failed to update avatar')
    }
  }

  const handleDeleteDesign = async (designId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/api/design/delete/${designId}`,
        { withCredentials: true }
      )

      if (res.status === 200) {
        setUserDesigns(userDesigns.filter(design => design._id !== designId))
        setDeleteConfirm(null)
        toast.success('Design deleted successfully')
        // Update stats
        const updatedDesigns = userDesigns.filter(design => design._id !== designId)
        setStats({
          totalDesigns: updatedDesigns.length
        })
      }
    } catch (error) {
      console.error('Error deleting design:', error)
      toast.error('Failed to delete design')
    }
  }

  const handleDownload = async (imageUrl, designId) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `design-${designId}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Downloaded successfully!')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download image')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-base-content mb-2">Access Denied</h2>
          <p className="text-base-content/60">Please log in to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white/50 dark:bg-base-300/50 backdrop-blur-sm rounded-3xl border border-base-content/10 shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user.username?.charAt(0).toUpperCase()
                )}
              </div>
              <button
                onClick={() => setIsEditingAvatar(true)}
                className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                {isEditingUsername ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="px-4 py-2 bg-base-100 border border-base-content/20 rounded-xl focus:outline-none focus:border-primary text-lg font-bold"
                      placeholder="Enter username"
                    />
                    <button
                      onClick={handleUpdateUsername}
                      className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingUsername(false)
                        setNewUsername(user.username)
                      }}
                      className="p-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-base-content">{user.username}</h1>
                    <button
                      onClick={() => setIsEditingUsername(true)}
                      className="p-2 text-base-content/60 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-base-content/60 mb-6">
                Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.totalDesigns}</div>
                  <div className="text-sm text-base-content/60">Designs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Designs Section */}
        <div className="bg-white/50 dark:bg-base-300/50 backdrop-blur-sm rounded-3xl border border-base-content/10 shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-base-content flex items-center gap-3">
              <Grid3X3 className="h-6 w-6 text-primary" />
              My Designs
            </h2>
            <span className="text-base-content/60 font-medium">
              {userDesigns.length} design{userDesigns.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-base-200 rounded-2xl animate-pulse">
                  <div className="w-full h-64 bg-base-300 rounded-t-2xl"></div>
                  <div className="p-4">
                    <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-base-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : userDesigns.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-base-content mb-2">No designs yet</h3>
              <p className="text-base-content/60 mb-6">
                Start creating amazing interior designs to see them here!
              </p>
              <button
                onClick={() => window.location.href = '/create-design'}
                className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors duration-200"
              >
                Create First Design
              </button>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {userDesigns.map((design, index) => (
                <div
                  key={design._id}
                  className="break-inside-avoid group bg-white/70 dark:bg-base-200/70 backdrop-blur-sm rounded-2xl border border-base-content/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mb-6"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={design.imageUrl}
                      alt={design.roomType || 'Design'}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{
                        height: `${250 + (index % 3) * 60}px`,
                        objectFit: 'cover'
                      }}
                    />
                    
                    {/* Action buttons overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <button
                          onClick={() => handleDownload(design.imageUrl, design._id)}
                          className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(design._id)}
                          className="p-2 bg-red-500/90 hover:bg-red-500 text-white rounded-xl backdrop-blur-sm border border-red-500/20 transition-all duration-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-primary uppercase tracking-wide">
                        {design.roomType?.replace('-', ' ') || 'Design'}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-base-content/60">
                        <Calendar className="h-3 w-3" />
                        {new Date(design.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar Edit Modal */}
        {isEditingAvatar && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-base-300 rounded-3xl p-8 max-w-md w-full">
              <h3 className="text-xl font-bold text-base-content mb-6">Update Avatar</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    value={newAvatar}
                    onChange={(e) => setNewAvatar(e.target.value)}
                    className="w-full px-4 py-3 bg-base-100 border border-base-content/20 rounded-xl focus:outline-none focus:border-primary"
                    placeholder="Enter image URL"
                  />
                </div>
                {newAvatar && (
                  <div className="text-center">
                    <img
                      src={newAvatar}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary/20"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUpdateAvatar}
                    className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
                  >
                    Save Avatar
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingAvatar(false)
                      setNewAvatar(user.avatar || '')
                    }}
                    className="flex-1 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-base-300 rounded-3xl p-8 max-w-md w-full">
              <h3 className="text-xl font-bold text-base-content mb-4">Delete Design</h3>
              <p className="text-base-content/70 mb-6">
                Are you sure you want to delete this design? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDeleteDesign(deleteConfirm)}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
