import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userShape, groupdetailsShape } from  'data/type'
import { Dashboard } from 'components/common/dashboard'
import 'pages/group-detail/index.css'
export const GroupDetail = () => {
    const [user, setUser] = useState<userShape>({first_name: '', last_name: '', email: ''})
    const [groupDetail, setGroupDetail] = useState<groupdetailsShape>({'': []})
    const navigate = useNavigate()
    const { Group_Id } = useParams()
  
    useEffect(() => {
      // const groupDetailurl = `/api/group-list/?subscription_id=${GroupId}`
      const groupDetailUrl = `api/group-detail//?group_id=${Group_Id}`
      const userDetailsUrl = `/api/user-details/`
      const loadData = async() => {
        const groupDetailResponse = await axios.get(groupDetailUrl)
        const userDetailsResponse = await axios.get(userDetailsUrl)
        setUser(userDetailsResponse.data)
        setGroupDetail(groupDetailResponse.data)
      }
      loadData()
    }, [])
  
    return (
      <div className="group-detail-page">
        <Dashboard user={user} />
        <div className="detail-view">
          <p>Group details</p>
          {/* <groupDetail/> */}
        </div>
      </div>
    )
  }