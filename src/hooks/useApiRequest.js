import {useCallback, useState} from "react";

export default function useApiRequest(apiFunction) {
    const [error, setError] = useState();

    const execute = useCallback(async (param, {onSuccess, onError}) => {
        try {
            setError(null)
            const response = await apiFunction(param)
            if (onSuccess) {
                onSuccess(response)
            }
        } catch ( err ) {
            setError(err)
            if (onError) {
                onError(err)
            }
        }
    }, [apiFunction])
    return { error, execute }
}