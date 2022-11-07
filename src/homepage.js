let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
  navbar.classList.toggle('active');
}

document.querySelector('#close-navbar').onclick = () =>{
  navbar.classList.remove('active');
}

window.onscroll = () =>{
  navbar.classList.remove('active');
};

let slides = document.querySelectorAll('.home .slide');
let index = 0;

function next(){
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

function prev(){
  slides[index].classList.remove('active');
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add('active');
};

const searchBtn = document.getElementById('search-btn');

// event listeners
searchBtn.addEventListener('click', getMakeupList);


// get meal list that matches with the ingredients
function getMakeupList(){
    //give variable to retrieve the data from api list
    let brand = document.getElementById('brand').value.trim();
    let category = document.getElementById('category').value.trim();
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${category}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data){//if brand and category input is available this function will be display
            data.forEach(makeup => {
                //each data is retrieved by make the makeup variable = data
                html += `
                <div class="swiper products-slider">
                <br><br>
                <div class="swiper-wrapper">
                <br><br>
                <div class="swiper-slide slide">
                    <div class="image">
                        <img src=${makeup.image_link} alt="Picture is unavailable">
                    </div>
                    <div class="content">
                        <p style="font-size:25px;"><strong>${makeup.name}</strong></p>
                        <div class="price" style="font-size:25px;">$${makeup.price}</div>
                        <p style="font-size:15px;">${makeup.description}</p>
                        <a href=${makeup.product_link}>Click here to view more</a>
                    </div>
                </div>
    
            </div>
                
            </div>
            
                `;
            });
        } else{//if the brand and category input is unavailable this function will be display
            html = `<h1>Sorry, we couldn't find any products!</h1>`;
        }
        //to call the id so it can display at the correct part
        document.getElementById("makeup").innerHTML = html;
    });
}