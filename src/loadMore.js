// import refs from './index.js';

// const formRef = document.querySelector('.search-form');
// formRef.addEventListener('submit', onLoadMore);

// export default async function onLoadMore() {
//   refs.currentPage += 1;
//   // const currentQuery = currentTarget.elements.searchQuery.value.trim();

//   try {
//     const { images, totalHits } = await refs.fetchImages(
//       refs.currentQuery,
//       refs.currentPage
//       );
//     // const { images, totalHits } = await refs.fetchImages(
//     const roo = await refs.fetchImages(
//       refs.currentQuery,
//       refs.currentPage
//     );
//     // console.log(refs.currentQuery);
//     // console.log(currentPage);
//     // console.log(currentPage);
//     console.log(roo);


//     if (images.length === 0) {
//       refs.hideLoadMoreButton();
//       refs.showEndOfResultsMessage();
//       return;
//     }
//     console.log(totalHits);
//     // if (refs.currentPage < totalHits / per_page) {
//     //   showLoadMoreButton();
//     // }

//     refs.renderImages(images);
//     refs.initializeLightbox();

//     const { images: nextImages } = await refs.fetchImages(
//       refs.currentQuery,
//       refs.currentPage + 1
//     );

//     if (nextImages.length === 0) {
//       refs.hideLoadMoreButton();
//     }

//     refs.lightbox.refs.refresh();
//   } catch (error) {
//     // console.error(error);
//   }
// }
