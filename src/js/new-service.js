import axios from 'axios';
import Notiflix from 'notiflix';
import { refs } from './refs';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages = 0;
    this.PER_PAGE = 40;
  }
  async fetchGallery() {
    const axiosOptions = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '36597593-1cefdef63bc4854971fb7bc7c',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: `${this.PER_PAGE}`,
        unsafe_inline: 'sha256-kZIsqHPSISIo2t1pH7cXKP7WqETBpurMjGw/57SZwqg=',
      },
    };
    try {
      const response = await axios(axiosOptions);

      this.incrementPage();
      return response.data;
    } catch {
      console.log('Помилка!');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreEl.classList.add('is-hidden');
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
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
