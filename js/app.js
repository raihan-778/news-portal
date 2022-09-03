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
      li.classList.add("text-green-900", "text-lg");
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
      <h2 class="text-center text-3xl">${data.length} News Found</h2>
      `;

  console.log(data);
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
        <div class="card  card-side bg-base-100 shadow-xl">
            <figure><img src="${thumbnail_url}" alt="Movie"></figure>
          <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${
              details.length > 250 ? details.slice(0, 250) + "..." : details
            }</p>
            <div class="card-actions mt-5 sm:justify-column justify-around">    
                <div id="author-detail" class="w-4/12 sm:flex-column flex justify-start">
                  <img class="w-3/12 rounded-full" p-2 src="${
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
        <img src="${image_url}">
      <h3 class="font-bold text-lg mt-5">
       ${details.length > 600 ? details.slice(0, 600) + "..." : details}
      </h3>
      <div class="flex-column mt-5">
      <div id="author-detail" class="w-4/12 flex justify-between">
        <img class="w-2/12 rounded-full"  src="${author.img}" alt="" />
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
      Question: What is the diffrence Map, forEach, Filter ,Find
    </div>
    <div class="collapse-content"> 
      <p>Map: it is used for loop throw an array, and return a new array.</p>
        <p>forEach:
        It is also used for loop throw an array but it will not return any array.</p>
        <p>
        Filter:
        Filter is used to loop throw an array where condition is given, filter returns a new array with the value which meet the condition.</p>
        <p>Find:Find is loop throw an array until it find the first value which meet the condition. After getting the first value it will stop loop and return the result.</p>
    </div>
  </div>
  <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    <div class="collapse-title text-xl font-medium">
      Question: What is the diffrence between varables "var", "let", "const".
    </div>
    <div class="collapse-content"> 
      <p>var: Var is oldest version of variable which is a global scope variable.</p>
      <p> let: Let is an upgrade version of variable var.let is a block scope variable.</p>
      <p> Const: It is a block scope variable & user can not update the value of const variable.</p>
    </div>
  </div>
  <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    <div class="collapse-title text-xl font-medium">
      Question: What is the diffrence between Arraw function and regular function.
    </div>
    <div class="collapse-content"> 
      <p>Ans: Arrow Function: Arrow function is introduced in Es6 update.For single expression Arrow function don not need to use curly brace.In arrow function, function get hoisted where you define. So, if you call the function before initialisation you will get referenceError.</p>

      <p>  Regular Function:It is the older version of function. regular function must need to use curly brace.In regular function, function gets hoisting at top.</p>
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
