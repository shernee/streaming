import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap';
import { userShape, groupDetailShape } from 'data/type'
import { Dashboard } from 'components/dashboard'
import { GroupInformation } from 'components/group-information';
import 'pages/group-detail/index.css'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true

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
    const [showModal, setShowModal] = useState(false);
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

    }, [groupId])

    const handleLeaveGroup = () => {
      if(groupDetail.current_members.length === 1){
        setShowModal(true)
      } else {
        callLeaveGroupApi()
      }
    }

    const callLeaveGroupApi = () => {
      const leaveGroupUrl = `/api/group-leave/?group_id=${groupId}`
      axios.delete(leaveGroupUrl).then(resp => {
        if(resp.status === 204) {
          navigate('/home')
        } else {
          alert(`${resp.statusText}`)
        }
      })
    }

    const handleJoinGroup = () => {
      const joinGroupUrl = `/api/group-join/`
      const joinGroupPostData = {
        group_id: groupId
      }
      axios.post(joinGroupUrl, joinGroupPostData).then((resp) => {
        if(resp.status === 201) {
          const joinedGroupId = resp.data.group_id
          window.location.reload()
        } else {
          alert(`${resp.statusText}`)
        }
      })
    }

  
  
    return (
      <div className="group-detail-page">
        <Dashboard user={user} />
        <div className="detail-view"> 
          <GroupInformation 
            group={groupDetail} 
            handleJoinGroup={handleJoinGroup} 
            handleLeaveGroup={handleLeaveGroup} 
          /> 
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title> Your group will be deleted</Modal.Title>
              </Modal.Header>             
              <Modal.Body>
                <p>You are the only member of the group. Your group will be deleted once you leave!</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={() => setShowModal(false)}>Don't leave</Button>
                <Button variant="primary" onClick={() => callLeaveGroupApi()}>Leave group</Button>
              </Modal.Footer>
            </Modal.Dialog> 
          </Modal>      
        </div>
      </div>
    )
  }