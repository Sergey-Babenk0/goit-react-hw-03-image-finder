function fetchImages(value, page) {
  return fetch(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=34683209-8b2cd5e146e244d990d25d370&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Нет результатов по запросу ${value}`));
  });
}

const api = {
  fetchImages,
};

export default api;
