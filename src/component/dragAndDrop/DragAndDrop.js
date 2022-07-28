import React, { useMemo, useState } from "react";
import { AiOutlineCheckSquare } from 'react-icons/ai';
import { RiErrorWarningFill } from 'react-icons/ri';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { GET_PROJECT_DETAIL_BOARD_API, GET_TASK_DETAIL_API, UPDATE_STATUS_API } from "../../redux/saga/typesSaga/projectType";
import { useEffect } from "react";

function DragAndDrop({ props }) {

    const dispatch = useDispatch()
    const [columns, setColumns] = useState({});

    const [status, setStatus] = useState({
        taskId: 0,
        statusId: '',
        projectId: props.match.params.projectId
    })

    const { projectDetail } = useSelector(state => state.ProjectReducer)

    useEffect(() => {
        dispatch({ type: GET_PROJECT_DETAIL_BOARD_API, payload: props.match.params.projectId })
    }, [])

    // console.log('status', status)
    // console.log('projectDetail', projectDetail)

    const onDragEnd = async (result, columns, setColumns) => {


        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
        // console.log('colunm', columns)
        // console.log('result', result)
        // console.log('setColumns', setColumns)

        await setStatus({ taskId: result.draggableId, statusId: result.destination.droppableId })
        await dispatch({ type: UPDATE_STATUS_API, payload: status })
    };
    const itemsFromBackend = useMemo(() => {

        const items = projectDetail?.lstTask?.map((item) => {
            return item.lstTaskDeTail.map(item => ({
                id: `${item.taskId}`,
                content: item.description,
                name: item.assigness,
                priority: item.priorityTask.priorityId,
                taskType: item.taskTypeDetail.id,
            }))
        })
        // console.log('tems', items)
        return items || []

    }, [projectDetail])

    const columnsFromBackend = useMemo(() => {
        const newColums = {
            1: {
                name: "BACKLOG",
                items: itemsFromBackend[0] || []
            },
            2: {
                name: "SELECTED FOR DEVELOPMENT ",
                items: itemsFromBackend[1] || []
            },
            3: {
                name: "IN PROGRESS",
                items: itemsFromBackend[2] || []
            },
            4: {
                name: "DONE",
                items: itemsFromBackend[3] || []
            }
        }
        setColumns(newColums)
        return newColums
    }, [itemsFromBackend])


    return (
        <div style={{ display: "flex", justifyContent: 'space-between', height: "100%", width: '100%' }}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: 'column',
                                margin: '0 5px',
                                alignItems: "center",
                                width: '24.5%',
                            }}
                            key={columnId}
                        >
                            <div style={{ margin: 5, width: '100%' }}>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <>
                                                <div style={{
                                                    // width: '100%',
                                                    padding: '10px 10px 17px',
                                                    fontSize: '14px',
                                                    color: 'rgb(94, 108, 132)',
                                                    fontWeight: 500,
                                                    backgroundColor: 'rgb(244, 245, 247)',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                }}>{column.name}</div>
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "#f4f5f7"
                                                            : "#f4f5f7",
                                                        padding: '5px',
                                                        // width: '100%',
                                                        minHeight: 400,
                                                        borderRadius: '3px',
                                                    }}
                                                >

                                                    {column.items.map((item, index) => {
                                                        const createTextContent = () => {
                                                            return { __html: item.content };

                                                        }
                                                        return (
                                                            <Draggable
                                                                key={index}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div className="dragAndDrop__item"
                                                                            onClick={() => {
                                                                                dispatch({ type: GET_TASK_DETAIL_API, payload: item.id })
                                                                            }}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                width: '90%',
                                                                                padding: '10px',
                                                                                borderRadius: '3px',
                                                                                userSelect: "none",
                                                                                margin: "8px auto",
                                                                                minHeight: "50px",
                                                                                boxShadow: 'rgb(9 30 66 / 25%) 0px 1px 2px 0px',
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? "white"
                                                                                    : "white",
                                                                                color: "rgb(23, 43, 77)",
                                                                                transition: 'all 0.2s ease-in',
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            <div dangerouslySetInnerHTML={createTextContent()} className='dragAndDrop__item-content'>
                                                                            </div>
                                                                            <div className="dragAndDrop__item-footer">
                                                                                <div className="dragAndDrop__item-footer-icon">
                                                                                    <div>
                                                                                        {item.taskType == 1 ? <RiErrorWarningFill style={{ color: 'red' }} /> :
                                                                                            <AiOutlineCheckSquare style={{ color: 'blue' }} />}
                                                                                    </div>
                                                                                    <div>
                                                                                        {item.priority == 1 ? <AiOutlineArrowUp style={{ color: 'red' }} />
                                                                                            : item.priority == 2 ? <AiOutlineArrowUp style={{ color: 'orange' }} />
                                                                                                : item.priority == 3 ? <AiOutlineArrowDown style={{ color: 'green' }} />
                                                                                                    : <AiOutlineArrowDown style={{ color: '#77dd77' }} />}
                                                                                    </div>
                                                                                </div>
                                                                                <div style={{ display: 'flex' }}>
                                                                                    {item.name.length >= 1 && item.name.map((itm, index) => {
                                                                                        return <div className="dragAndDrop__item-footer-user" key={index}>
                                                                                            <div>{itm.name.slice(0, 1).toUpperCase()}</div>
                                                                                        </div>
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            </>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}

export default DragAndDrop;
