
import axios from 'axios';

const ACCESS_KEY = 'rvnGJR8mrgB7y7lLSn5nSxcBNXBsXc0xGfjwerXkM5I';
const UNSPLASH_API_URL = 'https://api.unsplash.com/photos/random';

const fetchPhotos = async (): Promise<string[]> => {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      params: {
        count: 9, 
        client_id: ACCESS_KEY,
        mode: 'cors' ,
      },
    });

    return response.data.map((photo: any) => photo.urls.regular);
  } catch (error) {
    console.error('Error fetching photos from Unsplash:', error);
    return [];
  }
};

export default fetchPhotos;
