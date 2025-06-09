export default function KanbanHeader ({title, icon, color,action}: {title: string, icon?: any, color?: string, action?: any}) {

    return (
        <div className="flex gap-2 justify-between items-center mb-2 border-b-black border-b-2 w-full h-10">
            <div className="flex gap-2 items-center">
            <span className={`material-symbols-outlined ${icon}`} style={{ color: color }}></span>
            <h1>{title}</h1>
            </div>
            <div>{action ? action : ""}</div>
        </div>
    )
}