import axios from 'axios'
import { Dashboard } from 'components/common/dashboard'
import { GroupList } from 'components/common/grouplist'
import { groupListShape, userShape } from 'data/type'
import 'pages/group-list/index.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



export const Groups = () => {
  const [user, setUser] = useState<userShape>({first_name: 'Wesley', last_name: 'Shih', email: 'shih.wesley@gmail.com'})
  const [grouplist, setGroupList] = useState<groupListShape>({
    '': []})

  const { groupId } = useParams()

  useEffect(() => {
    const groupListUrl = `/api/group-detail/${groupId}`
    const userDetailsUrl = `/api/user-details/`
    const loadData = async() => {
      const groupListResponse = await axios.get(groupListUrl)
      const userDetailsResponse = await axios.get(userDetailsUrl)
      setUser(userDetailsResponse.data)
      setGroupList(groupListResponse.data)
    }
    loadData()
  }, [groupId])

  return (

    <div className="group-list-page">
      <Dashboard user={user} />
      <div className="list-view" >
        <GroupList groups={grouplist} />
      </div>
    </div>
  )
}