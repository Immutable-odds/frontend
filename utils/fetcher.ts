const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
const Fetcher = (url: string) => fetch(`${API_URL}/${url}`).then(res => res.json());

export { Fetcher };
