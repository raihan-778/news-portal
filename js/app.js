console.log("script is connnected");

//code for load categories
const categoryApi = `https://openapi.programming-hero.com/api/news/categories`;
const loadCategoryData = () => {
  fetch(categoryApi)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category));
};
loadCategoryData();

//code for displayCategory
const displayCategory = (data) => {
  const categoryHeader = document.getElementById("category-header");
  const newArray = [];
  data.forEach((category) => {
    console.log(category);
    const { category_name, category_id } = category;

    if (newArray.indexOf(category_name) === -1) {
      newArray.push(category_name);
      console.log(newArray);
      const li = document.createElement("li");
      li.classList.add(
        "text-green-100",
        "font-bold",
        "cursor-pointer",
        "hover:bg-teal-800",
        "border-current",
        "border",
        "m-2",
        "rounded-xl",
        "p-3",
        "text-center",
        "bg-teal-500"
      );
      li.innerHTML = `
        <a onclick="loadCategoryNews('${category_id}')" >${category_name}</a>
        `;
      categoryHeader.appendChild(li);
    }
  });
};

//code for load category News

const loadCategoryNews = (id) => {
  const newsApi = `https://openapi.programming-hero.com/api/news/category/${id}`;
  console.log(newsApi);

  fetch(newsApi)
    .then((res) => res.json())
    .then((data) => displayCategoryNews(data.data))
    .catch((error) => console.log(error));
};

const displayCategoryNews = (data) => {
  toggleSpinner(true);
  console.log(data.length);
  const noData = document.getElementById("no-data");
  if (data.length === 0) {
    noData.classList.remove("hidden");
  } else {
    noData.classList.add("hidden");
  }
  const newsCount = document.getElementById("news-count");
  const newsCard = document.getElementById("news-card");
  newsCard.textContent = "";
  newsCount.innerHTML = `
      <h2 class="text-center font-bold text-3xl"><span class="text-blue-500">${data.length}</span> News Found</h2>
      `;

  console.log(data);
  data.sort((a, b) => b.total_view - a.total_view);
  data.forEach((newses) => {
    console.log(newses);
    const {
      author,
      details,
      image_url,
      thumbnail_url,
      total_view,
      _id,
      title,
      rating,
    } = newses;
    const cardBody = document.createElement("div");
    cardBody.innerHTML = `
        <div class="card card-side lg:flex-row md:flex-row flex-col sm:flex-col  bg-base-100 shadow-xl">
        <figure class="w-6/12 mx-auto sm:mx-auto"><img " src="${thumbnail_url}" alt="Movie"></figure>
          <div class="card-body">
          
            <h2 class="card-title">${title}</h2>
            <p>${
              details.length > 350 ? details.slice(0, 350) + "..." : details
            }</p>
            <div class="card-actions mt-5 sm:justify-column justify-around">    
                <div id="author-detail" class="w-4/12 xl:flex-row  sm:flex-col flex justify-start">
                  <img class="w-3/12 lg:block hidden sm:hidden rounded-full" p-2 src="${
                    author.img
                  }" alt="" />
                  <div class="ml-2">
                  <span class="text-xl text-bold"> ${
                    author.name === null ? "No data found" : author.name
                  }</span>
                  <br /><span>${author.published_date}</span>
                  </div>
                </div>

              <div id="news-view">
               <i class="fa-solid fa-eye"></i> ${
                 total_view === null ? "No data found" : total_view
               }
              </div>
              <label for="my-modal-5" onclick='loadNewsDetails("${_id}")' class="btn btn-primary modal-button">Show Details</label>      
            </div>
          </div>
        </div>
        `;
    newsCard.appendChild(cardBody);
  });
  toggleSpinner(false);
};
loadCategoryNews();

// code for load new details

const loadNewsDetails = (id) => {
  const newsApi = `https://openapi.programming-hero.com/api/news/${id}`;

  fetch(newsApi)
    .then((res) => res.json())
    .then((data) => {
      data.data[0];
      return showNewsDetails(data.data[0]);
    })
    .catch((error) => console.log(error));
};

const showNewsDetails = (newsDetails) => {
  console.log(newsDetails);

  const {
    author,
    details,
    image_url,
    thumbnail_url,
    total_view,
    _id,
    title,
    rating,
  } = newsDetails;
  console.log(total_view);
  console.log(author);
  const modatContainer = document.getElementById("modal-box");
  modatContainer.innerHTML = `
        <img class="w-3/4 mx-auto" src="${image_url}">
      <h3 class="font-bold text-lg mt-5">
       ${details.length > 600 ? details.slice(0, 600) + "..." : details}
      </h3>
      <div class="flex-column mt-5">
      <div id="author-detail" class="w-4/12 flex justify-between">
        <img class="w-3/12 rounded-full lg:block hidden sm:hidden mr-2"  src="${
          author.img
        }" alt="" />
        <div>
          <span>Author Name: ${author.name}</span>
          <br /><span>Published Date:${author.published_date}</span>
        </div>
      </div>

        <div id="news-view" class="mt-3">
         <i class="fa-solid fa-eye"></i> ${total_view}
        </div> 
    </div>
      <div class="modal-action">
        <label for="my-modal-5" class="btn">Close!</label>
      </div>
  `;
};
// code for blog accordion-modal
const displayBlog = () => {
  myBlog = document.getElementById("blog-content");
  myBlog.innerHTML = `<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    <div class="collapse-title text-xl font-medium">
      Question: What is the diffrence between Map, forEach, Filter ,Find
    </div>
    <div class="collapse-content"> 
      <p class="text-2xl"><span class="text-2xl text-blue-500 text-bold">Map:</span> It is used for loop throw an array, and return a new array.</p>
        <p><span class="text-2xl text-blue-500 text-bold"">forEach:</span>
        It is also used for loop throw an array but it will not return any array.</p>
        <p><span class="text-2xl text-blue-500 text-bold">Filter:</span>
      
        Filter is used to loop throw an array where condition is given, filter returns a new array with the value which meet the condition.</p>
        <p><span class="text-2xl text-blue-500 text-bold"">Find:</span>Find is loop throw an array until it find the first value which meet the condition. After getting the first value it will stop loop and return the result.</p>
    </div>
  </div>
  <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    <div class="collapse-title text-xl font-medium">
      Question: What is the diffrence between varables "var", "let", "const".
    </div>
    <div class="collapse-content"> 
      <p><span class="text-2xl text-blue-500 text-bold">var:</span> Var is oldest version of variable which is a global scope variable.</p>
      <p><span class="text-2xl text-blue-500 text-bold"">Let:</span> Let is an upgrade version of variable var.let is a block scope variable.</p>
      <p> <span class="text-2xl text-blue-500 text-bold">Const:</span>It is a block scope variable & user can not update the value of const variable.</p>
    </div>
  </div>
  <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    <div class="collapse-title text-xl font-medium">
      Question: What is the diffrence between Arraw function and regular function.
    </div>
    <div class="collapse-content"> 
      <p><span class="text-2xl text-blue-500 text-bold">Arrow Function:</span>  Arrow function is introduced in Es6 update.For single expression Arrow function don not need to use curly brace.In arrow function, function get hoisted where you define. So, if you call the function before initialisation you will get referenceError.</p>

      <p> <span class="text-2xl text-blue-500 text-bold">Regular Function:</span> It is the older version of function. regular function must need to use curly brace.In regular function, function gets hoisting at top.</p>
    </div>
  </div>
  <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    <div class="collapse-title text-xl font-medium">
    Question: Why should we use templet string in javaScript?
    </div>
    <div class="collapse-content"> 
      <p><span class="text-2xl text-blue-500 text-bold">Templet String:</span> Template strings are a powerful feature of modern JavaScript released in ES6. It lets us insert/interpolate variables and expressions into strings without needing to concatenate like in older versions of JavaScript. It allows us to create strings that are complex and contain dynamic elements. <br>Another great thing that comes with template strings are tags. Tags are functions that take a string and the decomposed parts of the string as parameters and are great for converting strings to different entities.</p>
    </div>
    </div>
  
    `;
};

loadNewsDetails();
// code for spinner
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("spinner");
  if (isLoading) {
    loaderSection.classList.remove("hidden");
  } else {
    loaderSection.classList.add("hidden");
  }
};
toggleSpinner(true);
