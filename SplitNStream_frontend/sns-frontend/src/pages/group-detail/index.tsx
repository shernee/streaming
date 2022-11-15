import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {Button} from 'react-bootstrap';
import { userShape, groupDetailShape } from 'data/type'
import { Dashboard } from 'components/common/dashboard'
import 'pages/group-detail/index.css'

// const groupDetail = {
//   "group_id": 1,
//   "subscription_name": "Monthly",
//   "service_name": "Hulu",
//   "subscription_price": 15.0,
//   "max_members_allowed": 4,
//   "current_members": [
//       "neetha"
//   ],
//   "group_stage": "Formation",
//   "price_per_member": 3.75,
//   "is_member": true,
//   "user_id": 1
// }

export const GroupDetail = () => {
    const [user, setUser] = useState<userShape>({first_name: '', last_name: '', email: ''})
    const [groupDetail, setGroupDetail] = useState<groupDetailShape>({
      group_id: -1,
      subscription_name: '',
      service_name: '',
      subscription_price: 0,
      max_members_allowed: -1,
      current_members: [],
      group_stage: '',
      price_per_member: 0,
      is_member: false,
      user_id: -1
    })
    const navigate = useNavigate()
    const { groupId } = useParams()
  
    useEffect(() => {
      const groupDetailUrl = `/api/group-detail/?group_id=${groupId}`
      const userDetailsUrl = `/api/user-details/`
      const loadData = async() => {
        const groupDetailResponse = await axios.get(groupDetailUrl)
        const userDetailsResponse = await axios.get(userDetailsUrl)
        setUser(userDetailsResponse.data)
        setGroupDetail(groupDetailResponse.data)
      }
      loadData()

    }, [])

    const handleLeaveGroup = () => {
      const leaveGroupUrl = `/api/leave-group/?group_id=${groupId}`
    }

    const handleJoinGroup = () => {
      const joinGroupUrl = `/api/join-group/?group_id=${groupId}`
    }

    const detailsToDisplay = [
      {
        label: 'Subscription',
        value: `${groupDetail['subscription_name']} subscription for ${groupDetail['service_name']}`
      },
      {
        label: "Price of the Subscription",
        value: `$${groupDetail['subscription_price']}`
      },
      {
        label: "Each member of the group pays",
        value: `$${groupDetail['price_per_member']}`
      }]   
  
    return (
      <div className="group-detail-page">
        <Dashboard user={user} />
        <div className="detail-view">  
          <div className="group-details-info">  
            {              
                detailsToDisplay.map(detail => (
                  <div className="detail-row">
                      <div className='detail-info-header'>
                        { detail.label }
                      </div>
                      <div className='detail-info-text'>
                        { detail.value }
                      </div>
                    </div>
                ))
            }          
          </div>
          <div className="group-member-info">
            {
              groupDetail.current_members.map(member => (
                <div className="member-tray">
                  <h6>Members</h6>
                  <div className='detail-info-header'>
                    { member }
                  </div>
                </div>  
              ))
            } 
          </div>
          <div className="action-row">
            {
              !groupDetail.is_member ? (
                <Button variant="success" onClick={() => handleJoinGroup()}>
                  Join
                </Button>
              ) : (
                <Button variant="danger" onClick={() => handleLeaveGroup()}>
                  Leave group
                </Button>
              )
            }
          </div>       
        </div>
      </div>
    )
  }