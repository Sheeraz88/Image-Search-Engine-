const accessKey = " __";  // enter your unsplash access key here

const searchForm = document.getElementById("searchForm");
const searchBox = document.getElementById("searchbox");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("showmore-btn");

let keyword = "";
let page = 1;

async function searchImage() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();  
    console.log(data);
    

    if (page === 1) {
      searchResult.innerHTML = "";
    }

    
    data.results.forEach(photo => {
      const img = document.createElement("img");
      img.src = photo.urls.small;
      img.alt = photo.alt_description || "Image";
      searchResult.appendChild(img);
    });

    showMore.style.display = "block";
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
});

showMore.addEventListener("click", () => {
  page++;
  searchImage();
});
