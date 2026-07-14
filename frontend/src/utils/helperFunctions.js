export const formatDate = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diffMs = now - eventDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return eventDate.toLocaleDateString();
};

// Format zone for storage: "Master Bedroom" -> "master_bedroom"
export const formatZoneForStorage = (zone) => {
    return zone.trim().toLowerCase().replace(/\s+/g, "_");
};

// Format zone for display: "master_bedroom" -> "Master Bedroom"
export const formatZoneForDisplay = (zone) => {
    return zone
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};