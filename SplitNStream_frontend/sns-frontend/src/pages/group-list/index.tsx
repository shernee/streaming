import axios from 'axios'
import { Dashboard } from 'components/dashboard'
import { SubscriptionGroups } from 'components/subscription-groups'
import { group } from 'console'
import { groupListShape, userShape } from 'data/type'
import 'pages/group-list/index.css'
import { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

const groupList = [
  {
      "group": 1,
      "max_members": 4,
      "current_num_members": 1
  },
  {
      "group": 2,
      "max_members": 4,
      "current_num_members": 3
  }
]

export const Groups = () => {
  const [user, setUser] = useState<userShape>({first_name: '', last_name: '', email: ''})
  const [groupList, setGroupList] = useState<groupListShape>({user_groups: [], other_groups: []})

  const { subscriptionId } = useParams()
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
        const createdGroupId = resp.data.group_id
        navigate(`/group-detail/${createdGroupId}`)
      } else {
        alert(`${resp.statusText}`)
      }
    })
  }

  return (
    <div className="group-list-page">
      <Dashboard user={user} />
      <div className="list-view" >
        <div className='group-list-header'>
          <h4>Groups in subscription</h4>
        </div>
          {
            groupList['user_groups'].length > 0
              ? (
                <div className='groupType-list-section'>
                  <h6>Your groups</h6>
                      <SubscriptionGroups groupType='user' groups={groupList['user_groups']} handleCreateGroup={handleCreateGroup}/>
                </div>
                )
              : (
                <div> 
                  You aren't a member of any group for this subscription!
                </div>
              )
          }
          {
            groupList['other_groups'].length > 0
              ? (
                <div className='groupType-list-section'>
                  <h6>Other groups</h6>
                  <SubscriptionGroups groupType='other' groups={groupList['other_groups']} handleCreateGroup={handleCreateGroup}/> 
                </div>
                )
              : (
                <div> 
                  No other groups!
                </div>
              )
          }  
          <div className="action-row">
            <Button variant="success" onClick={() => handleCreateGroup()}>
              Create Group
            </Button>
          </div>  
      </div>
    </div>
  )
}