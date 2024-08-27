// NodeMenu.js
import React, { useState, useEffect } from 'react';

function NodeMenu({ node, onUpdate, onClose, onDelete }) {
    const [config, setConfig] = useState(node.data);
    const [newItemType, setNewItemType] = useState('');
    const [newItemValue, setNewItemValue] = useState('');

    useEffect(() => {
        setConfig(node.data);
    }, [node]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig({ ...config, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...node, data: config });
    };

    const handleDelete = () => {
        onDelete(node.id);
    };

    const addContentItem = () => {
        if (newItemType && newItemValue) {
            const newContent = [...(config.content || []), { type: newItemType, value: newItemValue }];
            setConfig({ ...config, content: newContent });
            setNewItemType('');
            setNewItemValue('');
        }
    };

    const removeContentItem = (index) => {
        const newContent = config.content.filter((_, i) => i !== index);
        setConfig({ ...config, content: newContent });
    };

    return (
        <div style={{ position: 'absolute', right: 0, top: 0, width: '300px', backgroundColor: '#f0f0f0', padding: '20px' }}>
            <h3>{config.type === 'botConfig' ? 'Bot Configuration' : 'Content Section'} Settings</h3>
            <form onSubmit={handleSubmit}>
                {config.type === 'botConfig' && (
                    <input
                        name="apiKey"
                        type="password"
                        value={config.apiKey || ''}
                        onChange={handleChange}
                        placeholder="Telegram Bot API Key"
                    />
                )}
                {config.type === 'contentNode' && (
                    <>
                        <h4>Current Content:</h4>
                        {config.content && config.content.map((item, index) => (
                            <div key={index}>
                                <span>{item.type}: {item.value}</span>
                                <button type="button" onClick={() => removeContentItem(index)}>Remove</button>
                            </div>
                        ))}
                        <h4>Add New Content:</h4>
                        <select value={newItemType} onChange={(e) => setNewItemType(e.target.value)}>
                            <option value="">Select type</option>
                            <option value="video">Video</option>
                            <option value="text">Text</option>
                            <option value="button">Button</option>
                        </select>
                        <input
                            value={newItemValue}
                            onChange={(e) => setNewItemValue(e.target.value)}
                            placeholder={newItemType === 'video' ? 'Video URL' : newItemType === 'text' ? 'Text content' : 'Button text'}
                        />
                        <button type="button" onClick={addContentItem}>Add Item</button>
                    </>
                )}
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Close</button>
                <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
            </form>
        </div>
    );
}

export default NodeMenu;