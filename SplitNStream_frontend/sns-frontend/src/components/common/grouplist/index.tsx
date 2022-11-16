import 'components/common/grouplist/index.css'
import { groupListShape } from 'data/type'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IGroups {
    groups: groupListShape
}

export const GroupList = (props: IGroups) => {
    const { groups } = props
    const navigate = useNavigate()

    const handleSelectGroup = (e: React.MouseEvent<Element, MouseEvent>, groupId: number) => {
        navigate(`/group-detail/${groupId}`)
    }

        const listToDisplay = [
    {
        label: 'group1',
        value: "group1"
    },
    {
        label: "group2",
        value: "group2"
    },
    {
        label: "group3",
        value: "group3"
    }]

    return (
    <div className='group-list' e-listview>
            {
                listToDisplay.map(list => (
                <div className="list-row" id='ui-list' >
                    <div className='detail-info-header' id='list'>
                        { list.label }
                    </div>
                    <div className='detail-info-text'>
                        { list.value }
                    </div>
                    </div>
                ))
            }
    </div>
    );
}
