import axios from 'axios'
import { Dashboard } from 'components/dashboard'
import { SubscriptionGroups } from 'components/subscription-groups'
import { group } from 'console'
import { groupListShape, userShape } from 'data/type'
import 'pages/group-list/index.css'
import { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'


export const Groups = () => {
  const [user, setUser] = useState<userShape>({first_name: '', last_name: '', email: ''})
  const [groupList, setGroupList] = useState<groupListShape>({all_groups: []})
  const [createdGroupName, setCreatedGroupName] = useState("")
  const [createdGroupId, setCreatedGroupId] = useState()
  const [showCreatedModal, setShowCreatedModal] = useState(false);
  const [errors, setErrors] = useState("")

  const { subscriptionId, subscriptionName } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const groupListUrl = `/api/group-list/?subscription_id=${subscriptionId}`
    const userDetailsUrl = `/api/user-details/`
    const loadData = async() => {
      const groupListResponse = await axios.get(groupListUrl)
      const userDetailsResponse = await axios.get(userDetailsUrl)
      setUser(userDetailsResponse.data)
      setGroupList(groupListResponse.data)
    }
    loadData()
  }, [subscriptionId])

  const handleCreateGroup = () => {
    const createGroupUrl = `/api/group-create/`
    const createGroupPostData = {
      subscription_id: subscriptionId
    }
    axios.post(createGroupUrl, createGroupPostData).then((resp) => {
      if(resp.status === 201) {
        const { group_id, group_name } = resp.data
        setCreatedGroupName(group_name)
        setCreatedGroupId(group_id)
        setShowCreatedModal(true)
      }
      }).catch(error => {
        setErrors(error.response.data.message)
      })
  }

  const goToCreatedGroup = () => {
    setShowCreatedModal(false)
    navigate(`/group-detail/${createdGroupId}`)
  }

  return (
    <div className="group-list-page">
      <Dashboard user={user} />
      <div className="list-view" >
        <div className='group-list-header'>
          <h4>Groups in subscription {subscriptionName}</h4>
        </div>
          {
            groupList['all_groups'].length > 0
              ? (
                <div className='groupType-list-section'>
                      <SubscriptionGroups groups={groupList['all_groups']} handleCreateGroup={handleCreateGroup}/>
                </div>
                )
              : (
                <div className="nothing-to-show"> 
                  No groups have been created for this subscription yet!
                </div>
              )
          } 
        <Modal
          show={showCreatedModal} 
          onHide={() => setShowCreatedModal(false)} 
          backdrop='static'
        >
          <Modal.Header>
            <Modal.Title> Group created</Modal.Title>
          </Modal.Header>             
          <Modal.Body>
            <p>Group <i>{createdGroupName}</i> has been created!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button size='sm' onClick={() =>goToCreatedGroup()}>Group Details</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}