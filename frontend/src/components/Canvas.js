import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableNode from './DraggableNode';

function Canvas({ nodes, onAddNode, onNodeMove, onNodeSelect, onNodeDelete }) {
    const [, drop] = useDrop({
        accept: ['SIDEBAR_ITEM', 'CANVAS_ITEM'],
        drop: (item, monitor) => {
            const canvasRect = document.getElementById('canvas').getBoundingClientRect();
            const { x, y } = monitor.getClientOffset();
            const left = Math.round((x - canvasRect.left) / 20) * 20;
            const top = Math.round((y - canvasRect.top) / 20) * 20;

            if (item.type) {
                onAddNode(item.type, left, top);
            } else {
                onNodeMove(item.id, left, top);
            }
        },
    });

    const gridStyle = {
        backgroundSize: '20px 20px',
        backgroundImage: 'linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)',
        width: '100%',
        height: '100%',
        minHeight: '1000px',
    };

    return (
        <div id="canvas" ref={drop} style={{ flex: 1, position: 'relative', overflow: 'auto', border: '1px solid #ccc' }}>
            <div style={gridStyle}>
                {nodes.map(node => (
                    <DraggableNode
                        key={node.id}
                        node={node}
                        onMove={onNodeMove}
                        onSelect={onNodeSelect}
                        onDelete={onNodeDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default Canvas;