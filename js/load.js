const loadPhero = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
    const data = await res.json();
    const pheroes = data.data;
    // console.log(pheroes)
    displayPheroes(pheroes);
}
loadPhero();
const displayPheroes = pheroes =>{
    const pheroContainer = document.getElementById('phero-container');
    pheroContainer.textContent = ' ';
    pheroes.forEach(phero =>{
        // console.log(phero);
        const pheroCard = document.createElement('div');
        pheroCard.classList = 'card w-80 p-4 shadow-xl my-5';
        pheroCard.innerHTML = `
            <figure><img src="${phero.thumbnail}" alt="" /></figure>
            <div class="pt-5">
                <div class="flex gap-2">
                    <img class="rounded-full h-8 w-8" src="${phero.authors[0].profile_picture}">
                    <h2 id="verified_logo" class="card-title">${phero.title}</h2>
                    <i class="fa-solid fa-star text-blue-400 pt-2"></i>
                </div>
                <p class="pl-10">${phero.authors[0].profile_name}</p>
                <p class="pl-10">${phero.others.views} views</p>
            </div>`;
            pheroContainer.appendChild(pheroCard);
        
    })
}

const loadCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const categories = data.data;
    // console.log(categories)
    displayCategories(categories);
}
loadCategory();

const displayCategories = categories => {
    
    for(let i=0; i<categories.length; i++){
        let iid = categories[i].category_id;
        const menuContainer = document.getElementById('menu-bar');
        const menuItem = document.createElement('div');
        menuItem.innerHTML = `
            <button class="btn btn-secondary w-36">${categories[i].category}</button>
            `;
        menuContainer.appendChild(menuItem);
    }
}