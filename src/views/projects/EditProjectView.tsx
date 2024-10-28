import { getProjectById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

const EditProjectView = () => {
    const param = useParams()
    const projectId = param.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false

    })

    if(isLoading) return "Cargando . . ."
    if(isError) return <Navigate to='/404'/>

    if(data) return <EditProjectForm data={data} projectId={projectId}/>
}
 
export default EditProjectView;