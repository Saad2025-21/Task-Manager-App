import React from 'react'
import Sidebar from '../../components/layouts/sidebar'
import Taskdetail from '../../components/layouts/taskdetail'

export default function Taskdetailpg() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 p-8 space-y-10">
        <Taskdetail/>

      </div>
    </div>
  )
}

