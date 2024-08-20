import React, { useState } from 'react';

function BotConfigNode({ left, top }) {
    const [config, setConfig] = useState({ name: '', token: '' });

    return (
        <div style={{ position: 'absolute', left, top }}>
            <h3>Конфигурация бота</h3>
            <input
                value={config.name}
                onChange={e => setConfig(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Имя бота"
            />
            <input
                value={config.token}
                onChange={e => setConfig(prev => ({ ...prev, token: e.target.value }))}
                placeholder="API токен"
            />
        </div>
    );
}

export default BotConfigNode;