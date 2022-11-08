const userPictureListNode = document.querySelector('.pictures');
const similarCardTemplateNode = document.querySelector('#picture').content.querySelector('a');
export let similarCards = [];

export const renderPhotos = (photos) => {
  similarCards = photos;

  const pictureListFragment = document.createDocumentFragment();

  similarCards.forEach(({url, likes, comments}) => {
    const cardElement = similarCardTemplateNode.cloneNode(true);
    cardElement.querySelector('img').src = url;
    cardElement.querySelector('.picture__likes').textContent = likes;
    cardElement.querySelector('.picture__comments').textContent = comments.length;
    userPictureListNode.append(cardElement);
  });

  userPictureListNode.append(pictureListFragment);
};


