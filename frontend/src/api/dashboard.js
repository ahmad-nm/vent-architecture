import api from "./axios"

export const getDashboardStats = async () => {

    const response = await api.get(
        "/admin/dashboard/stats"
    )

    return response.data
}