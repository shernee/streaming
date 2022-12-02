import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { userShape, userGroupShape, GroupStage } from  'data/type'
import 'components/dashboard/index.css'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true

interface IDashboardProps {
    user: userShape
}

export const Dashboard = (props: IDashboardProps) => {
  const { user } = props
  const navigate = useNavigate()
  console.log(JSON.stringify(user))

  const handleSelectUserGroup = (e: React.MouseEvent<Element, MouseEvent>, groupId: number) => {
    navigate(`/group-detail/${groupId}`)
  }

  const groupsInStage = (stage: string, groups: Array<userGroupShape>) => {
    return (
      <div className="groups-in-stage">
        <h5>{ GroupStage[stage as keyof typeof GroupStage] }</h5>
        {groups.map(group => (
          <div key={group.group_id} className="group-name" onClick={(e) => handleSelectUserGroup(e, group.group_id)}> 
            {group.group_name }
          </div>
        ))}
      </div>
    )
  }

  const handleLogout = () => {
    const logoutUrl = '/api/auth/logout/'
    axios.post(logoutUrl).then((logoutResponse) => {
      if(logoutResponse.status === 202) {
        navigate('/')
      }   
    }).catch(error => {
      console.log('Not logged out')
    })
  }

  const noGroups = (!user.Formation) && (!user.Formed) && (!user.Verified)

  return (
      <div className='sidebar'>
          <div className="home-container" onClick={() => navigate('/home')}>
            <h3>Home</h3>
          </div>
          <div className="user-info">
            <span>{user?.first_name} {user?.last_name}</span>
            <span>{user?.email}</span>
          </div>
          <div className="user-groups">
            <h4 className="user-group-header">Your groups</h4>             
            {
              noGroups
              ? 
                <div className="nothing-to-show">
                  No memberships
                </div>
              : 
                <div className="stage-section">
                  {
                    !!user.Formation && (
                      groupsInStage('Formation', user.Formation)
                    )
                  }
                  {
                    !!user.Formed && (
                      groupsInStage('Formed', user.Formed)
                    )
                  }
                  {               
                    !!user.Verified && (
                      groupsInStage('Verified', user.Verified)
                    )  
                  }
                </div>                  
            }            
          </div>
          <div className="user-logout" onClick={() => handleLogout()}>
            <h4>Logout</h4>
          </div>     
      </div>
  )
}