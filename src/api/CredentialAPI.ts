import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Credential, CredentialFormData, Project } from "../types";

type CredentialAPI = {
    formData: CredentialFormData
    projectId: Project['_id']
    credentialId: Credential['_id']
}
export async function createCredential({formData, projectId}: Pick<CredentialAPI, 'formData' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/credentials`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteCredential({credentialId, projectId}: Pick<CredentialAPI, 'credentialId' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/credentials/${credentialId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}