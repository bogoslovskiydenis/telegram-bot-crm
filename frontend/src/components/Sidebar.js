import React from "react";
import DraggableButton from "./DraggableButton";

function Sidebar() {
    return (
        <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
            <DraggableButton type="botConfig" text="Bot Configuration" />
            <DraggableButton type="contentNode" text="Add Content Section" />
        </div>
    );
}

export default Sidebar;