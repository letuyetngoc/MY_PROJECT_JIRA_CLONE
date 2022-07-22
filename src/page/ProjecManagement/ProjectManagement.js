import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { DELETE_PROJECT_API, GET_ALL_PROJECT_API, GET_PROJECT_DETAIL_API } from '../../redux/saga/typesSaga/projectType';
import { MESSAGE_ALERT_APPEAR, MESSAGE_ALERT_DISAPPEAR } from "../../redux/types/MessageTypes";
import { GET_ALL_PROJECT } from '../../redux/types/ProjectType';
import AlertMessage from '../../component/message/AlertMessage';

const ProjectManagement = () => {

    const dispatch = useDispatch()
    const { arrProject, arrProjectInitial } = useSelector(state => state.ProjectReducer)
    const { infoAlertMessage } = useSelector(state => state.MessageReducer)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
                multiple: 4,
            },
            width: '10%'
        },
        {
            title: 'Project name',
            dataIndex: 'projectName',
            sorter: {
                compare: (a, b) => a.projectName - b.projectName,
                multiple: 3,
            },
            width: '20%'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            sorter: {
                compare: (a, b) => a.category - b.category,
                multiple: 2,
            },
            width: '20%'
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            sorter: {
                compare: (a, b) => a.creator - b.creator,
                multiple: 1,
            },
            width: '10%'
        },
        {
            title: 'Members',
            dataIndex: 'members',
            width: '30%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, value) => {
                return <div className='projectManagement__action'>
                    <div onClick={() => {
                        dispatch({ type: GET_PROJECT_DETAIL_API, payload: value.id })
                    }}><AiOutlineEdit /></div>
                    <div onClick={() => {
                        dispatch({ type: MESSAGE_ALERT_APPEAR, payload: value.id })
                    }}><AiOutlineDelete /></div>
                </div >
            },
            width: '10%'
        },
    ];
    const data = arrProject.map((project, index) => {
        return {
            key: index,
            id: project.id,
            projectName: project.projectName,
            category: project.categoryName,
            creator: project.creator.name,
            members: project.members.map(member => {
                return <div key={member.userId} className='projectManagement__table-member'>
                    <div className='text_name' >
                        {member.name}
                    </div>
                    <div className='avatar'>
                        {member.name.slice(0, 1).toUpperCase()}
                    </div>
                </div>

            })
        }
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch({ type: GET_ALL_PROJECT_API })
    }, [])

    const handleSearchUser = (inputValue) => {
        const newArrProjectSearch = arrProjectInitial.filter(project => project.projectName.toLowerCase().includes(inputValue))
        dispatch({ type: GET_ALL_PROJECT, payload: newArrProjectSearch })
    }
    const onOk = () => {
        dispatch({ type: DELETE_PROJECT_API, payload: infoAlertMessage })
        dispatch({ type: MESSAGE_ALERT_DISAPPEAR })
    }
    const onCancle = () => {
        dispatch({ type: MESSAGE_ALERT_DISAPPEAR })
    }

    return (
        <>
            <AlertMessage onOk={onOk} onCancle={onCancle}>
                <p> Are you sure to delete this project?</p>
            </AlertMessage>
            <div className='projectManagement'>
                <h2>Project management</h2>
                <div className='projectManagement__search'>
                    <input onChange={e => handleSearchUser(e.target.value)} placeholder='Enter project name to search' />
                    <BiSearch className='icon' />
                </div>
                <div className='projectManagement__table'>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </>
    )
};

export default ProjectManagement;
