import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { userShape, serviceShape } from  'data/type'
import { Dashboard } from 'components/common/dashboard'
import { ServiceCard } from 'components/home/service-card'
import 'pages/home/index.css'

const services = {
  "Netflix": [
      {
          "subscription_id": 1,
          "name": "Monthly",
          "price": 20.0
      },
      {
        "subscription_id": 3,
        "name": "Monthly",
        "price": 20.0
    }
  ],
  "Hulu": [
      {
          "subscription_id": 2,
          "name": "Monthly",
          "price": 15.0
      }
  ]
}

export const Home = () => {
  const [user, setUser] = useState<userShape>({first_name: '', last_name: '', email: ''})
  // const [services, setServices] = useState<serviceShape>({'': []})
  const navigate = useNavigate()

  useEffect(() => {
    // const subscriptionsUrl = `/api/subscriptions/`
    const userDetailsUrl = `/api/user-details/`
    const loadData = async() => {
      // const serviceResponse = await axios.get(subscriptionsUrl)
      const userDetailsResponse = await axios.get(userDetailsUrl)
      // console.log(`Service data: ${JSON.stringify(serviceResponse)}`)
      setUser(userDetailsResponse.data)
      // setServices(serviceResponse.data)
    }
    loadData()
  }, [])

  return (
    <div className="home-page">
      <Dashboard user={user} />
      <div className="home-view">
        <div className='services-header'>
          <h4>All Subscriptions</h4>
        </div>
        <ServiceCard services={services} />
      </div>
    </div>
  )
}