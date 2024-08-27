// ButtonNode.js
import React from 'react';
import { Handle } from 'react-flow-renderer';

function ButtonNode({ data }) {
    return (
        <div style={{ padding: '10px', border: '1px solid #000', backgroundColor: '#fff' }}>
            {data.type === 'botConfig' && (
                <div>
                    <h4>Bot Config</h4>
                    <p>API Key: {data.apiKey ? '****' : 'Not set'}</p>
                </div>
            )}
            {data.type === 'contentNode' && (
                <div>
                    <h4>Content Section</h4>
                    {data.content && data.content.map((item, index) => (
                        <p key={index}>{item.type}: {item.value}</p>
                    ))}
                </div>
            )}
            <Handle type="source" position="right" />
            <Handle type="target" position="left" />
        </div>
    );
}

export default ButtonNode;