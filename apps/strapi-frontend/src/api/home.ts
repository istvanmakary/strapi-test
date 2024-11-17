
export const fetchHome = () => {
    return fetch(`${process.env.API_URL}api/fooldal?populate=*`, {
        headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        next: { revalidate: Number(process.env.NEXT_CACHE_INTERVAL) }
    }).then((res) => res.json(), console.error)
}