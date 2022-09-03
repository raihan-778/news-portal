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
loadCategoryNews();
const displayCategoryNews = (data) => {
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
      <h2>${data.length} news Found</h2>
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
        <div class="card card-side bg-base-100 shadow-xl">
            <figure><img src="${thumbnail_url}" alt="Movie"></figure>
          <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${
              details.length > 250 ? details.slice(0, 250) + "..." : details
            }</p>
            <div class="card-actions mt-5 justify-around">    
                <div id="author-detail" class="w-4/12 flex justify-between">
                  <img class="w-2/12 rounded-full"  src="${
                    author.img
                  }" alt="" />
                  <div>
                    <span>Author Name: ${author.name}</span>
                    <br /><span>Published Date:${author.published_date}</span>
                  </div>
                </div>

              <div id="news-view">
              Total Views: <i class="fa-solid fa-eye"></i> ${total_view}
              </div>
              <label for="my-modal-5" onclick='loadNewsDetails("${_id}")' class="btn btn-primary modal-button">Show Details</label>      
            </div>
          </div>
        </div>
        `;
    newsCard.appendChild(cardBody);
  });
};

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
        Total Views: <i class="fa-solid fa-eye"></i> ${total_view}
        </div> 
    </div>
      <div class="modal-action">
        <label for="my-modal-5" class="btn">Yay!</label>
      </div>
  `;
};
loadNewsDetails();
