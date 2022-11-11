import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { userShape } from  'data/type'
import 'components/common/dashboard/index.css'

interface IDashboardProps {
    user: userShape
}

export const Dashboard = (props: IDashboardProps) => {
  const { user } = props
  const navigate = useNavigate()

  return (
      <div className='sidebar'>
          <div className="home-container" onClick={() => navigate('/home')}>
            <h3>Home</h3>
          </div>
          <div className="user-info">
            <span>{user?.first_name} {user?.last_name}</span>
            <span>{user?.email}</span>
          </div>
          <div className="current-subscriptions">
            <text>Current subscriptions</text>
          </div>
          <div className="all-groups">
            <text>All groups</text>
          </div>         
      </div>
  )
}