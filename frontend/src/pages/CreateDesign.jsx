import React, { useState, useContext } from 'react'
import { Wand2, Home, Palette, Sparkles, Download, Share2, Heart, RefreshCw, ImageIcon, Loader2 } from 'lucide-react'
import { AppContext } from '../context/Provider'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateDesign = () => {
  const { theme, user } = useContext(AppContext)
  const [prompt, setPrompt] = useState('')
  const [roomType, setRoomType] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [designHistory, setDesignHistory] = useState([])

  const roomTypes = [
    { value: 'living-room', label: 'Living Room', icon: '🛋️' },
    { value: 'bedroom', label: 'Bedroom', icon: '🛏️' },
    { value: 'kitchen', label: 'Kitchen', icon: '👨‍🍳' },
    { value: 'bathroom', label: 'Bathroom', icon: '🛁' },
    { value: 'dining-room', label: 'Dining Room', icon: '🍽️' },
    { value: 'office', label: 'Home Office', icon: '💼' },
    { value: 'balcony', label: 'Balcony', icon: '🌿' },
    { value: 'garden', label: 'Garden', icon: '🌺' }
  ]

  const stylePresets = [
    { label: 'Modern', value: 'modern minimalist style' },
    { label: 'Cozy', value: 'warm cozy atmosphere' },
    { label: 'Luxury', value: 'luxury elegant design' },
    { label: 'Vintage', value: 'vintage retro style' },
    { label: 'Industrial', value: 'industrial loft style' },
    { label: 'Scandinavian', value: 'scandinavian nordic style' }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a design prompt')
      return
    }
    
    if (!roomType) {
      toast.error('Please select a room type')
      return
    }

    setIsGenerating(true)
    try {
      // Combine prompt with room type for better results
      const fullPrompt = `${prompt}, ${roomType} interior design`
      
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/design/generate-design/prompt`,
        {
          prompt: fullPrompt,
          roomType: roomType
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('Design generation response:', res.data)
      
      if (res.status==200 || res.status==201 && res.data.imageUrl) {
        setGeneratedImage({
          url: res.data.imageUrl,
          prompt: fullPrompt,
          roomType: roomType,
          timestamp: new Date().toISOString()
        })
        
        // Add to history
        setDesignHistory(prev => [{
          url: res.data.imageUrl,
          prompt: fullPrompt,
          roomType: roomType,
          timestamp: new Date().toISOString()
        }, ...prev.slice(0, 4)]) // Keep last 5 designs
        
        toast.success('Design generated successfully!')
        setPrompt('')
        setRoomType('')
      } else {
        toast.error('Failed to generate design. Please try again.')
      }
    } catch (error) {
      console.error('Design generation error:', error)
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Failed to generate design')
      } else {
        toast.error('Failed to generate design. Please try again.')
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const handleStylePreset = (styleValue) => {
    setPrompt(prev => {
      const newPrompt = prev ? `${prev}, ${styleValue}` : styleValue
      return newPrompt
    })
  }

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `interior-design-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Image downloaded successfully!')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download image')
    }
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4">
            <Wand2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Generate Your Dream Interior
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Transform your ideas into stunning interior designs with the power of AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Input Form */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <div className="bg-base-200 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Sparkles className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-base-content">Describe Your Vision</h3>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your ideal interior design... (e.g., 'modern living room with plants, natural lighting, minimalist furniture')"
                className="w-full h-32 p-4 border border-base-300 rounded-xl bg-base-100 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-base-content/60">
                  {prompt.length}/500 characters
                </span>
                <button
                  onClick={() => setPrompt('')}
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Style Presets */}
            <div className="bg-base-200 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Palette className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-base-content">Quick Style Presets</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {stylePresets.map((style, index) => (
                  <button
                    key={index}
                    onClick={() => handleStylePreset(style.value)}
                    className="p-2 text-sm bg-base-100 hover:bg-primary hover:text-white rounded-lg transition-all duration-200 text-base-content border border-base-300 hover:border-primary"
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Type Selection */}
            <div className="bg-base-200 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Home className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-base-content">Select Room Type</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {roomTypes.map((room) => (
                  <button
                    key={room.value}
                    onClick={() => setRoomType(room.value)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                      roomType === room.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-base-300 bg-base-100 text-base-content hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{room.icon}</div>
                    <div className="text-sm font-medium">{room.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim() || !roomType}
              className={`w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                isGenerating || !prompt.trim() || !roomType ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating Your Design...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Wand2 className="h-5 w-5 mr-2" />
                  Generate Design
                </div>
              )}
            </button>
          </div>

          {/* Right Side - Results */}
          <div className="space-y-6">
            {/* Main Result */}
            {generatedImage ? (
              <div className="bg-base-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-base-content">Generated Design</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(generatedImage.url)}
                      className="p-2 bg-base-100 hover:bg-primary hover:text-white rounded-lg transition-all duration-200 text-base-content"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="relative group">
                  <img
                    src={generatedImage.url}
                    alt="Generated Interior Design"
                    className="w-full h-64 sm:h-80 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-xl"></div>
                </div>
                <div className="mt-4 p-3 bg-base-100 rounded-lg">
                  <p className="text-sm text-base-content/70 mb-1">
                    <strong>Room:</strong> {roomTypes.find(r => r.value === generatedImage.roomType)?.label}
                  </p>
                  <p className="text-sm text-base-content/70">
                    <strong>Prompt:</strong> {generatedImage.prompt}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-base-200 rounded-2xl p-6">
                <div className="text-center py-12">
                  <ImageIcon className="h-16 w-16 text-base-content/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-base-content mb-2">
                    Your Design Will Appear Here
                  </h3>
                  <p className="text-base-content/60">
                    Enter a prompt and select a room type to generate your design
                  </p>
                </div>
              </div>
            )}

            {/* Design History */}
            {designHistory.length > 0 && (
              <div className="bg-base-200 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <RefreshCw className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-base-content">Recent Designs</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {designHistory.map((design, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src={design.url}
                        alt={`Design ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                        onClick={() => setGeneratedImage(design)}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-lg"></div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownload(design.url)
                        }}
                        className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <Download className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-base-content mb-4 text-center">
            💡 Tips for Better Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="font-medium text-base-content mb-1">Be Specific</h4>
              <p className="text-sm text-base-content/70">Include colors, materials, and mood in your description</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💡</div>
              <h4 className="font-medium text-base-content mb-1">Lighting Matters</h4>
              <p className="text-sm text-base-content/70">Mention natural light, lamps, or ambient lighting</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🪴</div>
              <h4 className="font-medium text-base-content mb-1">Add Details</h4>
              <p className="text-sm text-base-content/70">Include plants, artwork, or decorative elements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateDesign
