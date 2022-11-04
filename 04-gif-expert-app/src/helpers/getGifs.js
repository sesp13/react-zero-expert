import { environment } from '../../environment';
const { gifApiKey } = environment;

export const getGifs = async (category) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${gifApiKey}&q=${category}&limit=20`;
  const res = await fetch(url);
  const { data } = await res.json();

  const gifs = data.map(({ id, title, images }) => ({
    id,
    title,
    url: images.downsized_medium.url,
  }));
  
  return gifs;
};
