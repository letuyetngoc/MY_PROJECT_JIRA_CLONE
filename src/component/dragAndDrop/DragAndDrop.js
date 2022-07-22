import React, { useState } from "react";
import { AiOutlineCheckSquare } from 'react-icons/ai';
import { RiErrorWarningLine } from 'react-icons/ri';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import { APPEAR_MODAL } from "../../redux/types/PopupModalTypes";
import TaskDetail from "../../page/TaskDetail/TaskDetail";

const itemsFromBackend = [
    { id: uuid(), content: "BACKLOG 1 of 2", name: 'ngoc' },
    { id: uuid(), content: "SELECTED FOR DEVELOPMENT 0 of 3", name: 'ngoc' },
    { id: uuid(), content: "IN PROGRESS 1 of 2", name: 'ngoc' },
    { id: uuid(), content: "DONE 1 of 2", name: 'ngoc' },
];

const columnsFromBackend = {
    [uuid()]: {
        name: "BACKLOG",
        items: itemsFromBackend
    },
    [uuid()]: {
        name: "SELECTED FOR DEVELOPMENT ",
        items: []
    },
    [uuid()]: {
        name: "IN PROGRESS",
        items: []
    },
    [uuid()]: {
        name: "DONE",
        items: []
    }
};

const onDragEnd = (result, columns, setColumns) => {
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
};

function DragAndDrop() {
    const dispatch = useDispatch()
    const [columns, setColumns] = useState(columnsFromBackend);
    return (
        <div style={{ display: "flex", justifyContent: "space-between", height: "100%", width: '100%' }}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                width: '25%',
                            }}
                            key={columnId}
                        >
                            <div style={{ margin: 5, width: '100%' }}>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <>
                                                <div style={{
                                                    padding: '10px 10px 17px',
                                                    fontSize: '14px',
                                                    color: 'rgb(94, 108, 132)',
                                                    fontWeight: 500,
                                                    backgroundColor: 'rgb(244, 245, 247)'
                                                }}>{column.name}</div>
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "#f4f5f7"
                                                            : "#f4f5f7",
                                                        padding: '5px',
                                                        width: '100%',
                                                        minHeight: 400,
                                                        borderRadius: '3px',
                                                    }}
                                                >

                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div className="dragAndDrop__item"
                                                                            onClick={() => dispatch({ type: APPEAR_MODAL, payload: <TaskDetail /> })}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                padding: '10px',
                                                                                borderRadius: '3px',
                                                                                userSelect: "none",
                                                                                margin: "0 0 8px 0",
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
                                                                            <div className="dragAndDrop__item-content">
                                                                                {item.content}
                                                                            </div>
                                                                            <div className="dragAndDrop__item-footer">
                                                                                <div className="dragAndDrop__item-footer-icon">
                                                                                    <div><AiOutlineCheckSquare /></div>
                                                                                    <div><RiErrorWarningLine /></div>
                                                                                </div>
                                                                                <div className="dragAndDrop__item-footer-user">
                                                                                    <div>{item.name.slice(0, 1).toUpperCase()}</div>
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
