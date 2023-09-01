const loadPhero = async (cat_id) => {
    console.log(cat_id);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1001`);
    const data = await res.json();
    const pheroes = data.data;
    // console.log(pheroes)
    displayPheroes(pheroes);
}
loadPhero();
const displayPheroes = pheroes =>{
    const pheroContainer = document.getElementById('phero-container');
    pheroContainer.textContent = ' ';

    if(pheroes.length == 0){
        pheroContainer.classList.remove('grid');
        const pheroCard = document.createElement('div');
            pheroCard.classList = 'p-20 text-center';
            pheroCard.innerHTML = `
                    <img class="h-96 w-96 -ml-[20px] md:ml-[50px] lg:ml-[450px]" src="Icon.png" alt="" />
                    <p class="font-bold text-3xl ">Oopss!!! Sorry, there is no content here.</p>`;
                pheroContainer.appendChild(pheroCard);
    }
    else{
        pheroes.forEach(phero =>{
            // console.log(phero);

            const pheroCard = document.createElement('div');
            pheroCard.classList = 'card w-80 p-4 shadow-xl my-5';

            if(phero.authors[0].verified == true){
                pheroCard.innerHTML = `
                <figure class="relative"><img src="${phero.thumbnail}" alt="" />
                <h3 class="absolute text-white rounded-xl bg-black bg-opacity-80 bottom-5 right-5">${phero.others.posted_date}</h3>
                </figure>
                <div class="pt-5">
                    <div id="verified_logo" class="flex gap-2">
                        <img class="rounded-full h-8 w-8" src="${phero.authors[0].profile_picture}">
                        <h2 class="card-title">${phero.title}</h2>
                        <i class="fa-solid fa-star text-blue-400 pt-2"></i>
                    </div>
                    <p class="pl-10">${phero.authors[0].profile_name}</p>
                    <p class="pl-10">${phero.others.views} views</p>
                </div>`;
                pheroContainer.appendChild(pheroCard);
            }
            else{
                pheroCard.innerHTML = `
                <figure class="relative"><img src="${phero.thumbnail}" alt="" />
                <h3 class="absolute text-white rounded-xl bg-black bg-opacity-80 bottom-5 right-5">${phero.others.posted_date}</h3>
                </figure>
                <div class="pt-5">
                    <div id="verified_logo" class="flex gap-2">
                        <img class="rounded-full h-8 w-8" src="${phero.authors[0].profile_picture}">
                        <h2 class="card-title">${phero.title}</h2>
                    </div>
                    <p class="pl-10">${phero.authors[0].profile_name}</p>
                    <p class="pl-10">${phero.others.views} views</p>
                </div>`;
                pheroContainer.appendChild(pheroCard);
            }


        })
    }
}
const loadCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const categories = data.data;
    displayCategories(categories);
}
loadCategory();

const displayCategories = categories => {
    
    for(let i=0; i<categories.length; i++){
        const menuContainer = document.getElementById('menu-bar');
        const menuItem = document.createElement('div');
        menuItem.innerHTML = `
            <button  id="menu-button" class="btn btn-secondary w-36">${categories[i].category}</button>
            `;
        menuContainer.appendChild(menuItem);
    }
}