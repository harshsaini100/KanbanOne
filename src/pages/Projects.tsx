import { useState, useEffect } from "react"
import ProjectCard from "../components/ProjectCard"
import ExpandableBtn from "../components/ExpandableBtn"
import BareModal from "../components/generalComponents/BareModal"
import ButtonS from "../components/generalComponents/ButtonS"
import useAppDispatch from "../store/useAppDispatch"
import { addProject, getAllProjects } from "../store/projects/projectsSlice"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { toastParameters } from "../utilities/constants"

export default function Projects() {
    const dispatch = useAppDispatch();
    const {items, loading, error} = useSelector((state: any) => state.projects)
    useEffect(() => {
        dispatch(getAllProjects())
    }, [dispatch])
    console.log("items are")
    console.log(items)
    const [project, setProject] = useState<any>({name: "", description: ""})
    const [show,setShow] = useState(false)
    const addNewProject = () => {
    
        dispatch(addProject(project)).then((res) =>{
            if(res.meta.requestStatus == "fulfilled"){
                setShow(false)
                toast.success("Project added successfully",toastParameters)
                setProject({name: "", description: ""})
            }else{
                toast.error("Something went wrong",toastParameters)
                setShow(false)
            }
        } ).catch(er => {setShow(false); toast.error("Something went wrong",toastParameters)})
    } 
    return (
        <div className="gap-1 flex items-center flex-col lg:px-40 h-full">
            <h1 className="text-3xl mb-4">Your Projects</h1>
            <div className="w-full mb-4 mt-3 absolute right-10"><ExpandableBtn onClick={() => {setShow(true)}}/></div>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
                {
                    items && items.length > 0 ?
                    items.map((item: any, index: number) => <ProjectCard key={index} item={item}/>) : <span>No projects found</span>
                }
            </div>
            <BareModal show={show} setShow={setShow} size="lg">
                <div className="flex flex-col gap-2">
                <label className="font-bold">Project Name</label>
                <input
                    type="text"
                    className="w-full form-field"
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => setProject({...project, name: e.target.value})}
                />
                </div>
                <div className="flex flex-col gap-2">
                <label className="font-bold">Description</label>
                <textarea
                    className="w-full form-field"
                    placeholder="Description"
                    value={project.description}
                    onChange={(e) => setProject({...project, description: e.target.value})}
                />
                </div>
                <div className="absolute w-100 pb-5 bottom-0 flex justify-end gap-2">
                    <ButtonS color="danger" onClick={() => setShow(false)}>Cancel</ButtonS>
                    <ButtonS color="primary" onClick={addNewProject}>Save</ButtonS>
                </div>
            </BareModal>
        </div>
    )
}