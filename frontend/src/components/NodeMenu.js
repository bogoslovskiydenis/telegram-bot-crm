// NodeMenu.js
import React, { useState, useEffect } from 'react';

function NodeMenu({ node, onUpdate, onClose, onDelete }) {
    const [config, setConfig] = useState(node.data);
    const [newItemType, setNewItemType] = useState('');
    const [newItemValue, setNewItemValue] = useState('');
    const [newButtonModule, setNewButtonModule] = useState('');

    useEffect(() => {
        setConfig(node.data);
    }, [node]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (index !== undefined) {
            const newContent = [...config.content];
            newContent[index] = { ...newContent[index], [name]: value };
            setConfig({ ...config, content: newContent });
        } else {
            setConfig({ ...config, [name]: value });
        }
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

    const addButton = () => {
        if (newButtonModule) {
            const newButtons = [...(config.buttons || []), { text: newButtonModule, module: newButtonModule }];
            setConfig({ ...config, buttons: newButtons });
            setNewButtonModule('');
        }
    };

    const removeButton = (index) => {
        const newButtons = config.buttons.filter((_, i) => i !== index);
        setConfig({ ...config, buttons: newButtons });
    };

    return (
        <div style={{
            position: 'fixed',
            right: '20px',
            top: '20px',
            width: '300px',
            backgroundColor: '#f0f0f0',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
            maxHeight: '80vh',
            overflowY: 'auto'
        }}>
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
                                <select value={item.type} onChange={(e) => handleChange(e, index)} name="type">
                                    <option value="video">Video</option>
                                    <option value="text">Text</option>
                                    <option value="button">Button</option>
                                </select>
                                <input
                                    value={item.value}
                                    onChange={(e) => handleChange(e, index)}
                                    name="value"
                                    placeholder={item.type === 'video' ? 'Video URL' : item.type === 'text' ? 'Text content' : 'Button text'}
                                />
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

                        <h4>Buttons for Module Navigation:</h4>
                        {config.buttons && config.buttons.map((button, index) => (
                            <div key={index}>
                                <input
                                    value={button.text}
                                    onChange={(e) => {
                                        const newButtons = [...config.buttons];
                                        newButtons[index] = { ...newButtons[index], text: e.target.value, module: e.target.value };
                                        setConfig({ ...config, buttons: newButtons });
                                    }}
                                    placeholder="Button Text / Module Name"
                                />
                                <button type="button" onClick={() => removeButton(index)}>Remove</button>
                            </div>
                        ))}
                        <input
                            value={newButtonModule}
                            onChange={(e) => setNewButtonModule(e.target.value)}
                            placeholder="New Button Text / Module Name"
                        />
                        <button type="button" onClick={addButton}>Add Navigation Button</button>
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