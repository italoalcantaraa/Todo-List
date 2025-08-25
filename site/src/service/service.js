import axios from "axios";

const BASED_URL = "http://localhost:8080/";

export const createUser = async (user) => {
    try {
        const response = await axios.post(BASED_URL + "user/register", user);
        return response.status;
    } catch (error) {
        const message = error.response?.data?.message || "Erro ao criar usuário";
        throw new Error(message);
    }
};