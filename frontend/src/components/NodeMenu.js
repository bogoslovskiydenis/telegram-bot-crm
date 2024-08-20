import React, { useState, useEffect } from 'react';

function NodeMenu({ node, onUpdate, onClose, onDelete }) {
    const [config, setConfig] = useState(node.config);

    useEffect(() => {
        setConfig(node.config);
    }, [node]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig({ ...config, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...node, config });
    };

    const handleDelete = () => {
        onDelete(node.id);
    };

    return (
        <div style={{ position: 'absolute', right: 0, top: 0, width: '300px', backgroundColor: '#f0f0f0', padding: '20px' }}>
            <h3>{node.type} Конфигурация</h3>
            <form onSubmit={handleSubmit}>
                {node.type === 'Конфигурация бота' && (
                    <>
                        <input name="botName" value={config.botName || ''} onChange={handleChange} placeholder="Имя бота" />
                        <input name="botToken" value={config.botToken || ''} onChange={handleChange} placeholder="Токен бота" />
                    </>
                )}
                {node.type === 'Приветствие (/start)' && (
                    <>
                        <textarea name="startMessage" value={config.startMessage || ''} onChange={handleChange} placeholder="Текст приветствия" />
                        <input name="startImage" value={config.startImage || ''} onChange={handleChange} placeholder="URL изображения" />
                    </>
                )}
                {node.type === 'Сообщение' && (
                    <>
                        <textarea name="message" value={config.message || ''} onChange={handleChange} placeholder="Текст сообщения" />
                        <input name="messageImage" value={config.messageImage || ''} onChange={handleChange} placeholder="URL изображения" />
                    </>
                )}
                <button type="submit">Сохранить</button>
                <button type="button" onClick={onClose}>Закрыть</button>
                <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Удалить</button>
            </form>
        </div>
    );
}

export default NodeMenu;