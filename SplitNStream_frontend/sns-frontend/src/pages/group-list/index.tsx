import axios from 'axios'
import { Dashboard } from 'components/common/dashboard'
import { SubscriptionGroups } from 'components/common/subscription-groups'
import { groupListDetailsShape, userShape } from 'data/type'
import 'pages/group-list/index.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
  // const [groupList, setGroupList] = useState<Array<groupListDetailsShape>>([])

  const { groupId } = useParams()

  useEffect(() => {
    // const groupListUrl = `/api/group-detail/${groupId}`
    const userDetailsUrl = `/api/user-details/`
    const loadData = async() => {
      // const groupListResponse = await axios.get(groupListUrl)
      const userDetailsResponse = await axios.get(userDetailsUrl)
      setUser(userDetailsResponse.data)
      // setGroupList(groupListResponse.data)
    }
    loadData()
  }, [groupId])

  return (

    <div className="group-list-page">
      <Dashboard user={user} />
      <div className="list-view" >
        <div className='group-list-header'>
          <h4>Groups in subscription</h4>
        </div>
        <SubscriptionGroups groups={groupList} />
      </div>
    </div>
  )
}