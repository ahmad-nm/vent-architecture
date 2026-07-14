import api from "./axios"

export const getAdminProjects = async () => {

    const response = await api.get("/projects")

    return response.data
}

export const getAdminProjectById = async (id) => {

    const response = await api.get(`/projects/${id}`)

    return response.data
}

export const createProject = async (formData) => {

    const response = await api.post(
        "/projects",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    )

    return response.data
}

export const updateProject = async (id, formData) => {

    const response = await api.post(
        `/projects/${id}?_method=PUT`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    )

    return response.data
}

export const deleteProject = async (id) => {

    const response = await api.delete(
        `/projects/${id}`
    )

    return response.data
}