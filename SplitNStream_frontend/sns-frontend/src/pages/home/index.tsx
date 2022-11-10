import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Nav, Container, Row, Col, Button } from 'react-bootstrap'
import 'pages/home/index.css'

const DATA = [
  {
    'Service': 'Service1',
    'Subscriptions': [
      {
        'subName': 'Sub1',
        'subPrice': 'Price1'
      },
      {
        'subName': 'Sub2',
        'subPrice': 'Price2'
      }
    ]
  },
  {
    'Service': 'Service2',
    'Subscriptions': [
      {
        'subName': 'Sub1',
        'subPrice': 'Price1'
      },
      {
        'subName': 'Sub2',
        'subPrice': 'Price2'
      }
    ]
  },
]
export const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const subscriptionsUrl = `http://127.0.0.1:8000/api/subscriptions/`
    const loadData = async() => {
      const serviceResponse = await axios.get(subscriptionsUrl)
      console.log(`Service data: ${serviceResponse}`)
    }
    // loadData()
  })

  return (
    <div className="home-page">
      <div className='sidebar'>
          <div className="home-container" onClick={() => navigate('/home')}>
            <text>Home</text>
          </div>
          <div className="user-info">
            <text>Name</text>
          </div>
          <div className="current-subscriptions">
            <text>Current subscriptions</text>
          </div>
          <div className="all-groups">
            <text>All groups</text>
          </div>         
      </div>
      <div className="home-view">
        <div className="conditional-notifications">
          <text>Notification box</text>
        </div>
        <div className="services-list">
          List of services
        </div>  
      </div>
    </div>
  )
}