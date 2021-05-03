 const card = document.querySelector('.card');
 const button = document.querySelector('.button');

 window.addEventListener('load' , () => {
     const arr = JSON.parse(localStorage.getItem('singleCharacter'));
     const {names , image , biog} = arr[0];
     card.innerHTML = `
        <div class="row no-gutters">
            <div style="border: 1px solid wheat;" class="imgBlock col-md-6 col-lg-4">
                <img style="height: 100%;" src="${image}" class="card-img" alt="...">
            </div>
            <div style="background-color: none;" class="col-md-6 col-lg-8">
                <div class="card-body" style="background-color: none;">
                    <h3 style="color: black !important;" class="card-title text-center">${names}</h3>
                    <p style="font-size: 18px; font-weight: 400; color: wheat;" class="card-text pt-4">${biog}</p> 
                    <a class="btn" href="index.html">Назад</a>                   
                </div>
            </div>
        </div>
     `
 })
