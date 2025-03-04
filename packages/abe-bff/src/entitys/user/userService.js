import { externalApi } from "shared/src/http/axios/axios.js";

const getUserById = async (id) => {
    try {
        const response = await externalApi.get(`/users/${id}`);

        return response.data;
    } catch (err) {
        throw new Error("Error fetching user data");
    }
};

export default { getUserById };
