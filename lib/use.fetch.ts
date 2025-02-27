import { useEffect, useState } from "react"
const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL

export const useFetch = function ({ url }: { url: string }) {
    const [data, setData] = useState<[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        const getData = async () => {
            try {
                const response = await fetch(`${baseUrl}/${url}`, { signal })
                if (!response.ok) {
                    throw Error(`Fetching Error:${url}`)
                }
                const responseData = await response.json()
                if (!signal.aborted) {
                    setData(responseData);
                    setLoading(false);
                }
            } catch (error: any) {
                if (!signal.aborted) {
                    setError(error.message || "An error occurred");
                    setLoading(false);
                }
            }
        }
        getData()
        return () => {
            abortController.abort()
        }
    }, [url])
    return { data, setData, error, loading }
}