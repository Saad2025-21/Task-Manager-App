import React from 'react'
import Dashboardlayout from '../../components/layouts/dashboardlayout'
import Sidebar from '../../components/layouts/sidebar'
import { useState} from 'react'

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <Dashboardlayout />
    </div>
  )
}

export default Dashboard