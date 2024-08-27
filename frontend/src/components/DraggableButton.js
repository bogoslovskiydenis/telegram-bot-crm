import React from 'react';
import { useDrag } from 'react-dnd';

function DraggableButton({ type, text }) {
    const [{ isDragging }, drag] = useDrag({
        type: 'BUTTON',
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

export default DraggableButton
