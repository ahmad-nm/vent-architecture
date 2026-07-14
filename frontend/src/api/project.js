import api from './axios';

export const getProjects = async () => {
    try {
        const response = await api.get('/projects');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

export const getProjectById = async (id) => {
    try {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching project with id ${id}:`, error);
        throw error;
    }
}