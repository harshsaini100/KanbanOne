import React, { useState } from 'react';
import KanbanHeader from "./KanbanCardHeader"

export default function KanbanTypeContainer(
    {
        type,
        title,
        icon,
        color,
        action,
        onDropItem,
        items,
        initialItems,
    }
    : {
        type: "todo" | "inprogress" | "complete",
        title: string, 
        icon?: string, 
        color?: string, 
        action?: any, 
        onDropItem?: any, 
        items?: any, 
        initialItems?: any 
    }) {



    const handleDragStart = (e: any, item: any) => {
        e.dataTransfer.setData('text/plain', item);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        const item = e.dataTransfer.getData('text/plain');
        if (item) onDropItem(`${item}-${type}`);
    };

    return (
        <div
            className="rounded shadow-lg border-1 border-cyan-800 h-1/4 main_kanban_container"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <KanbanHeader title={title} icon={icon} color={color} action={action} />
            {initialItems && initialItems.map((item: any) => (
                <div
                    key={item._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, `${item._id}`)}
                    style={{
                        padding: '8px',
                        margin: '6px 0',
                        backgroundColor: '#ccc',
                        cursor: 'grab',
                    }}
                >
                    {item.title}
                </div>
            ))}
            {
                items && items.map((e) => {
                    return (
                        <div
                            key={e}
                            draggable
                            onDragStart={(e) => handleDragStart(e, e)}
                            style={{
                                padding: '8px',
                                margin: '6px 0',
                                backgroundColor: '#ccc',
                                cursor: 'grab',
                            }}
                        >
                            {e}
                        </div>
                    )
                })
            }
        </div>
    )
}