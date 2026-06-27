import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { AlertProvider } from './contexts/AlertContext'
import { SystemProvider } from './contexts/SystemContext'
import { BoardProvider } from './contexts/BoardContext'
import { WeaponsProvider } from './contexts/WeaponsContext'
import AlertTicker from './components/AlertTicker'
import NotificationToast from './components/NotificationToast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Main sections
import HeroSection from './components/HeroSection'
import IntelligenceSection from './components/IntelligenceSection'
import AnalyticsSection from './components/AnalyticsSection'
import SolutionsSection from './components/SolutionsSection'
import ReportsSection from './components/ReportsSection'
import ContactSection from './components/ContactSection'

// Platform pages
import Sol01 from './pages/sol/Sol01'
import Sol02 from './pages/sol/Sol02'
import Sol03 from './pages/sol/Sol03'
import Sol04 from './pages/sol/Sol04'
import Sol05 from './pages/sol/Sol05'
import Sol06 from './pages/sol/Sol06'
import CommandCenter from './pages/CommandCenter'
import ControlPanel from './pages/ControlPanel'

// Board pages
import NoticeBoard from './pages/board/NoticeBoard'
import ReportBoard from './pages/board/ReportBoard'
import IntelBoard from './pages/board/IntelBoard'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'

// Weapons DB
import WeaponsDB from './pages/WeaponsDB'
import WeaponsAdmin from './pages/admin/WeaponsAdmin'

// Global Monitors
import WorldMonitor from './pages/WorldMonitor'
import TechMonitor from './pages/TechMonitor'

function MainPage() {
  return (
    <>
      <HeroSection />
      <IntelligenceSection />
      <AnalyticsSection />
      <SolutionsSection />
      <ReportsSection />
      <ContactSection />
      <Footer />
    </>
  )
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    // sm 이상: AlertTicker(1.75rem) + Navbar(3.5rem), 모바일: Navbar(3.5rem)만
    <div className="pt-14 sm:pt-[calc(1.75rem+3.5rem)]">
      {children}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <SystemProvider>
      <AlertProvider>
        <BoardProvider>
        <WeaponsProvider>
          <BrowserRouter>
            <AlertTicker />
            <NotificationToast />
            <Navbar />

            <div className="min-h-screen bg-[#020b18]">
              <Routes>
                {/* Main */}
                <Route path="/" element={<MainPage />} />

                {/* Platform */}
                <Route path="/command" element={<PageLayout><CommandCenter /></PageLayout>} />
                <Route path="/control" element={<PageLayout><ControlPanel /></PageLayout>} />
                <Route path="/sol/01" element={<PageLayout><Sol01 /></PageLayout>} />
                <Route path="/sol/02" element={<PageLayout><Sol02 /></PageLayout>} />
                <Route path="/sol/03" element={<PageLayout><Sol03 /></PageLayout>} />
                <Route path="/sol/04" element={<PageLayout><Sol04 /></PageLayout>} />
                <Route path="/sol/05" element={<PageLayout><Sol05 /></PageLayout>} />
                <Route path="/sol/06" element={<PageLayout><Sol06 /></PageLayout>} />

                {/* Weapons DB */}
                <Route path="/weapons" element={<PageLayout><WeaponsDB /></PageLayout>} />

                {/* Global Monitors */}
                <Route path="/monitor/world" element={<PageLayout><WorldMonitor /></PageLayout>} />
                <Route path="/monitor/tech" element={<PageLayout><TechMonitor /></PageLayout>} />

                {/* Board */}
                <Route path="/board" element={<Navigate to="/board/notices" replace />} />
                <Route path="/board/notices" element={<PageLayout><NoticeBoard /></PageLayout>} />
                <Route path="/board/reports" element={<PageLayout><ReportBoard /></PageLayout>} />
                <Route path="/board/intel" element={<PageLayout><IntelBoard /></PageLayout>} />

                {/* Admin */}
                <Route path="/admin" element={<PageLayout><AdminDashboard /></PageLayout>} />
                <Route path="/admin/notices" element={<PageLayout><NoticeBoard /></PageLayout>} />
                <Route path="/admin/reports" element={<PageLayout><ReportBoard /></PageLayout>} />
                <Route path="/admin/intel" element={<PageLayout><IntelBoard /></PageLayout>} />
                <Route path="/admin/users" element={<PageLayout><AdminUsers /></PageLayout>} />
                <Route path="/admin/weapons" element={<PageLayout><WeaponsAdmin /></PageLayout>} />
              </Routes>
            </div>
          </BrowserRouter>
        </WeaponsProvider>
        </BoardProvider>
      </AlertProvider>
    </SystemProvider>
  )
}
