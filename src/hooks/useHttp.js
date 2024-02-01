import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong, please try again!');
    }
    return data;
}

const useHttp = (url, config, initialData) => {
    const [data, setData] = useState(initialData)
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const clearData = useCallback(() => {
        setData(initialData );
    }, [])

    const sendRequest = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, {...config, body: data});
            setData(resData);
        } catch (error) {
            setError(error.message || 'Something went wrong, please try again!')
        }
        setIsLoading(false);
    }, [url, config])

    useEffect(() => {
        if((config && (config.method === 'GET' || !config.method)) || !config) {
           sendRequest()
        }
    }, [sendRequest, config])

   

    return {
        data,
        error,
        isLoading,
        sendRequest,
        clearData
    } 

}

export default useHttp; 