import React from 'react';
import { useDrag } from 'react-dnd';

function DraggableButton({ type, text }) {
    const [{ isDragging }, drag] = useDrag({
        type: 'SIDEBAR_ITEM',
        item: { type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                padding: '10px',
                margin: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#fff',
            }}
        >
            {text}
        </div>
    );
}

function Sidebar() {
    return (
        <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
            <DraggableButton type="Конфигурация бота" text="Конфигурация бота" />
            <DraggableButton type="Приветствие (/start)" text="Приветствие (/start)" />
            <DraggableButton type="Сообщение" text="Сообщение" />
        </div>
    );
}

export default Sidebar;