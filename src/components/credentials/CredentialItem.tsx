import React, { useState } from "react";
import { Credential } from "@/types/index";
import {
    CheckBadgeIcon,
    PencilSquareIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import { EyeIcon } from "@heroicons/react/16/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCredential } from "@/api/CredentialAPI";
import { toast } from "react-toastify";

interface CredentialItemProps {
    credential: Credential;
    projectId: string;
    canEdit: boolean;
}

const CredentialItem: React.FC<CredentialItemProps> = ({
    credential,
    canEdit,
    projectId,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        key: credential.key,
        value: credential.value,
    });
    const [showValue, setShowValue] = useState(false);

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteCredential,
        onError(error) {
            toast.error(error.message);
        },
        onSuccess(data) {
            toast.success(data);
            queryClient.invalidateQueries({
                queryKey: ["editProject", projectId],
            });
        },
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    const handleSave = () => {
        // Here you would call your API to update the credential
        // For now, we'll just exit edit mode
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (confirm("¿Estás seguro de eliminar esta credencial?")) {
            mutate({ credentialId: credential._id, projectId });
        }
    };

    // Masked value for sensitive information
    const maskedValue = credential.value.replace(/./g, "•");

    return (
        <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            {isEditing ? (
                <div className="animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Clave
                            </label>
                            <input
                                type="text"
                                value={editData.key}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        key: e.target.value,
                                    })
                                }
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Valor
                            </label>
                            <input
                                type="text"
                                value={editData.value}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        value: e.target.value,
                                    })
                                }
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                            title="Cancelar"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSave}
                            className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded transition-colors"
                            title="Guardar"
                            disabled={!editData.key || !editData.value}
                        >
                            <CheckBadgeIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex-grow">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-1">
                                <p className="text-sm font-medium text-gray-500">
                                    Clave
                                </p>
                                <p className="font-medium">{credential.key}</p>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="text-sm font-medium text-gray-500">
                                    Valor
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">
                                        {showValue
                                            ? credential.value
                                            : maskedValue}
                                    </p>
                                    <button
                                        onClick={() => setShowValue(!showValue)}
                                        className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                                        title={
                                            showValue
                                                ? "Ocultar valor"
                                                : "Mostrar valor"
                                        }
                                    >
                                        {showValue ? (
                                            <EyeSlashIcon className="w-4 h-4" />
                                        ) : (
                                            <EyeIcon className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Actualizado: {formatDate(credential.updatedAt)}
                        </p>
                    </div>
                    {canEdit && (
                        <div className="flex mt-4 sm:mt-0 gap-2 items-start">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded transition-colors"
                                title="Editar"
                            >
                                <PencilSquareIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors"
                                title="Eliminar"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CredentialItem;
