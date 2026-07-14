import api from './axios';

// Upload images to project gallery
export const uploadProjectImage = async (projectId, formData) => {
    const response = await api.post(`/projects/${projectId}/images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Update image metadata (zone, sort order)
export const updateProjectImage = async (projectId, imageId, data) => {
    const response = await api.post(
        `/projects/${projectId}/images/${imageId}?_method=PUT`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

// Replace entire image file
export const replaceProjectImage = async (projectId, imageId, formData) => {
    const response = await api.post(
        `/projects/${projectId}/images/${imageId}/replace?_method=PUT`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};

// Delete image from gallery
export const deleteProjectImage = async (projectId, imageId) => {
    const response = await api.delete(`/projects/${projectId}/images/${imageId}`);
    return response.data;
};