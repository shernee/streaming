import { groupListDetailsShape } from 'data/type';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import 'components/subscription-groups/index.css';


interface IGroupList {
    groups: Array<groupListDetailsShape>
}

export const SubscriptionGroups = (props: IGroupList) => {
    const { groups } = props
    const navigate = useNavigate()

    const handleSelectGroup = (e: React.MouseEvent<Element, MouseEvent>, groupId: number) => {
        navigate(`/group-detail/${groupId}`)
    }


    return (
    <div className='group-list-section'>
        <ListGroup className='list-group'>
            <ListGroup.Item
                className="d-flex justify-content-between align-items-start"
            >
                <span>
                    Group
                </span>
                <span>
                    Existing members
                </span>
                <span>
                    Maximum size
                </span>
            </ListGroup.Item>
            {
                groups.map((group, index) => (
                    
                    <ListGroup.Item
                        key={index}
                        className="d-flex justify-content-between align-items-start group-row"
                        onClick={(e) => handleSelectGroup(e, group.group)}
                    >
                        <span>
                            {group.group}
                        </span>
                        <span>
                            {group.current_num_members}
                        </span>
                        <span>
                            {group.max_members}
                        </span>
                    </ListGroup.Item>
                    
                ))
            }
        </ListGroup>
    </div>
    )
}