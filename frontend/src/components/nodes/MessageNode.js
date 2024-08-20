import React, { useState } from 'react';

function MessageNode({ left, top }) {
    const [message, setMessage] = useState({ text: '', imageUrl: '' });

    return (
        <div style={{ position: 'absolute', left, top }}>
            <h3>Сообщение</h3>
            <textarea
                value={message.text}
                onChange={e => setMessage(prev => ({ ...prev, text: e.target.value }))}
                placeholder="Текст сообщения"
            />
            <input
                value={message.imageUrl}
                onChange={e => setMessage(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="URL изображения"
            />
            <button>Поделиться номером телефона</button>
        </div>
    );
}

export default MessageNode;