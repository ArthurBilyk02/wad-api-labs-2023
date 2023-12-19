export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=5c21dc9b8734e4fbc7c2db41a5ab6b27&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };