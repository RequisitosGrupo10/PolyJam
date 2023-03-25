const allComments = document.querySelector(".commentDiv");
const parentDiv = document.getElementById("parentDiv");
const mainCommentContainer = document.getElementById("mainCommentContainer");
const addCommentBtn = document.getElementById("addCommentBtn");

const commentsPerPage = 5;
//const numberOfPages = Math.ceil(allComments.childElementCount / commentsPerPage);


function addComment(){
    addCommentBtn.style.display = "none";

    let form = document.createElement("form");
    
    form.setAttribute("class", "col-md-11 col-lg-11 col-xl-11");
    form.setAttribute("id", "commentForm");

    let displayedName = document.createElement("input");
    displayedName.setAttribute("type", "text");
    displayedName.setAttribute("class", "commentInput form-control w-25");
    displayedName.setAttribute("placeholder", "Displayed Name");
    displayedName.setAttribute("id", "displayedName")
    form.appendChild(displayedName);
    
    form.appendChild(document.createElement("br"));

    let textarea = document.createElement("textarea");
    textarea.setAttribute("class", "commentInput form-control w-50");
    textarea.setAttribute("placeholder", "Comment");
    textarea.setAttribute("rows", "3");
    textarea.setAttribute("id", "commentText");
    form.appendChild(textarea);

    form.appendChild(document.createElement("br"));

    let divButtons = document.createElement("div");

    let submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "button");
    submitBtn.setAttribute("class", "btn btn-primary");
    submitBtn.innerHTML = "Submit";
    submitBtn.addEventListener("click", submitButtonFuncion, false);
    divButtons.appendChild(submitBtn);

    let cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("type", "button");
    cancelBtn.setAttribute("class", "btn btn-secondary");
    cancelBtn.innerHTML = "Cancel";
    cancelBtn.addEventListener("click", cancelButtonFuncion, false);
    divButtons.appendChild(cancelBtn);
    
    form.appendChild(divButtons)
    mainCommentContainer.appendChild(form);
}

addCommentBtn.addEventListener("click", addComment, false);

function submitButtonFuncion(e){
    let displayedName = document.getElementById("displayedName").value;
    let commentText = document.getElementById("commentText").value;
    let time = "Just now";

    let commentDiv = document.createElement("div");
    commentDiv.setAttribute("class", "d-flex flex-start mb-4 commentDiv");

    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card w-100");
    commentDiv.appendChild(cardDiv);

    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.setAttribute("class", "card-body p-4");
    cardDiv.appendChild(cardBodyDiv);

    let article = document.createElement("article");
    article.setAttribute("class", "");
    cardBodyDiv.appendChild(article);

    let header = document.createElement("h5");
    header.innerHTML = displayedName;
    article.appendChild(header);

    let timeP = document.createElement("p");
    timeP.setAttribute("class", "small");
    timeP.innerHTML = time;
    article.appendChild(timeP);

    let commentP = document.createElement("p");
    commentP.innerHTML = commentText;
    article.appendChild(commentP);

    parentDiv.appendChild(commentDiv);
    addCommentBtn.style.display = "inline";
    mainCommentContainer.removeChild(mainCommentContainer.lastChild);
}

function cancelButtonFuncion(){
    addCommentBtn.style.display = "inline";
    mainCommentContainer.removeChild(mainCommentContainer.lastChild);
}