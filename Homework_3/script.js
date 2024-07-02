const API_KEY = 'd9W_lCKAINXKS5skIS5rmfCrcd0INqPmaKB77BSK-ak';
  const photoElement = document.getElementById('photo');
  const photographerElement = document.getElementById('photographer');
  const likeButton = document.getElementById('likeButton');
  const likeCountElement = document.getElementById('likeCount');
  
  let likeCount = 0;
  let currentPhotoId = null;
  
  function fetchRandomPhoto() {
      fetch(`https://api.unsplash.com/photos/random?client_id=${API_KEY}`)
          .then(response => response.json())
          .then(data => {
              currentPhotoId = data.id;
              photoElement.src = data.urls.regular;
              photographerElement.textContent = `Photo by ${data.user.name}`;
              likeCount = loadLikeCount(currentPhotoId);
              likeCountElement.textContent = likeCount;
              likeButton.disabled = false; // Enable the like button
          })
          .catch(error => console.error('Error fetching photo:', error));
  }
  
  function saveLikeCount(photoId, count) {
      localStorage.setItem(`likes_${photoId}`, count);
  }
  
  function loadLikeCount(photoId) {
      return parseInt(localStorage.getItem(`likes_${photoId}`)) || 0;
  }
  
  likeButton.addEventListener('click', () => {
      if (currentPhotoId) {
          likeCount++;
          saveLikeCount(currentPhotoId, likeCount);
          likeCountElement.textContent = likeCount;
      }
  });
  
  document.addEventListener('DOMContentLoaded', fetchRandomPhoto);
  