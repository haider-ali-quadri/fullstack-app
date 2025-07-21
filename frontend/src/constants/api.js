const API_BASE_URL = 'http://localhost:8080/api';
const API_ENDPOINTS = {
    teams: {
        getAll: () => `${API_BASE_URL}/teams/all`,
        getById: (id) => `${API_BASE_URL}/teams/${id}`,
    }
};

export { API_BASE_URL, API_ENDPOINTS };
export default API_ENDPOINTS;