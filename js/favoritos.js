document.addEventListener('DOMContentLoaded', function () {
    const favoriteRecipesContainer = document.getElementById('favorite-recipes');
    let favorites = JSON.parse(localStorage.getItem('@favorites')) || [];

    if (favorites.length > 0) {
        favorites.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.className = 'recipe-item';

            const recipeTitle = document.createElement('h3');
            recipeTitle.textContent = recipe.title;

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.title;

            const recipeLink = document.createElement('a');
            recipeLink.href = "/receitas.html";
            recipeLink.textContent = "Ver receita";
            recipeLink.onclick = () => {
                localStorage.setItem('@recipe.finder', JSON.stringify(recipe));
            };

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.onclick = () => {
                removeFavorite(recipe.title);
            };

            recipeItem.appendChild(recipeImage);
            recipeItem.appendChild(recipeTitle);
            recipeItem.appendChild(recipeLink);
            recipeItem.appendChild(removeButton);
            favoriteRecipesContainer.appendChild(recipeItem);
        });
    } else {
        favoriteRecipesContainer.innerHTML = '<p>Você ainda não tem receitas favoritas.</p>';
    }

    function removeFavorite(title) {
        favorites = favorites.filter(recipe => recipe.title !== title);
        localStorage.setItem('@favorites', JSON.stringify(favorites));
        window.location.reload();
    }
});