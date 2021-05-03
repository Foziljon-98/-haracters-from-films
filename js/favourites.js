const container = document.querySelector('.data-container');

window.addEventListener('load', () => {
    const dbFromLocal = JSON.parse(localStorage.getItem('database'));

    if(dbFromLocal){
        const showLiked = localStorage.getItem('showLiked');
        let filteredArr;
        if(showLiked === 'true'){
            filteredArr = dbFromLocal.filter(item => item.isLiked);
        }else{
            filteredArr = dbFromLocal.filter(item => item.isLiked === false);
        }
        showCards(filteredArr);
    }else{
        container.innerHTML = `<h1 class="text-center">Данные пустые!</h1>`
    }
})


function showCards(arr){
    const cards = arr.map(({names, species, gender, faculty, actor, image, id, isLiked}) => {
        if(isLiked === null){
            return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card">
                 <img src="${image}" alt="">
                    <div class="descriptions">
                        <h4 class="card-title text-center text-light">${names}</h4>
                        <ul>
                            <li>Species: ${species}</li>
                            <li>Gender:  ${gender}</li>
                            <li>Faculty:  ${faculty}</li>
                            <li>Actor:  ${actor}</li>
                        </ul>
                        <button onclick="showSingle(${id})">
                            Подробнее
                        </button>
                        <div class="likedHeart">
                                <i onclick="handleLike(${id})" class="fas fa-heart" style="color: #ccc"></i>
                        </div>                        
                    </div>
                </div>               
            </div>
        `
        }else if(isLiked){
            return `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card">
                        <img src="${image}" alt="">
                    <div class="descriptions">
                        <h4 class="card-title text-center text-light">${names}</h4>
                        <ul>
                            <li>Species: ${species}</li>
                            <li>Gender:  ${gender}</li>
                            <li>Faculty:  ${faculty}</li>
                            <li>Actor:  ${actor}</li>
                        </ul>
                        <button onclick="showSingle(${id})">
                            Подробнее
                        </button>                
                            <div class="likedHeart">
                                <i onclick="handleLike(${id})" class="fas fa-heart" style="color: red"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }else{
            return `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card">
                        <img src="${image}" alt="">
                    <div class="descriptions">
                        <h4 class="card-title text-center text-light">${names}</h4>
                    <ul>
                        <li>Species: ${species}</li>
                        <li>Gender:  ${gender}</li>
                        <li>Faculty:  ${faculty}</li>
                        <li>Actor:  ${actor}</li>
                    </ul>
                    <button onclick="showSingle(${id})">
                        Подробнее
                    </button>
                            <div class="likedHeart">
                                <i onclick="handleLike(${id})" class="fas fa-heart" style="color: #000"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    }).join('');

    container.innerHTML = cards;
}



function showSingle(id){
    const filterArr = dbFromLocal.filter(item => item.id === id);
    localStorage.setItem('singleCharacter' , JSON.stringify(filterArr));
    window.open('single.html' , '_self');
}
