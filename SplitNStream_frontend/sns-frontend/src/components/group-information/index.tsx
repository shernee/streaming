import { groupDetailShape } from 'data/type';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import 'components/group-information/index.css';


interface IGroupInformation {
  group: groupDetailShape;
  handleJoinGroup: Function;
  handleLeaveGroup: Function;
}

export const GroupInformation = (props: IGroupInformation) => {
  const { group, handleJoinGroup, handleLeaveGroup } = props
  const navigate = useNavigate()

  const handleSelectGroup = (e: React.MouseEvent<Element, MouseEvent>, groupId: number) => {
    navigate(`/group-detail/${groupId}`)
  }

  const detailsToDisplay = [
    {
      label: 'Subscription',
      value: `${group['subscription_name']} subscription for ${group['service_name']}`
    },
    {
      label: "Price of the Subscription",
      value: `$${group['subscription_price']}`
    },
    {
      label: "Each member of the group pays",
      value: `$${group['price_per_member']}`
    }]


  return (
    <div className='group-list-section'>
      <div className="group-details-info">
        {
          detailsToDisplay.map(detail => (
            <div className="detail-row">
              <div className='detail-info-header'>
                {detail.label}
              </div>
              <div className='detail-info-text'>
                {detail.value}
              </div>
            </div>
          ))
        }
      </div>
      <div className="group-member-info">
        <h6>Members</h6>
        <div className="member-tray">
          {
            group.current_members.map(member => (
              <div className='member-box'>
                {member}
              </div>
            ))
          }
        </div>
      </div>
      <div className="action-row">
        {
          !group.is_member ? (
            group.group_stage === "Formation" &&
            <Button variant="success" onClick={() => handleJoinGroup}>
              Join
            </Button>
          ) : (
            <Button variant="danger" onClick={() => handleLeaveGroup}>
              Leave group
            </Button>
          )
        }
      </div>
    </div>
  )
}