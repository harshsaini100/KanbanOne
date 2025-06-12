import React, { useState } from 'react';
import KanbanHeader from "./KanbanCardHeader"
import KanbanTaskCard from './KanbanTask';

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


        const bgColor = type === "todo" ? "bg-rose-500" : type === "inprogress" ? "bg-yellow-500" : "bg-green-500";

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
            className={`${bgColor} rounded shadow-lg border-1 border-cyan-800 h-1/4 main_kanban_container overflow-y-auto`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <KanbanHeader title={title} icon={icon} color={color} action={action} />
            <div className='flex gap-2 flex-col'>
            {initialItems && initialItems.map((item: any) => (
                <div draggable onDragStart={(e) => handleDragStart(e, `${item._id}`)}>
                    <KanbanTaskCard 
                       key={item._id}
                       id={item._id}
                       type={type} 
                       title={item.title} 
                       description={item.description} 
                    />
                </div>
            ))}
            </div>
        </div>
    )
}