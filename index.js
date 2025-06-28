const init = () => {
  const inputForm = document.querySelector("form");

  inputForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop the page from reloading on submit

    const input = document.querySelector("input#searchByID"); // Get input field
    const movieId = input.value; // Get the typed movie ID

    // Fetch movie data from server
    fetch(`http://localhost:3000/movies/${movieId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        return response.json();
      })
      .then((data) => {
        // Target elements for inserting movie data
        const title = document.querySelector("section#movieDetails h4");
        const summary = document.querySelector("section#movieDetails p");

        // Update the DOM
        title.innerText = data.title;
        summary.innerText = data.summary;
      })
      .catch((error) => {
        // Handle invalid ID or fetch failure
        const title = document.querySelector("section#movieDetails h4");
        const summary = document.querySelector("section#movieDetails p");

        title.innerText = "Movie Not Found";
        summary.innerText = "Please enter a valid ID.";
      });
  });
};

document.addEventListener("DOMContentLoaded", init);
