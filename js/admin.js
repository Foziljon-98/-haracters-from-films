

window.addEventListener('load', () => {
    const dbFromLocal = JSON.parse(localStorage.getItem('database'));
    window.addEventListener('load', showCards(dbFromLocal));
})

// Показать карточки при открытии страницы



// Dom
const names = document.querySelector('.personName');
const species = document.querySelector('.species');
const gender = document.querySelector('.gender');
const faculty = document.querySelector('.faculty');
const actor = document.querySelector('.actor');
const image = document.querySelector('.linkPhoto');
const biog = document.querySelector('.content');

const submitBtn = document.querySelector('.submitBtn');

const container = document.querySelector('.row');
const containerDate = document.querySelector('.data-container');





// Функция которая обрабатывает все карточки и показывает на странице

function showCards(arr){
    const cards = arr.map(({names, species, gender, faculty, actor, image, id, isLiked}) => {
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card">
                 <img src="${image}" alt="">
                    <div class="descriptions">
                        <h4 class="card-title text-center text-light"><a>${names}</a></h4>
                        <ul>
                            <li>Species: ${species}</li>
                            <li>Gender:  ${gender}</li>
                            <li>Faculty:  ${faculty}</li>
                            <li>Actor:  ${actor}</li>
                        </ul>
                        
                        <div class="card-footer p-3 d-flex align-items-center justify-content-around">
                            <button onclick="deleteTask(${id})" class="btn btn-danger" >Delete</button>
                            
                            <button onclick="editTask(${id})" class="btn btn-info">Edit</button>
                        </div>

                    </div>
                </div>   
            </div>
        `
    }).join('');

    containerDate.innerHTML = cards;
}



//ADD new task   
submitBtn.addEventListener('click', e => {
    e.preventDefault();

    if(names.value === "" && biog.value === "") alert('Плоля  не должны быть пустимы!');
    if(names.value !== ""   && species.value !== ""  && gender.value !== ""  && faculty.value !== ""  && actor.value !== ""  && image.value !== "" && biog.value !== ""){
        const database = JSON.parse(localStorage.getItem('database'));

        localStorage.setItem('database' , JSON.stringify([...database, {
            names: names.value,
            species: species.value,
            gender: gender.value,
            faculty: faculty.value,
            actor: actor.value,
            image: image.value,
            biog: biog.value,
            completed: false
            
        }]));
        
        window.location.reload();
    }
    
})







// Change theme

const body = document.body;
const selector = document.querySelector('.theme-selector');

selector.addEventListener('change' , e => {
    const value = e.target.value;

    if(value === "light"){
        body.style.background = "#efefef"; 
        localStorage.setItem('bgColor', '#efefef');
        localStorage.setItem('themeValue' , 'light')
    }else if(value === "dark"){
        body.style.background = "black";
        localStorage.setItem('bgColor', 'black');
        localStorage.setItem('themeValue' , 'dark')
    }else if(value === "custom"){
        const  ascColor = prompt('Your custom color');
        body.style.background = ascColor;
        localStorage.setItem('bgColor', ascColor);
        localStorage.setItem('themeValue' , 'custom')
    }
})

window.addEventListener('load', () => {
    body.style.background = localStorage.getItem('bgColor');
    selector.value = localStorage.getItem('themeValue')
})



// Buttons

function deleteTask(id){
    const askDelete = confirm('Are yuo sure?');

    if(!askDelete) return;
    const database = JSON.parse(localStorage.getItem('database'));
    const newTodos = database.filter(item => item.id !== id);
    
    localStorage.setItem('database' , JSON.stringify(newTodos));
    window.location.reload();   
}





function editTask(id){
    const database = JSON.parse(localStorage.getItem('database'));
    const newTodos = database.map(item => {
        if(item.id === id){
            return{
                ...item,
                names: `${prompt('Person Name', item.names)} `,
                species: `${prompt('Species', item.species)} `,
                gender: `${prompt('Gender', item.gender)} `,
                faculty: `${prompt('Faculty', item.faculty)} `,
                actor: `${prompt('Actor', item.actor)} `,
                image: `${prompt('Link to Photo', item.image)} `,
                biog: `${prompt('New content', item.biog)}`
            }
        }else{
            return item
        }
    })
    localStorage.setItem('database' , JSON.stringify(newTodos));
    window.location.reload();
}






// check is auth

window.addEventListener('load' , () => {
    const isAuth = localStorage.getItem('isAuth');

    if(isAuth === 'true'){
        return
    }else{
        window.open('auth.html' , '_self');
    }
    
});



// Sign out

const signOutBtn = document.querySelector('.signOutBtn');

signOutBtn.addEventListener('click' , e => {
    e.preventDefault();

    localStorage.setItem('isAuth', 'false');
    window.open('index.html' , '_self');
})





// // function showSingle(id){
// //     const filterArr = todos.filter(item => item.id === id);
// //     localStorage.setItem('adminCharacter' , JSON.stringify(filterArr));
// //     window.open('index.html' , '_self');
// // }
