import axios from 'axios';

export async function fetchImages(): Promise<string[]> {
  try {
    await new Promise((res) => setTimeout(res, 1000));

    const mockResponse = {
      data: ['🍎', '🍌', '🍒', '🍇', '🍓', '🥝', '🍍', '🍑'],
    };

    return mockResponse.data;
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    throw new Error('Falha ao buscar imagens');
  }
}
