import axios from 'axios';

export const getCopyPasta = async () => {
    try {
        const response = await axios.get("http://localhost:5050/api/copypasta/get");
        return response.data.copypasta;
    } catch (error) {
        console.error(error);
    }
}

export const createCopyPasta = async (content) => {
    try {
        const response = await axios.post("http://localhost:5050/api/copypasta/create", { content });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCopyPastaDetails = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5050/api/copypasta/get-details/${id}`);
        return response.data.copypasta;
    } catch (error) {
        console.error(error);
    }
}

export const verifyEditPerms = async (content_id, code) => {
    try {
        const response = await axios.post("http://localhost:5050/api/copypasta/verify-edit-perms", { content_id, code });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateCopyPasta = async (content_id, content, code) => {
    try {
        const response = await axios.put("http://localhost:5050/api/copypasta/update", { content_id, content, code });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteCopyPasta = async (content_id, code) => {
    try {
        const response = await axios.delete(`http://localhost:5050/api/copypasta/delete/${content_id}`, { data: { code } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}