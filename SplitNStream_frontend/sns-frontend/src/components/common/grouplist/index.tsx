import 'components/common/grouplist/index.css';
import { groupListShape } from 'data/type';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';


interface IGroups {
    groups: groupListShape
}

export const GroupList = (props: IGroups) => {
    const { groups } = props
    const navigate = useNavigate()

    const handleSelectGroup = (e: React.MouseEvent<Element, MouseEvent>, groupId: number) => {
        navigate(`/group-detail/${groupId}`)
    }

    return (
    <div className='group-list' e-listview>
            {
                //display the list of groups
                Object.keys(groups).map((group, index) => (
                    <ListGroup key={index}>
                        {
                            groups[group].map((group) => (
                                <ListGroup.Item
                                    key={group.group}
                                    className="d-flex justify-content-between align-items-start"
                                    onClick={(e) => handleSelectGroup(e, group.group)}
                                >
                                    <span>
                                        {group.name}
                                    </span>
                                    <span>
                                        {group.current_num_members}
                                    </span>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                ))
            }
        </div>
    )
}