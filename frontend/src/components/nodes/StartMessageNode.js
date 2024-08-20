import React, { useState } from 'react';
import MessageNode from "./MessageNode";

function StartMessageNode({ left, top }) {
    const [message, setMessage] = useState({ text: '', imageUrl: '' });

    return (
        <div style={{ position: 'absolute', left, top }}>
            <h3>Приветствие (/start)</h3>
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
            <button>Старт</button>
        </div>
    );
}

export default StartMessageNode;