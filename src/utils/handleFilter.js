const filtered = async (res, req, data) => {
  if (data.length > 0) {
    const filters = req.query;
    const filteredMovies = data.filter(filter => {
      let isValid = true;
      for (const key in filters) {
        isValid = isValid && filter[key] == filters[key];
      }
      return isValid;
    });
  return filteredMovies;
  };
}

const filteredASC = (res, req, data) => {
  let filteredMovies;
    const filters = req.query.order;
    if (filters === 'ASC') {
    for (const key in filters) {
        const sortData = data.sort((a, b) => (a[key] > b[key]) ? -1 : 1);
        filteredMovies = sortData

      }
    }
    return filteredMovies;
}


const filteredDESC = (res, req, data) => {
  let filteredMoviesDESC;
    const filters = req.query.order;
    if (filters === 'DESC') {
    for (const key in filters) {
        const sortData = data.sort().reverse();
        filteredMoviesDESC = sortData

      }
    }
    return filteredMoviesDESC;
}




module.exports = {filtered, filteredASC, filteredDESC};
