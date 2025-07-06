import { useState } from "react"
import Modal from "./generalComponents/Modal"
import BareModal from "./generalComponents/BareModal"
import SimpleCard from "./generalComponents/SimpleCard"
export default function ProjectCard() {
    const [show, setShow] = useState(false)
    return (
        <div
            className={`hover:scale-3d min-w-2xs project-card task-card w-full rounded max-w-2xs shadow-lg bg-white cursor-pointer`} onClick={() => setShow(true)}>
            <div className='flex items-center p-2 task-card-title h-10'>
                <div className="flex justify-between items-center w-full">
                    <h1 title={""} className='truncate text-lg font-bold'>{"Title"}</h1>
                    <span className="text-red-600 cursor-pointer" ><i className="fa fa-trash"></i></span>
                </div>
            </div>
            <div className='task-card-body p-2'>
                <ol>
                    <li>All Boards: 5</li>
                    <li>Active: 3</li>
                    <li>Completed: 2</li>
                </ol>
            </div>
            <BareModal
                show={show}
                setShow={setShow}
                size="lg"
            >
                <div className="flex flex-wrap gap-3 overflow-y-auto h-full">
                    <SimpleCard
                        title={"abc"}
                    >
                        <div>
                            sdf
                        </div>
                    </SimpleCard>
                    <SimpleCard
                        title={"abc"}
                    >
                        <div>
                            sdf
                        </div>
                    </SimpleCard>
                    <SimpleCard
                        title={"abc"}
                    >
                        <div>
                            sdf
                        </div>
                    </SimpleCard>
                    <SimpleCard
                        title={"abc"}
                    >
                        <div>
                            sdf
                        </div>
                    </SimpleCard>
                    <SimpleCard
                        title={"abc"}
                    >
                        <div>
                            sdf
                        </div>
                    </SimpleCard>
                </div>
            </BareModal>
        </div>
    )
}