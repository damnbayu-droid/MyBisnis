
'use client'

import { useState, useEffect } from 'react'

// Layout Components
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import Features from '@/components/landing/Features'
import ProductList from '@/components/landing/ProductList'
import Stats from '@/components/landing/Stats'
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'

// Global Components
import dynamic from 'next/dynamic'

// Global Components
const LoginModal = dynamic(() => import('@/components/modals/LoginModal'), { ssr: false })
const RegisterModal = dynamic(() => import('@/components/modals/RegisterModal'), { ssr: false })
const GuideModal = dynamic(() => import('@/components/modals/GuideModal'), { ssr: false })
const CourierMapModal = dynamic(() => import('@/components/modals/CourierMapModal'), { ssr: false })
const WebsiteOrderModal = dynamic(() => import('@/components/modals/WebsiteOrderModal'), { ssr: false })

import ChatWidget from '@/components/chat/ChatWidget'
import StartBusinessCTA from '@/components/landing/StartBusinessCTA'
import { createClient } from '@/lib/supabase/client'

import 'leaflet/dist/leaflet.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showGuideModal, setShowGuideModal] = useState(false)
  const [showCourierMap, setShowCourierMap] = useState(false)
  const [showWebsiteOrder, setShowWebsiteOrder] = useState(false)
  const [selectedWebsiteType, setSelectedWebsiteType] = useState('')

  const [currentUser, setCurrentUser] = useState(null)

  // Use Context instead of local state
  const { language } = useLanguage()

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)

      // Determine if admin
      const isAdmin =
        user.user_metadata?.role === 'admin' ||
        user.role === 'admin' ||
        user.email === 'damnbayu4@gmail.com' ||
        user.email === 'admin@email.com'

      // Redirect to Marketplace if already logged in, unless Admin
      if (!isAdmin) {
        window.location.href = '/marketplace'
      } else {
        window.location.href = '/admin'
      }
    }
  }, [])

  const handleRequestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.warn('Location access denied or error, defaulting to Jakarta.')
          // Default to Jakarta if location access denied or error
          if (!userLocation) {
            setUserLocation({ lat: -6.2088, lng: 106.8456 })
          }
        }
      )
    } else {
      if (!userLocation) {
        setUserLocation({ lat: -6.2088, lng: 106.8456 })
      }
    }
  }

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
    setShowLoginModal(false)
    alert('Login berhasil!')

    // Redirect based on role
    setTimeout(() => {
      if (user.user_metadata?.role === 'admin' || user.role === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/marketplace'
      }
    }, 500)
  }

  const handleRegisterSuccess = (user: any) => {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
    setShowRegisterModal(false)
    alert('Registrasi berhasil!')
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    window.location.href = '/' // Force reload to clear state
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenLogin={() => setShowLoginModal(true)}
        onOpenRegister={() => setShowRegisterModal(true)}
      />

      <Hero
        language={language}
        onOpenGuide={() => setShowGuideModal(true)}
        onOpenCourierMap={() => {
          handleRequestLocation()
          setShowCourierMap(true)
        }}
      />

      {/* Pass language to these components so they can select correct data */}
      <HowItWorks language={language} />

      <Features language={language} />

      <ProductList language={language} />

      <Stats language={language} />

      <StartBusinessCTA
        language={language}
        onOpenRegister={() => setShowRegisterModal(true)}
        onOpenGuide={() => setShowGuideModal(true)}
      />

      <Pricing
        language={language}
        selectedWebsiteType={selectedWebsiteType}
        setSelectedWebsiteType={setSelectedWebsiteType}
        onOpenOrderModal={() => setShowWebsiteOrder(true)}
      />

      <Footer language={language} />

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onOpenChange={setShowLoginModal}
        onSwitchToRegister={() => {
          setShowLoginModal(false)
          setShowRegisterModal(true)
        }}
        onLoginSuccess={handleLoginSuccess}
        language={language}
        onRequestLocation={handleRequestLocation}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onOpenChange={setShowRegisterModal}
        onSwitchToLogin={() => {
          setShowRegisterModal(false)
          setShowLoginModal(true)
        }}
        onRegisterSuccess={handleRegisterSuccess}
        language={language}
        onRequestLocation={handleRequestLocation}
      />

      <GuideModal
        isOpen={showGuideModal}
        onOpenChange={setShowGuideModal}
        onOpenRegister={() => {
          setShowGuideModal(false)
          setShowRegisterModal(true)
        }}
      />

      <CourierMapModal
        isOpen={showCourierMap}
        onOpenChange={setShowCourierMap}
        userLocation={userLocation}
        language={language}
      />

      <WebsiteOrderModal
        isOpen={showWebsiteOrder}
        onOpenChange={setShowWebsiteOrder}
        selectedWebsiteType={selectedWebsiteType}
        setSelectedWebsiteType={setSelectedWebsiteType}
      />

      {/* Search/Chat Widget - Only on Landing Page */}
      <ChatWidget />
    </div>
  )
}