export const fetchLayout = () => {
    return fetch(`${process.env.API_URL}api/page?populate=navigations`, {
        headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        next: { revalidate: Number(process.env.NEXT_CACHE_INTERVAL) }
    }).then((res) => res.json(), console.error)
}