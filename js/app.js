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
    .then((data) => displayCategoryNews(data.data));
};
loadCategoryNews();
const displayCategoryNews = (data) => {
  const newsCount = document.getElementById("news-count");
  const newsCard = document.getElementById("news-card");
  newsCount.innerHTML = `
  <h2>${data.length} news Found</h2>
  `;

  console.log(data);
  data.forEach((newses) => {
    console.log(newses);
    const cardBody = document.createElement("div");
    cardBody.innerHTML = `
    <div class="card card-side bg-base-100 shadow-xl">
  <figure><img src="https://placeimg.com/200/280/arch" alt="Movie"></figure>
  <div class="card-body">
    <h2 class="card-title">New movie is released!</h2>
    <p>Click the button to watch on Jetflix app.</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Watch</button>
    </div>
  </div>
</div>
    `;
    console.log(newses);
  });
};
