import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { userShape, groupListShape } from  'data/type'
import { Dashboard } from 'components/common/dashboard'
import 'pages/group-list/index.css'

export const GroupList = () => {
  const [user, setUser] = useState<userShape>({first_name: '', last_name: '', email: ''})
  const [groupList, setGroupList] = useState<groupListShape>({'': []})
  const navigate = useNavigate()

  useEffect(() => {
    // const groupListUrl = `/api/group-list/`
    const userDetailsUrl = `/api/user-details/`
    const loadData = async() => {
    //   const groupListResponse = await axios.get(groupListUrl)
      const userDetailsResponse = await axios.get(userDetailsUrl)
      setUser(userDetailsResponse.data)
    //   setGroupList(groupListResponse.data)
    }
    loadData()
  }, [])

  return (
    <div className="group-list-page">
      <Dashboard user={user} />
      <div className="list-view">
        Your list
      </div>
    </div>
  )
}