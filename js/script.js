const form = document.querySelector('#search-form');
const query = document.querySelector('#search')
const DB_KEY = '@recipe.finder'
const apiKey = '8159fc3403984988b683a6daaedcff0b'

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(`${query.value}`);

    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query.value}`)
    .then((response) => {
        const recipes = response.data.results;
        console.log(recipes)
        displayResults(recipes); 
        saveRepositoryInfo(recipes);

        recipes.forEach(recipe => {
            console.log(`ID: ${recipe.title}`);
        });
    })
    .catch(error => console.error('Erro ao buscar receitas: ',error )
    )


    function displayResults(recipe) {
        const results = document.querySelector('.results')

        query.value = ""

        results.innerHTML = ''

        recipe.forEach(repo => {
            const recipeItem = document.createElement('div');
            recipeItem.className = 'recipe-item';
            
            const recipeTitle = document.createElement('h3');
            recipeTitle.textContent = repo.title;

            const recipeImage = document.createElement('img');
            recipeImage.src = repo.image;
            recipeImage.alt = repo.title;

            const recipeLink = document.createElement('a');
            recipeLink.href = "/receitas.html"
            recipeLink.textContent = "Ver receita";
            recipeLink.onclick = () => {
                saveRepositoryInfo(repo)
            };

            recipeItem.appendChild(recipeImage);
            recipeItem.appendChild(recipeTitle);
            recipeItem.appendChild(recipeLink);
            results.appendChild(recipeItem);
        })
    }
});


function saveRepositoryInfo(repo) {
    localStorage.setItem(DB_KEY, JSON.stringify(repo));
  }