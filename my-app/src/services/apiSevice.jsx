function fetchImages(query, page) {
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=18966198-cc77d794ba7550ec695901208&image_type=photo&orientation=horizontal&per_page=12`;
  const errorMessage = 'Please enter more specific query';

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(errorMessage));
  });
}

const api = {
  fetchImages,
};

export default api;
