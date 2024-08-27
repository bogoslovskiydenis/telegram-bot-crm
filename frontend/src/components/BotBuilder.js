// BotBuilder.js
import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState
} from 'react-flow-renderer';
import { useDrop } from 'react-dnd';
import Sidebar from './Sidebar';
import NodeMenu from './NodeMenu';
import ButtonNode from './ButtonNode';

const nodeTypes = {
    buttonNode: ButtonNode,
};

function BotBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState(null);

    useEffect(() => {
        // Load nodes and edges from localStorage on component mount
        const savedNodes = JSON.parse(localStorage.getItem('nodes')) || [];
        const savedEdges = JSON.parse(localStorage.getItem('edges')) || [];
        setNodes(savedNodes);
        setEdges(savedEdges);
    }, []);

    useEffect(() => {
        // Save nodes and edges to localStorage on every change
        localStorage.setItem('nodes', JSON.stringify(nodes));
        localStorage.setItem('edges', JSON.stringify(edges));
    }, [nodes, edges]);

    const onDrop = useCallback((item, monitor) => {
        const canvasBounds = monitor.getClientOffset();
        const position = {
            x: canvasBounds.x - 200,
            y: canvasBounds.y - 50,
        };

        if (nodes.length === 0 && item.type !== 'botConfig') {
            alert('First node must be Bot Configuration');
            return;
        }

        if (nodes.length > 0 && item.type === 'botConfig') {
            alert('Bot Configuration can only be added once');
            return;
        }

        const newNode = {
            id: `${Date.now()}`,
            type: 'buttonNode',
            position,
            data: { type: item.type, content: [] },
        };

        setNodes((nds) => [...nds, newNode]);
    }, [setNodes, nodes]);

    const [{ isOver }, drop] = useDrop({
        accept: 'BUTTON',
        drop: onDrop,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <div
                ref={drop}
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: isOver ? 'lightblue' : 'white',
                    position: 'relative',
                }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    fitView
                    nodeTypes={nodeTypes}
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
                {selectedNode && (
                    <NodeMenu
                        node={selectedNode}
                        onUpdate={(updatedNode) => {
                            setNodes((nds) =>
                                nds.map((node) => (node.id === updatedNode.id ? updatedNode : node))
                            );
                            setSelectedNode(null);
                        }}
                        onClose={() => setSelectedNode(null)}
                        onDelete={(id) => {
                            setNodes((nds) => nds.filter((node) => node.id !== id));
                            setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
                            setSelectedNode(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default BotBuilder;