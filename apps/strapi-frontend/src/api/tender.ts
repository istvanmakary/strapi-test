
export const fetchTender = () => {
    return fetch(`${process.env.API_URL}api/palyazatok?populate=*`, {
        headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        next: { revalidate: Number(process.env.NEXT_CACHE_INTERVAL) }
    }).then((res) => res.json(), console.error)
}