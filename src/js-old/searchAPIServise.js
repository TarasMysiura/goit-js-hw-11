import axios from 'axios';
import Notiflix from 'notiflix';
import { refs } from './refs.js';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36597593-1cefdef63bc4854971fb7bc7c';

export default class SearchAPIService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.totalPages = 0;
    this.PER_PAGE = 40;
  }
  async getCard() {
    const axiosOptions = {
      method: 'get',
      url: URL,
      params: {
        key: API_KEY,
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: `${this.PER_PAGE}`,
      },
    };
    try {
      const response = await axios(axiosOptions);
      this.incrementPage();
      return response.data;
    } catch {
      console.error('Помилка!');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreEl.classList.add('is-hidden');
    }
  }
  // async getCard() {
  //   const { data } = await axios.get(
  //     `${URL}?apiKey=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&pageSize=6&page=${this.page}`
  //   );
  //   this.incrementPage();
  //   return data.articles;
  // }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  resetEndOfHits() {
    this.endOfHits = false;
  }

  setTotal(total) {
    return (this.totalPages = total);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
