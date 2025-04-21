import React, { useState } from "react";
import { Credential, CredentialFormData } from "@/types/index";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import CredentialItem from "./CredentialItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCredential } from "@/api/CredentialAPI";
import { toast } from "react-toastify";

interface CredentialListProps {
    credentials: Credential[];
    projectId: string;
    canEdit: boolean;
}

const CredentialList: React.FC<CredentialListProps> = ({
    credentials,
    canEdit,
    projectId,
}) => {
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newCredential, setNewCredential] = useState<CredentialFormData>({
        key: "",
        value: "",
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createCredential,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["editProject", projectId],
            });
            toast.success(data);
            setNewCredential({ key: "", value: "" });
            setIsAddingNew(false);
        },
    });

    const handleAddCredential = () =>
        mutate({ formData: newCredential, projectId });

    return (
        <div className="mt-10">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-3xl font-bold">
                    Credenciales del Proyecto
                </h2>
                {canEdit && (
                    <button
                        onClick={() => setIsAddingNew(true)}
                        className="flex items-center gap-2 bg-purple-400 hover:bg-purple-500 px-4 py-2 text-white font-bold rounded transition-colors"
                        disabled={isAddingNew}
                    >
                        <PlusCircleIcon className="w-5 h-5" />
                        <span>Agregar Credencial</span>
                    </button>
                )}
            </div>

            {isAddingNew && (
                <div className="bg-white shadow p-5 mb-5 rounded animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Clave
                            </label>
                            <input
                                type="text"
                                value={newCredential.key}
                                onChange={(e) =>
                                    setNewCredential({
                                        ...newCredential,
                                        key: e.target.value,
                                    })
                                }
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Nombre de la credencial"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Valor
                            </label>
                            <input
                                type="text"
                                value={newCredential.value}
                                onChange={(e) =>
                                    setNewCredential({
                                        ...newCredential,
                                        value: e.target.value,
                                    })
                                }
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Valor de la credencial"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setIsAddingNew(false)}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleAddCredential}
                            className="px-4 py-2 bg-purple-400 hover:bg-purple-500 text-white rounded transition-colors"
                            disabled={
                                !newCredential.key || !newCredential.value
                            }
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            )}

            {credentials.length > 0 ? (
                <div className="bg-white shadow rounded overflow-hidden">
                    {credentials.map((credential) => (
                        <CredentialItem
                            key={credential._id}
                            credential={credential}
                            canEdit={canEdit}
                            projectId={projectId}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center py-10 bg-white shadow rounded text-gray-500">
                    No hay credenciales para este proyecto
                </p>
            )}
        </div>
    );
};

export default CredentialList;
