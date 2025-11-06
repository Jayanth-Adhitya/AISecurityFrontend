import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout/Layout'
import EmailInput from './pages/EmailInput'
import Upload from './pages/Upload'
import Dashboard from './pages/Dashboard'
import Analysis from './pages/Analysis'

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Routes>
        {/* EmailInput page doesn't need Layout (full screen) */}
        <Route path="/" element={<EmailInput />} />

        {/* Other pages with Layout */}
        <Route element={<Layout />}>
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis/:videoId" element={<Analysis />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App