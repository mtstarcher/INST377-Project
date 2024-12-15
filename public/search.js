const apiKey = '81996ac1202ebc9afe0dd9585deb8cbc'
// const apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const apiSearchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=`;

let movies = [];
let index;

// Creating a Lunr.js index
function createIndex(movies) {
    index = lunr(function () {
        this.ref('id');
        this.field('title');
        this.field('release_date');
        this.field('overview');

        movies.forEach(movie => {
            this.add(movie);
        });
    });
}

function searchMovies() {
    const query = document.getElementById('searchBar').value;

    fetch(apiSearchURL + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            const filterPopularMovies = data.results;
            filterPopularMovies.sort((a, b) => b.popularity - a.popularity); // Show most popular movies first

            listMovies(filterPopularMovies);
        })
        .catch(error => console.error('Error fetching search results:', error));
}

function listMovies(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = `${movie.title} (Release Date: ${movie.release_date}) - ${movie.overview} (Popularity: ${movie.popularity})`;
        // ^ sorting by popularity number
        movieList.appendChild(listItem);
    });
}


// Supabase Write/Retrieve Data from Database Section for Front End //
// Submit user data
async function submitUserData(event) {
    event.preventDefault(); // Preventing the default form submission

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const userState = document.getElementById('userState').value;
    const moviesLiked = document.getElementById('moviesLiked').value.split(',').map(movie => movie.trim());
    const userData = {
        firstName,
        lastName,
        userState,
        moviesLiked
    };

    const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();
    const responseMessage = document.getElementById('formResponseMessage');

    if (response.ok) {
        responseMessage.textContent = 'User added to database successfully!';
    } else {
        responseMessage.textContent = `Error: ${result.message}`;
    }
}

// Show past data (user preferences/recommendations)
async function showUserPreferences() {
    const response = await fetch('http://localhost:3000/users'); // Fetching users from our server

    const users = await response.json();
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.user_first_name} ${user.user_last_name} from ${user.user_state} recommends ${user.user_liked_movies}`;
        userList.appendChild(listItem);
    });
}

// Event listeners to submit user data or get data from past users:
document.getElementById('userForm').addEventListener('submit', submitUserData);
document.getElementById('showUsersPreferences').addEventListener('click', showUserPreferences);
