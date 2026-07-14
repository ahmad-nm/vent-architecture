export const imageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `http://127.0.0.1:8000/storage/${imagePath}`;
}