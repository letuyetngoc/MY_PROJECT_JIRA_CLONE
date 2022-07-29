import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Popover, Select } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { ASSIGN_USER_PROJECT_API, DELETE_PROJECT_API, GET_ALL_PROJECT_API, GET_PROJECT_DETAIL_API, REMOVE_USER_PROJECT_API } from '../../redux/saga/typesSaga/projectType';
import { MESSAGE_ALERT_APPEAR, MESSAGE_ALERT_DISAPPEAR } from "../../redux/types/MessageTypes";
import { GET_ALL_PROJECT } from '../../redux/types/ProjectType';
import AlertMessage from '../../component/message/AlertMessage';
import SmallLoading from '../../component/loading/SmallLoading';
import { history } from '../../App'
import { GET_USER_API, GET_USER_BY_PROJECTID_API } from '../../redux/saga/typesSaga/UserTypesSaga';
import { useState } from 'react';

const ProjectManagement = () => {

    const dispatch = useDispatch()

    const { arrProject, arrProjectInitial } = useSelector(state => state.ProjectReducer)
    const { infoAlertMessage } = useSelector(state => state.MessageReducer)
    const { arrUser } = useSelector(state => state.UserReducer)

    const { Option } = Select;
    const [addUser, setAddUser] = useState({ projectId: 0, userId: 0 })

    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_API })
        dispatch({ type: GET_USER_API, payload: '' })
    }, [])

    const allUser = useMemo(() => {
        return arrUser.map(item => ({ id: item.userId, name: item.name }))
    }, [arrUser])

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
                compare: (a, b) => {
                    const projectNameA = a.projectName.toLowerCase()
                    const projectNameB = b.projectName.toLowerCase()
                    if (projectNameA > projectNameB) return 1
                    if (projectNameA < projectNameB) return -1
                },
                multiple: 3,
            },
            render: (_, value) => {
                return <div onClick={() => history.push(`/board/${value.id}`)} className='projectManagement__name'>{value.projectName}</div>
            },
            width: '20%'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            sorter: {
                compare: (a, b) => {
                    const categoryA = a.category.toLowerCase()
                    const categoryB = b.category.toLowerCase()
                    if (categoryA > categoryB) return 1
                    if (categoryA < categoryB) return -1
                },
                multiple: 2,
            },
            width: '20%'
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            sorter: {
                compare: (a, b) => {
                    const creatorA = a.creator.toLowerCase()
                    const creatorB = b.creator.toLowerCase()
                    if (creatorA > creatorB) return 1
                    if (creatorA < creatorB) return -1
                },
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

    const handleChangeUser = async (values) => {
        addUser.userId = values
        await setAddUser({ ...addUser })
        await dispatch({ type: ASSIGN_USER_PROJECT_API, payload: addUser })
    }

    const data = arrProject?.map((project, index) => {
        const content = (
            <div >
                <table className='table_hover'>
                    <thead>
                        <tr>
                            <th >Id</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            project.members.map((item, index) => <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                    <div>{item.name.slice(0, 1).toUpperCase()}</div>
                                </td>
                                <td>{item.name}</td>
                                <td><button onClick={async () => {
                                    addUser.projectId = project.id
                                    addUser.userId = item.userId
                                    await setAddUser({ ...addUser })
                                    await dispatch({ type: REMOVE_USER_PROJECT_API, payload: addUser })
                                }}>X</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        )
        const contentAddUser = (
            <Select
                style={{
                    width: '100%',
                }}
                onChange={handleChangeUser}
            >
                {allUser.map((item) => <Option key={item.id}>{item.name}</Option>)}
            </Select>
        )
        return {
            key: index,
            id: project.id,
            projectName: project.projectName,
            category: project.categoryName,
            creator: project.creator.name,
            members: <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                {project.members.slice(0, 2).map((member) => <Popover content={content} title="Members" key={member.userId}>
                    <div className='projectManagement__table-member'>
                        <div className='avatar'>
                            {member.name.slice(0, 1).toUpperCase()}
                        </div>
                    </div>
                </Popover>)}

                {project.members.length > 2 && <div className='projectManagement__table-member'>
                    <div className='avatar'>...</div>
                </div>}
                <Popover content={contentAddUser} title="Add user" trigger="click">
                    <div className='projectManagement__table-member'>
                        <div className='avatar' onClick={() => {
                            addUser.projectId = project.id
                            setAddUser({ ...addUser })
                        }}>+</div>
                    </div>
                </Popover>
            </div>
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
                    <SmallLoading />
                </div>
            </div>
        </>
    )
};

export default ProjectManagement;
