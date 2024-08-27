import React from 'react';
import { Handle } from 'react-flow-renderer';

function ButtonNode({ data, isConnectable }) {
    return (
        <div style={{ padding: '10px', border: '1px solid #000', backgroundColor: '#fff', cursor: 'pointer' }}>
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
                    {data.buttons && data.buttons.length > 0 && (
                        <div>
                            <h5>Navigation Buttons:</h5>
                            {data.buttons.map((button, index) => (
                                <p key={index}>{button.text} -> {button.module}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <Handle type="target" position="left" isConnectable={isConnectable} />
            <Handle type="source" position="right" isConnectable={isConnectable} />
        </div>
    );
}

export default ButtonNode;