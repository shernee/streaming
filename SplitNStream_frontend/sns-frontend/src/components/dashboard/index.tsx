import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { userShape, userGroupShape } from  'data/type'
import 'components/dashboard/index.css'

interface IDashboardProps {
    user: userShape
}

export const Dashboard = (props: IDashboardProps) => {
  const { user } = props
  const navigate = useNavigate()

  const handleSelectUserGroup = (e: React.MouseEvent<Element, MouseEvent>, groupId: number) => {
    navigate(`/group-detail/${groupId}`)
  }

  const groupsInStage = (stage: string, groups: Array<userGroupShape>) => {
    return (
      <div className="groups-in-stage">
        <h6>{ stage }</h6>
        {groups.map(group => (
          <div key={group.group} className="group-name" onClick={(e) => handleSelectUserGroup(e, group.group)}> 
            {group.subscription }
          </div>
        ))}
      </div>
    )
  }

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
            <h5 className="user-group-header">Your groups</h5>
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
          </div>     
      </div>
  )
}