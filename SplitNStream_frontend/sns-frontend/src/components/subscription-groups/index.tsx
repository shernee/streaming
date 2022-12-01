import { groupListDetailsShape, GroupStage } from 'data/type';
import React from 'react';
import { ListGroup, Button, Table } from 'react-bootstrap';
import { RouterProvider, useNavigate } from 'react-router-dom';
import 'components/subscription-groups/index.css';


interface IGroupList {
  groups: Array<groupListDetailsShape>;
  handleCreateGroup: Function;
}

export const SubscriptionGroups = (props: IGroupList) => {
  const { groups, handleCreateGroup } = props
  const navigate = useNavigate()

  const handleSelectGroup = (e: React.MouseEvent<Element, MouseEvent>, groupId: number) => {
    navigate(`/group-detail/${groupId}`)
  }

  return (
    <div className='group-list-section'>
        <Table>
          <thead>
            <tr>
              <th>
                Group Name
              </th>
              <th>
                Current number of members
              </th>
              <th>
                Maximum size of group
              </th>
              <th>
                Current stage of the group
              </th>
              <th>
                Are you a member?
              </th>
            </tr>
          </thead>
          <tbody>
          {
            groups.map((group) => (
              <tr key={group.group_id} className="group-row" onClick={(e) => handleSelectGroup(e, group.group_id)}>
                <td>
                  {group.group_name}
                </td>
                <td>
                  {group.current_num_members}
                </td>
                <td>
                  {group.max_members}
                </td>
                <td>
                  {GroupStage[group.stage as keyof typeof GroupStage]}
                </td>
                <td>
                  {group.user_member ? 'Yes' : 'No'}
                </td>
              </tr> 
            ))
          }
        </tbody>
      </Table>
      <div className="action-row">
        <div className='create-group-button'>
          <Button variant="success" onClick={() => handleCreateGroup()}>
            Create Group
          </Button>
        </div>
      </div> 
    </div>
  )
}