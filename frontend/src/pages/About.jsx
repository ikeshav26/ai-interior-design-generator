import React from 'react'
import { Sparkles, Wand2, Home, Palette } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-4">
            About InteriorAI
          </h1>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Transforming your imagination into breathtaking interior designs — powered by cutting-edge AI.
          </p>
        </div>

        <div className="space-y-10">
          {/* Section 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <Wand2 className="h-16 w-16 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-base-content mb-2">
                What is InteriorAI?
              </h2>
              <p className="text-base-content/70">
                InteriorAI is an AI-powered tool that helps you generate stunning interior designs in seconds.
                Simply describe your vision, choose a room type, and let the AI create realistic renderings tailored
                to your style and preferences.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <Palette className="h-16 w-16 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-base-content mb-2">
                Why Choose InteriorAI?
              </h2>
              <ul className="list-disc pl-6 text-base-content/70 space-y-2">
                <li>No design experience required — perfect for homeowners and professionals alike.</li>
                <li>Generate multiple styles from modern minimalism to cozy vintage.</li>
                <li>Save time and explore creative possibilities effortlessly.</li>
                <li>Build a portfolio or plan your dream home with stunning visuals.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <Home className="h-16 w-16 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-base-content mb-2">
                How it Works
              </h2>
              <p className="text-base-content/70">
                Describe your design ideas, select a room type (like bedroom, kitchen, or office),
                and choose a style preset or customize your own. InteriorAI uses advanced AI models
                to turn your words into beautifully rendered interior visuals you can download, share,
                or keep for inspiration.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-base-content/70">
            ✨ Ready to bring your dream spaces to life? Start creating with InteriorAI today!
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
