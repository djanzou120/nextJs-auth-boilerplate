import {createContext, useState, useContext, useMemo} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {useEffect} from "react";
import {Response} from "../_types/interceptor_types";

interface AuthContextInterface {
    user: any;
    login: (input: any) => Promise<void>;
    signup: (input: any) => Promise<void>;
    forgotPassword: (input: any) => Promise<void>;
    resetPassword: (input: any) => Promise<void>;
    verifyOTP: (input: any) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
    isLoading: boolean;
    error?: string;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const login = async (input) => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/auth/login", input);
            setUser(response.data);

            if (response.data.data.code === Response.SUCCESS) {
                axios.defaults.headers.common["Authorization"] =
                    response.data.data.token;
                await router.push("/dashboard");
            }

            setIsLoading(false);
            setError("");
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const signup = async (input) => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/auth/signup", input);
            setUser(response.data);

            if (response.data.data.code === Response.SUCCESS) {
                axios.defaults.headers.common["Authorization"] =
                    response.data.data.token;
                await router.push("/dashboard");
            }

            setIsLoading(false);
            setError("");
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/auth/logout");
            delete axios.defaults.headers.common["Authorization"];
            setUser(response.data);
            await router.push("/login");
            setIsLoading(false);
            setError("");
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const forgotPassword = async () => {
        try {

        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    const resetPassword = async () => {
        try {

        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    const verifyOTP = async () => {
        try {

        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    const checkSession = async () => {
        const response = await axios.get("/api/auth/user");
        setUser(response.data);
    };

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <AuthContext.Provider
            value={useMemo(() => ({
                login, signup, logout, checkSession, forgotPassword, resetPassword, verifyOTP, user, isLoading, error
            }), [user, isLoading, error])}
        >
            {children}
        </AuthContext.Provider>
    );
};
