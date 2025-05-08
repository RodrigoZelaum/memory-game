import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY_ID as string;

export async function fetchImages(): Promise<string[]> {
  try {
    const randomPage = Math.floor(Math.random() * 10) + 1;

    const response = await axios.get(UNSPLASH_API_URL, {
      params: {
        query: 'fruit',
        per_page: 16,
        page: randomPage,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
      },
    });

    const imageUrls = response.data.results.slice(0, 16).map((photo: any) => photo.urls.small);
    console.log('imageUrls', imageUrls);
    return imageUrls;
  } catch (error) {
    console.error('Erro ao buscar imagens do Unsplash:', error);
    throw new Error('Falha ao buscar imagens do Unsplash');
  }
}
