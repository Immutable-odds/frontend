const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://demo-odds-api.fusionxperience.io/api';
const Fetcher = (url: string) => fetch(`${API_URL}/${url}`).then(res => res.json());

export { Fetcher };
