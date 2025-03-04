import axios from "axios";

const externalApi = axios.create({
    baseURL: process.env.EXTERNAL_API_URL,
});

export { externalApi };
