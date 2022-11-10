const imageFiltersNode = document.querySelector('.img-filters');
const filterDefault = imageFiltersNode.querySelector('#filter-default');
const filterRandom = imageFiltersNode.querySelector('#filter-random');
const filterDiscussed = imageFiltersNode.querySelector('#filter-discussed');

const removeActiveFilterClass = () => {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
};

export const initDefaultFilter = (cb) => {
  imageFiltersNode.classList.remove('img-filters--inactive');
  imageFiltersNode.addEventListener('click', (evt) => {
    if(evt.target.tagName === 'BUTTON'){
      removeActiveFilterClass();
      evt.target.classList.add('img-filters__button--active');
      cb();
    }
  });
};

