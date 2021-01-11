function fetchImages(query, page) {
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=18966198-cc77d794ba7550ec695901208&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url)
    .then(response => response.json())
    .then(images => {
      const newImages = images.hits;
      return newImages;
    })
    .catch(error => new Error(error));
}

const api = {
  fetchImages,
};

export default api;

// return fetch(url).then(response => {
//   if (response.ok) {
//     return response.json();
//   }
//   return Promise.reject(new Error(errorMessage));
// });
