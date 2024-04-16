import axios from 'axios';

const BASE_URL = 'http://www.localhost:5197/api/Warehouse';

export const getBook = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting book:', error);
        throw error;
    }
};

export const postBook = async (id, bookId, countAvailable) => {
    try {
        const response = await axios.post(`${BASE_URL}`, { id, bookId, countAvailable });
        return response.data;
    } catch (error) {
        console.error('Error posting book:', error);
        throw error;
    }
};

export const editBook = async (id, bookId, countAvailable) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, { bookId, countAvailable });
        return response.data;
    } catch (error) {
        console.error('Error editing book:', error);
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error);
    }
};
