import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Table } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

import { APPEAR_MODAL } from '../../redux/types/PopupModalTypes';
import CreateUser from './CreateUser';
import { DELETE_USER_API, GET_USER_API } from '../../redux/saga/typesSaga/UserTypesSaga';
import { useSelector } from 'react-redux';
import { GET_USER_ID } from '../../redux/types/UserTypes';
import { MESSAGE_ALERT_APPEAR, MESSAGE_ALERT_DISAPPEAR } from '../../redux/types/MessageTypes';
import AlertMessage from '../../component/message/AlertMessage';
import EditUser from './EditUser';

const UserManagement = () => {
    const dispatch = useDispatch()
    const { arrUser, deleteUserId } = useSelector(state => state.UserReducer)
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
                multiple: 4,
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => {
                    const nameA = a.name.toLowerCase()
                    const nameB = b.name.toLowerCase()
                    if (nameA > nameB) return 1
                    if (nameA < nameB) return -1
                },
                multiple: 3,
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: {
                compare: (a, b) => {
                    const emailA = a.email.toLowerCase()
                    const emailB = b.email.toLowerCase()
                    if (emailA > emailB) return 1
                    if (emailA < emailB) return -1
                },
                multiple: 2,
            },
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 1,
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, value) => {
                return <div className='userManagement__action'>
                    <div onClick={() => {
                        dispatch({ type: APPEAR_MODAL, payload: <EditUser userDetail={value} /> })
                    }}><AiOutlineEdit /></div>
                    <div onClick={() => {
                        dispatch({ type: MESSAGE_ALERT_APPEAR })
                        dispatch({ type: GET_USER_ID, payload: value.id })
                    }}><AiOutlineDelete /></div>
                </div>
            }
        },
    ];

    const data = arrUser.map((user, index) => {
        return {
            key: index,
            id: user.userId,
            name: user.name,
            email: user.email,
            phone: user.phoneNumber,
        }
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch({ type: GET_USER_API, payload: '' })
    }, [])

    const handleChangeInput = (value) => {
        dispatch({ type: GET_USER_API, payload: value })
    }

    const onOk = () => {
        dispatch({ type: DELETE_USER_API, payload: deleteUserId })
        dispatch({ type: MESSAGE_ALERT_DISAPPEAR })
    }
    const onCancle = () => {
        dispatch({ type: MESSAGE_ALERT_DISAPPEAR })
    }


    return (
        <>
            <AlertMessage onOk={onOk} onCancle={onCancle}>
                <p> Are you sure to delete this user?</p>
            </AlertMessage>
            <div className='userManagement'>
                <button onClick={() => dispatch({ type: APPEAR_MODAL, payload: <CreateUser /> })}>Create user</button>
                <h2>User management</h2>
                <div className='userManagement__search'>
                    <input onChange={e => handleChangeInput(e.target.value)} placeholder='Enter user name to search' />
                    <BiSearch className='icon' />
                </div>
                <div className='userManagement__table'>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </>
    )
};

export default UserManagement;