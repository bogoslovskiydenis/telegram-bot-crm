import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import NodeMenu from './NodeMenu';

function BotBuilder() {
    const [nodes, setNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);

    const handleAddNode = (type, left, top) => {
        const newNode = {
            id: Date.now(),
            type,
            left,
            top,
            config: {}
        };
        setNodes([...nodes, newNode]);
    };

    const handleNodeMove = (id, left, top) => {
        setNodes(nodes.map(node =>
            node.id === id ? { ...node, left, top } : node
        ));
    };

    const handleNodeSelect = (node) => {
        setSelectedNode(node);
    };

    const handleNodeUpdate = (updatedNode) => {
        setNodes(nodes.map(node =>
            node.id === updatedNode.id ? updatedNode : node
        ));
        setSelectedNode(null);
    };

    const handleNodeDelete = (id) => {
        setNodes(nodes.filter(node => node.id !== id));
        if (selectedNode && selectedNode.id === id) {
            setSelectedNode(null);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', height: '100vh' }}>
                <Sidebar />
                <Canvas
                    nodes={nodes}
                    onAddNode={handleAddNode}
                    onNodeMove={handleNodeMove}
                    onNodeSelect={handleNodeSelect}
                    onNodeDelete={handleNodeDelete}
                />
                {selectedNode && (
                    <NodeMenu
                        node={selectedNode}
                        onUpdate={handleNodeUpdate}
                        onClose={() => setSelectedNode(null)}
                        onDelete={handleNodeDelete}
                    />
                )}
            </div>
        </DndProvider>
    );
}

export default BotBuilder;