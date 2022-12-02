import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap';
import { userShape, groupDetailShape } from 'data/type'
import { Dashboard } from 'components/dashboard'
import { GroupInformation } from 'components/group-information';
import 'pages/group-detail/index.css'
import { Payment } from 'pages/payment'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true


export const GroupDetail = () => {
    const [user, setUser] = useState<userShape>({first_name: '', last_name: '', email: ''})
    const [groupDetail, setGroupDetail] = useState<groupDetailShape>({
      group_id: -1,
      group_name: '',
      subscription_name: '',
      service_name: '',
      subscription_price: 0,
      max_members_allowed: -1,
      current_members: [],
      group_stage: '',
      price_per_member: 0,
      is_member: false,
      user_id: -1,
      user_paid: false,
      subscription_start_date: '',
      subscription_end_date: '',
      subscription_email: '',
      subscription_password: ''
    })
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const navigate = useNavigate()
    const { groupId } = useParams()
  
    useEffect(() => {
      const groupDetailUrl = `/api/group-details/?group_id=${groupId}`
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
        setShowDeleteModal(true)
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

    const handleShowPaymentModal = () => {
      setShowPaymentModal(true)
    }

    const handleMakePayment = () => {
      const paymentUrl = `/api/payment/`
      const paymentPostData = {
        group_id: groupId,
        payment_amount: groupDetail.price_per_member,
      }
      axios.post(paymentUrl, paymentPostData).then((resp) => {
        if(resp.status === 201) {
          console.log(resp)
          const createPaymentId= resp.data.paymentId
          setShowPaymentModal(false)
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
            handleShowPaymentModal={handleShowPaymentModal}
          /> 
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
              <Modal.Header>
                <Modal.Title> Your group will be deleted</Modal.Title>
              </Modal.Header>             
              <Modal.Body>
                <p>You are the only member of the group. Your group will be deleted once you leave!</p>
                <div className='modal-buttons'>
                <Button variant="danger" onClick={() => setShowDeleteModal(false)}>Don't leave</Button>
                <Button variant="primary" onClick={() => callLeaveGroupApi()}>Leave group</Button>
              </div>
              </Modal.Body>
          </Modal>
          <Payment 
            setShowPaymentModal={setShowPaymentModal} 
            showPaymentModal={showPaymentModal}
            handleMakePayment={handleMakePayment}
            amountToPay={groupDetail.price_per_member}
          />      
        </div>
      </div>
    )
  }