import { useState } from "react"
import ProjectCard from "../components/ProjectCard"
import ExpandableBtn from "../components/ExpandableBtn"
import BareModal from "../components/generalComponents/BareModal"
import ButtonS from "../components/generalComponents/ButtonS"
import useAppDispatch from "../store/useAppDispatch"
import { addProject } from "../store/projects/projectsSlice"
import { useSelector } from "react-redux"

export default function Projects() {
    const [show,setShow] = useState(false) 
    return (
        <div className="gap-1 flex items-center flex-col lg:px-40 h-full">
            <h1 className="text-3xl mb-4">Your Projects</h1>
            <div className="w-full mb-4 mt-3 absolute right-10"><ExpandableBtn onClick={() => {setShow(true)}}/></div>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
            <BareModal show={show} setShow={setShow} size="lg">
                <div className="flex flex-col gap-2">
                <label className="font-bold">Project Name</label>
                <input
                    type="text"
                    className="w-full form-field"
                    placeholder="Project Name"
                />
                </div>
                <div className="flex flex-col gap-2">
                <label className="font-bold">Project Name</label>
                <textarea
                    className="w-full form-field"
                    placeholder="Project Name"
                />
                </div>
                <div className="absolute w-100 pb-5 bottom-0 flex justify-end gap-2">
                    <ButtonS color="danger">Cancel</ButtonS>
                    <ButtonS color="primary">Save</ButtonS>
                </div>
            </BareModal>
        </div>
    )
}