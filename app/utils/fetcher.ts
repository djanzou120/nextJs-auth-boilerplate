import axios, {Method, AxiosResponse} from "axios";

interface argsFetcher {
    url: string,
    method?: Method,
    data?: any,
    headers?: any
}

interface optionsFetcher {
    withoutAuthorization?: boolean,
    serviceName: "AUTH_SERVICE"
}

function sanitizeService(serviceName: string) {
    switch (serviceName) {
        case "AUTH_SERVICE":
            return process.env.NEXT_PUBLIC_API_URL;
        default:
            throw new Error("Service name not found.");
    }
}

export default async function fetcher(args: argsFetcher, options ?: optionsFetcher) {
    try {
        let session : any = null;
        if (options?.withoutAuthorization != true)
            session = await axios.get("/api/auth/user");

        const response: AxiosResponse = await axios({
            baseURL: options?.serviceName ? sanitizeService(options.serviceName) : process.env.NEXT_PUBLIC_API_URL,
            url: args.url,
            data: args.data,
            method: args.method ?? "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                ...((session?.data?.token && options.withoutAuthorization != undefined) && {"Authorization": session.data.token})
            }
        });

        return response.data;
    } catch (e) {
        console.log(e.message)
    }
}
