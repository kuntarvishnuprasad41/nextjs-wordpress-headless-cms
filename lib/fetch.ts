const baseUrl = process.env.WORDPRESS_URL
export const fetchDataFn = async (url: string) => {
    const response = await fetch(`${baseUrl}/${url}`, {
        cache: "no-cache"
    })
    return await response.json()
}