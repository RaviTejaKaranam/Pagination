// creating a new XMLHttpRequest 
let request = new XMLHttpRequest();

// The URL to get the JSON data 
request.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
  true
);
let data = "";
request.send();
request.onload = function () {
  // storing data in a variable 
  data = JSON.parse(this.response);
  data.unshift("*");
  let div = document.getElementById("details");
  let container = document.getElementById("container")
  div.innerHTML = "";
  // Initally displaying the first page when the website loads 
  for (let i = 1; i < 11; i++) {
    let holderDiv = document.createElement("div");
    let pId = document.createElement("p");
    let pName = document.createElement("p");
    let pEmail = document.createElement("p");
    pEmail.classList.add("alignment")
    pId.innerHTML = "Id : "  + data[i].id;
    pName.innerHTML = "Name : " + data[i].name;
    pEmail.innerHTML = "Email : " + data[i].email;
    //Assigning and appending the generated id,name,email to div and div to body
    holderDiv.append(pId);
    holderDiv.append(pName);
    holderDiv.append(pEmail);
    div.append(holderDiv);
    container.append(div)
    document.body.append(container);
  }
};


//Declaring the unordered list
let ulTag = document.querySelector("ul");
//Total number of pages
let numberOfPages = 10;
let listOfPages = document.getElementById("list-of-pages");
//Writing content in list tag
let liTag = "";

function generatePaginationLinks(numberOfPages, currentPage) {
  let presentPage = currentPage;
  if (presentPage === 1) {
    // if presentPage is first page previous page button should not be displayed 
    for (let i = presentPage; i < presentPage + 2; i++) {
      if (i === presentPage) {
        //Active page link should have different background color for identification
        liTag = `<li class = "active"><a href="#" id="page-${i}" value="${i}" onclick = "domGeneration(${i}); generatePaginationLinks(numberOfPages,${i})">${i}</a></li>`;
      } else {
        liTag += `<li><a href="#" id="page-${i}" value="${i}" onclick = "domGeneration(${i}); generatePaginationLinks(numberOfPages,${i})">${i}</a></li>`;
      }
    }
    //Appending next button to the pagination links
    liTag += `<li>
          <a href="#" id="next-button" onclick = "generatePaginationLinks(numberOfPages,${
            currentPage + 1
          }); domGeneration(${currentPage + 1})"
            ><span class="next-button">Next</span
            ><i class="fas fa-chevron-right"></i
          ></a>
        </li>`;
        // assigning the generated list items to unordered list 
    ulTag.innerHTML = liTag;
  } 
  // for pages 2 to 9 both previous and next button can be displayed
  else if (presentPage > 1 && presentPage < 10) {
    //Adding previous button to the pagination links
    liTag = `<li>
          <a href="#" id="prev-button" onclick = "generatePaginationLinks(numberOfPages,${
            currentPage - 1
          }); domGeneration(${currentPage - 1})"
            ><i class="fas fa-chevron-left"
              ><span class="prev-button">Prev</span></i
            ></a
          >
        </li>`;
    for (let i = presentPage - 1; i <= presentPage + 1; i++) {
      // adding links for the previous page , next page 
      if (i === presentPage) {
        liTag += `<li class = "active"><a href="#" id="page-${i}" value="${i}" onclick = "domGeneration(${i}); generatePaginationLinks(numberOfPages,${i})">${i}</a></li>`;
      } else {
        liTag += `<li><a href="#" id="page-${i}" value="${i}" onclick = "domGeneration(${i}); generatePaginationLinks(numberOfPages,${i})">${i}</a></li>`;
      }
    }
    // Adding next button to the pagination links 
    liTag += `<li>
          <a href="#" id="next-button" onclick = "generatePaginationLinks(numberOfPages,${
            currentPage + 1
          }); domGeneration(${currentPage + 1})"
            ><span class="next-button">Next</span
            ><i class="fas fa-chevron-right"></i
          ></a>
        </li>`;
        // assigning the generated list items to unordered list
    ulTag.innerHTML = liTag;
  } 
  // For the last page next button should not be displayed 
  else {
    // Adding previous button to the pagination links 
    liTag = `<li>
          <a href="#" id="prev-button" onclick = "generatePaginationLinks(numberOfPages,${
            currentPage - 1
          }); domGeneration(${currentPage - 1})"
            ><i class="fas fa-chevron-left"
              ><span class="prev-button">Prev</span></i
            ></a
          >
        </li>`;
    for (let i = presentPage; i <= numberOfPages; i++) {

      if (i === presentPage) {
        liTag += `<li class = "active"><a href="#" id="page-${i}" value="${i}" onclick = "domGeneration(${i}); generatePaginationLinks(numberOfPages,${i})">${i}</a></li>`;
      } else {
        liTag += `<li><a href="#" id="page-${i}" value="${i}" onclick = "domGeneration(${i}); generatePaginationLinks(numberOfPages,${i})">${i}</a></li>`;
      }
      // assigning the generated list items to unordered list
      ulTag.innerHTML = liTag;
    }
  }
}
//Generating the pagination links initially on the web page, total pages = 10, current page = 1
generatePaginationLinks(10, 1);

// generating the details when the pagination links are clicked 
const domGeneration = (value) => {
  console.log("called", value);
  let div = document.getElementById("details");
  div.innerHTML = "";
  //Assigning id,name,email to p tags and appending them to details div
  for (let i = value * 10 - 9; i < value * 10 + 1; i++) {
    let pId = document.createElement("p");
    let pName = document.createElement("p");
    let pEmail = document.createElement("p");
    pEmail.classList.add("alignment")
    pId.innerHTML = "Id : "  + data[i].id;
    pName.innerHTML = "Name : " + data[i].name;
    pEmail.innerHTML = "Email : " + data[i].email;
    div.append(pId);
    div.append(pName);
    div.append(pEmail);
  }
  // appending details div to container div and container to body 
  const container = document.getElementById("container");
  container.append(div);
  document.body.append(container);
};
