import Notiflix from 'notiflix';
import NewsApiService from './js/new-service.js';
import LoadMoreBtn from './js/loadMoreBtn.js';
import { refs } from './js/refs.js';

import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

const listImg = document.querySelector('.gallery');

listImg.style['list-style'] = 'none';

loadMoreBtn.button.addEventListener('click', onLoadMore);
refs.formEl.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  refs.galleryEl.innerHTML = '';
  loadMoreBtn.hide();
  newsApiService.resetPage();
  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (newsApiService.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  try {
    const result = await newsApiService.fetchGallery();

    if (result.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      const markup = markupGallery(result.hits);
      updateMarkup(markup);
      if (result.hits.length < result.totalHits) {
        Notiflix.Notify.success(
          `Hooray! We found ${result.totalHits} images !!!`
        );
        loadMoreBtn.show();
      }
      if (result.hits.length >= result.totalHits) {
        Notiflix.Notify.success(
          `Hooray! We found ${result.totalHits} images !!!`
        );
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }

      loadMoreBtn.show();
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  try {
    loadMoreBtn.disable();
    const result = await newsApiService.fetchGallery();
    const markup = markupGallery(result.hits);
    if (result.hits.length === 0) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
      return;
    }
    updateMarkup(markup);
    loadMoreBtn.enable();
    if (result.hits.length < 40 || result.hits.length >= result.totalHits) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

function markupGallery(hits) {
    return hits
      .map(
        hit => `
          <li class="photo-card">
          <a class="gallery__link" href="${hit.largeImageURL}">
            <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes:</b> ${hit.likes}
              </p>
              <p class="info-item">
                <b>Views:</b> ${hit.views}
              </p>
              <p class="info-item">
                <b>Comments:</b> ${hit.comments}
              </p>
              <p class="info-item">
                <b>Downloads:</b> ${hit.downloads}
              </p>
            </div>
            </a>
          </li>
        `,
        console.log(hits)
      )
      .join('');
}

function updateMarkup(markup) {
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}
const galleryLightBox = new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionDelay: 250,
});

// function markupGallery(hits) {
//   return galleryItems
//     .map(({ webformatURL, tags, likes, views, comments }) => {
//       return (
//         `<li class="gallery__item" ;>
//             <a class="gallery__link" href="${webformatURL}">
//             <img class="gallery__image"
//                 src="${webformatURL}" 
//                 alt="${tags}" />
//             <div class="info">
//               <p class="info-item">
//                 <b>Likes:</b> ${likes}
//               </p>
//               <p class="info-item">
//                 <b>Views:</b> ${views}
//               </p>
//               <p class="info-item">
//                 <b>Comments:</b> ${comments}
//               </p>
//               <p class="info-item">
//                 <b>Downloads:</b> ${hit.downloads}
//               </p>
//             </div>    
//             </a></li>`,
//         console.log(hits)
//       );
//     })
//     .join('');
// }

// listImg.insertAdjacentHTML('beforeend', createListImg(galleryItems));

// // function createListImg() {
// //   return galleryItems
// //     .map(({ preview, original, description }) => {
// //       return ``;
// //     })
// //     .join('');
// // }

// // const galleryLightBox = new SimpleLightbox('.gallery__link', {
// //   captionsData: 'alt',
// //   captionDelay: 250,
// // });

// function updateMarkup(markup) {
//   refs.galleryEl.insertAdjacentHTML('beforeend', markup);
// }
// const galleryLightBox = new SimpleLightbox('.gallery__link', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

