const apiKey = '81996ac1202ebc9afe0dd9585deb8cbc'
const apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

function getMovies() {
  fetch(apiURL)

    .then(response => response.json())
    .then(data => {

      const movies = data.results.slice(0, 20);  // Retrieves current top 20 movies

      const movieSwiperContainer = document.getElementById('movie-slider');
      const movieTableBody = document.getElementById('movieTable').getElementsByTagName('tbody')[0];

      movies.forEach((movie, index) => {
        // Creating slides for swiper
        const movieObject = document.createElement('div');
        movieObject.classList.add('swiper-slide', 'movieObjectBox');

        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImage.alt = movie.title;

        const movieTitle = document.createElement('div');
        movieTitle.classList.add('movieTitleBox');
        movieTitle.textContent = movie.title;

        movieObject.appendChild(movieImage);
        movieObject.appendChild(movieTitle);
        movieSwiperContainer.appendChild(movieObject);

        // Creating rows to populate table with relevant Movie data
        const row = movieTableBody.insertRow();
        row.insertCell(0).textContent = index + 1; // Current Rank
        row.insertCell(1).textContent = movie.title; // Title
        row.insertCell(2).textContent = movie.release_date; // Release Date
        row.insertCell(3).textContent = movie.vote_average; // Vote Average
        row.insertCell(4).textContent = movie.vote_count; // Vote Count
      
      });

      // Initializing the swiper from JS library after making the slides
      initializeSwiper();
    })
};


function initializeSwiper() {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3, // Slides that will show at once on main view 
    spaceBetween: 20, // Space between each slide
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 3000, // (3 second delay)
      disableOnInteraction: false, // Does not disable autoplay upon using the arrows, can be changed later
    },
    breakpoints: {
      // Below indicates how many posters will show up on screen depending on viewing windows resolution
      1024: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 1,
      },
    },
  });
};


window.onload = function() {
  getMovies();
};
