const loadPhero = async (cat_id = 1000) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${cat_id}`);
    const data = await res.json();
    const pheroes = data.data;
    // console.log(pheroes)
    displayPheroes(pheroes);
    document.getElementById("sort-view").onclick = function() {sortPheroes(pheroes);};
}
loadPhero();

function sortPheroes(pheroes){
    let arr = [];
    let sortedArray = [];
    
    for(phero of pheroes){
        arr.push(`${phero?.others.views}`.slice(0,-1));
    }
    arr = arr.sort(function (a, b) {  return b - a;  });

    if(`${pheroes[1].others.views}`.includes(arr[0]) == true){
        console.log('done done done')
    }

    for(let i=0; i<arr.length;i++){
        for(let j=0; j<arr.length;j++){
            if(`${pheroes[j].others.views}`.includes(arr[i],0) == true){
                sortedArray.push(`${pheroes[j]}`);
                // if(sortedArray.includes(`${pheroes[j].others.views}`,0) == true){
                // }
                // else{
                //     sortedArray.push(`${pheroes[j]}`);
                // }
            }
        }
    }
    console.log(sortedArray);
}

// loadPhero();
const displayPheroes = pheroes =>{
    // sortPheroes(pheroes);
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
        pheroContainer.classList = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pl-12 md:pl-7 lg:pl-7';
        pheroes?.forEach(phero =>{
            // console.log(phero);

            const pheroCard = document.createElement('div');
            pheroCard.classList = 'card w-80 p-4 shadow-xl my-5';

            if(phero?.authors[0]?.verified == true){
                pheroCard.innerHTML = `
                <figure class="relative"><img src="${phero.thumbnail}" alt="" />
                <h3 class="absolute text-white rounded-md bg-black bg-opacity-80 bottom-5 right-5">
                ${handleDate(phero.others.posted_date)}
                </h3>
                </figure>
                <div class="pt-5">
                    <div id="verified_logo" class="flex gap-2">
                        <img class="rounded-full h-8 w-8" src="${phero.authors[0].profile_picture}">
                        <h2 class="card-title">${phero.title}</h2>
                        
                    </div>
                    <div class="flex gap-2">
                    <p class="pl-10">${phero.authors[0].profile_name}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                    <g fill="#5c7cfa" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M12,2c-5.5,0 -10,4.5 -10,10c0,5.5 4.5,10 10,10c5.5,0 10,-4.5 10,-10c0,-5.5 -4.5,-10 -10,-10zM17.7,9.7l-7,7c-0.2,0.2 -0.4,0.3 -0.7,0.3c-0.3,0 -0.5,-0.1 -0.7,-0.3l-3,-3c-0.4,-0.4 -0.4,-1 0,-1.4c0.4,-0.4 1,-0.4 1.4,0l2.3,2.3l6.3,-6.3c0.4,-0.4 1,-0.4 1.4,0c0.4,0.4 0.4,1 0,1.4z"></path></g></g>
                    </svg>
                    </div>
                    <p class="pl-10">${phero.others.views} views</p>
                </div>`;
                pheroContainer.appendChild(pheroCard);
            }
            else{

                pheroCard.innerHTML = `
                <figure class="relative"><img src="${phero.thumbnail}" alt="" />
                <h3 class="absolute text-white rounded-md bg-black bg-opacity-80 bottom-5 right-5">
                ${handleDate(phero.others.posted_date)}
                </h3>
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
function handleDate(post_date){
    if(post_date != ''){
        const postDate = parseFloat(post_date);
        const hours = Math.floor(postDate / 3600);
        const minutes = Math.floor((postDate % 3600) / 60);
        const seconds = postDate % 60;
        return(hours+'h'+minutes+'m'+seconds+'s ago')
    }
    else{
        return('')
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
            <button onclick="loadPhero(${categories[i].category_id})" id="menu-button" class="btn btn-secondary w-36">${categories[i].category}</button>
            `;
        menuContainer.appendChild(menuItem);
    }
}