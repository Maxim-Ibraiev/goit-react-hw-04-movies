import API_KEY from "../API_KEY";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

function searchTrendingToday(mediaType, timeWindow) {
  return axios(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`).then(
    ({ data }) => data.results
  );
}

function searchMovie(query, page = 1) {
  return axios(
    `${BASE_URL}/search/movie?query=${query}&page=${page}&include_adult=false&api_key=${API_KEY}`
  ).then(({ data }) => data.results);
}

function searchDetails(movieId) {
  return axios(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`).then(
    ({ data }) => data
  );
}

function searchReviews(movieId, page = 1) {
  return axios(
    `${BASE_URL}/movie/${movieId}/reviews?page=${page}&api_key=${API_KEY}`
  ).then(({ data }) => data.results);
}

function searchCast(movieId, page = 1) {
  return axios(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`).then(
    ({ data }) => data.cast
  );
}

function getImageUrl(url) {
  return `https://image.tmdb.org/t/p/w500${url}`;
}

export {
  searchTrendingToday,
  searchMovie,
  searchDetails,
  searchReviews,
  getImageUrl,
  searchCast,
};
