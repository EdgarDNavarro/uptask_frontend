import { addUserToProject } from "@/api/TeamApi";
import { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    user: TeamMember;
    resetData: () => void;
};

const SearchResult = ({ user, resetData }: SearchResultProps) => {
    const queryClient = useQueryClient();
    const params = useParams();
    const projectId = params.projectId!;

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError(error) {
            toast.error(error.message);
        },
        onSuccess(data) {
            toast.success(data);
            resetData();
            queryClient.invalidateQueries({
                queryKey: ["projectTeam", projectId],
            });
        },
    });

    const handleAddUserToProyect = () => {
        const data = {
            projectId,
            id: user._id,
        };
        mutate(data);
    };

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
                <div className="flex flex-col sm:flex-row sm:gap-6">
                    <p>
                        <b>Nombre:</b> {user.name}
                    </p>
                    <p>
                        <b>Email:</b> {user.email}
                    </p>
                </div>

                <button
                    className="text-purple-600 hover:bg-purple-100 px-6 py-2 font-bold cursor-pointer rounded transition-all text-sm sm:text-base"
                    onClick={handleAddUserToProyect}
                >
                    Agregar al Proyecto
                </button>
            </div>
        </>
    );
};

export default SearchResult;
