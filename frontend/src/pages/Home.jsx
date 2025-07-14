import React, { useContext } from 'react'
import {
  ArrowRight,
  Sparkles,
  Clock,
  Palette,
  Wand2,
  Eye,
  Shield,
  Zap,
  Lightbulb,
} from 'lucide-react'
import { AppContext } from '../context/Provider'
import { Link } from 'react-router-dom'

const Home = () => {
  const { theme } = useContext(AppContext)

  const heroImage = 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80'

  const featureImages = [
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80', // AI-Powered Design
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80', // Instant Results
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',    // Unlimited Styles
  ]

  const features = [
    {
      icon: Wand2,
      title: "AI-Powered Design",
      description: "Advanced AI creates personalized interior designs instantly",
      img: featureImages[0],
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get professional designs in seconds, not weeks",
      img: featureImages[1],
    },
    {
      icon: Palette,
      title: "Unlimited Styles",
      description: "From modern to traditional - explore endless possibilities",
      img: featureImages[2],
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: "100% Free",
      description: "No hidden costs or subscriptions required",
    },
    {
      icon: Eye,
      title: "No Design Skills Needed",
      description: "Anyone can create professional-looking interiors",
    },
    {
      icon: Shield,
      title: "Save Thousands",
      description: "Skip expensive interior designers and consultations",
    }
  ]

  const steps = [
    {
      step: "01",
      title: "Describe Your Vision",
      description: "Tell us about your dream room style and preferences"
    },
    {
      step: "02",
      title: "AI Creates Magic",
      description: "Our AI generates multiple design options instantly"
    },
    {
      step: "03",
      title: "Download & Enjoy",
      description: "Save your favorite designs and bring them to life"
    }
  ]

  return (
    <div className="bg-base-100 text-base-content transition-colors duration-300">

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-base-100/80 via-base-100/60 to-primary/20 backdrop-blur-[2px]"></div>

        {/* Floating Blobs */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-pulse delay-300"></div>

        <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl">
          {/* tagline */}
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium text-sm mb-4">
            ✨ AI-Powered Interior Design Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-base-content leading-tight">
            Design Your
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Dream Space
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-base-content/80 leading-relaxed">
            Transform any room instantly with AI-powered interior design.
            <span className="text-primary font-semibold"> Free, fast, and incredibly beautiful results.</span>
          </p>
          <p className="flex items-center justify-center space-x-2 max-w-xl mx-auto bg-primary/10 text-primary font-medium text-base md:text-lg rounded-md px-4 py-2 shadow-sm backdrop-blur-sm">
            <Lightbulb className="w-5 h-5 text-primary" />
            <span>Just provide a prompt and get your image ready in seconds.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to='/generate'>
              <button className="cursor-pointer group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center">
                Start Designing Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            <Link to='/Explore'>
              <button className="cursor-pointer group border-2 border-base-content/20 text-base-content hover:bg-base-content/5 hover:border-primary/40 px-10 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                Explore Gallery
              </button>
            </Link>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-base-content/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Why Our App Section */}
      <section className="py-20 bg-base-200 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Why Choose InteriorAI?
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Revolutionary AI technology meets interior design expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-base-content group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-base-content/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              How It Works
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Three simple steps to your dream interior.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative text-center space-y-6 p-8 rounded-2xl border border-base-300 hover:border-primary/50 hover:bg-base-300/5 transition-all duration-300 group"
              >
                {/* connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -translate-x-4 z-0"></div>
                )}

                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-primary/20">
                    <span className="text-2xl font-bold text-primary">{step.step}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-base-content group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-base-content/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-base-200 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Benefits Over Traditional Design
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Experience the future of interior design.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-base-300/50 hover:border-primary/30"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-6 transition-transform duration-300">
                    <benefit.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full blur-sm group-hover:scale-150 transition-transform duration-300"></div>
                </div>

                <h3 className="text-xl font-semibold text-base-content group-hover:text-primary transition-colors duration-300 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <Sparkles className="h-16 w-16 text-primary mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-base-content">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Join thousands of users who’ve already redesigned their homes with AI.
          </p>
          <Link to='/generate'>
            <button className="cursor-pointer bg-primary hover:bg-primary/80 text-primary-content px-10 py-4 rounded-lg font-medium text-lg transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto group">
              Start Your Design Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home
