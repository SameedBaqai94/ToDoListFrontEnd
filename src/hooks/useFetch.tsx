import { useCallback, useState } from "react";

interface ApiInterface<T> {
    data: T | null;
    error: Error | null;
}

interface FetchInterface {
    method: "POST" | "GET" | "DELETE";
    body?: object | undefined;
    url?: string;
}

export default function useFetch<T>(initialUrl: string) {
    const [state, setState] = useState<ApiInterface<T>>({
        data: null,
        error: null,
    });

    const execute = useCallback(async (config: FetchInterface) => {
        const { method, body, url = initialUrl } = config;
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body ? JSON.stringify(body) : undefined
            })

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }
            const responseData = await response.json();

            setState(prevState => ({ ...prevState, data: responseData }));
        } catch (e) {
            setState(prevState => ({ ...prevState, error: new Error(`unknown error ${e}`) }))
        }
    }, [initialUrl])

    return { state, execute };

}