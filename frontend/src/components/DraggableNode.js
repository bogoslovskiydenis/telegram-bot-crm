import React from 'react';
import { useDrag } from 'react-dnd';

function DraggableNode({ node, onMove, onSelect, onDelete }) {
    const [{ isDragging }, drag] = useDrag({
        type: 'CANVAS_ITEM',
        item: { id: node.id, left: node.left, top: node.top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const handleSelect = () => {
        onSelect(node);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(node.id);
    };

    return (
        <div
            ref={drag}
            style={{
                position: 'absolute',
                left: node.left,
                top: node.top,
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                padding: '10px',
                border: '1px solid #000',
                backgroundColor: '#fff',
            }}
            onClick={handleSelect}
        >
            {node.type}
            <button
                onClick={handleDelete}
                style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
                X
            </button>
        </div>
    );
}

export default DraggableNode;