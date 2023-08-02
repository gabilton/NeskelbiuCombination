import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post("api/v1/auth/refresh", {
            userId: `${auth.userId}`,
            username: `${auth.user}`,
            userEmail: `${auth.email}`
        });
        // console.log(auth.userId);
        // console.log(auth.user);
        // console.log(auth.email);
        // console.log(response.data.access_token);
        setAuth((prev) => {
            // console.log(JSON.stringify(prev));
            // console.log(response.data.access_token);
            return { ...prev, accessToken: response.data.access_token };
        });
        return response.data.access_token;
    };
    return refresh;
};

export default useRefreshToken;
