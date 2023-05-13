const allComments = document.querySelector(".commentDiv");
const parentDiv = document.getElementById("parentDiv");
const mainCommentContainer = document.getElementById("mainCommentContainer");
const addCommentBtn = document.getElementById("addCommentBtn");
const removeCommentBtn = document.getElementsByClassName("removeCommentBtn");

const commentsPerPage = 5;
//const numberOfPages = Math.ceil(allComments.childElementCount / commentsPerPage);

function addComment(name, text) {
    
    addCommentBtn.style.display = "none";

    let form = document.createElement("form");

    form.setAttribute("class", "col-md-12 col-lg-12 col-xl-12");
    form.setAttribute("id", "commentForm");

    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("htmlFor", "displayedName");
    nameLabel.innerHTML = "Displayed Name";
    nameLabel.style.fontWeight = "bold";

    form.appendChild(nameLabel);

    let displayedName = document.createElement("input");
    displayedName.setAttribute("type", "text");
    displayedName.setAttribute("class", "commentInput form-control w-25");
    displayedName.setAttribute("id", "displayedName")
    if (name !== null)
        displayedName.setAttribute("value", name);
    form.appendChild(displayedName);

    let commentLabel = document.createElement("label");
    commentLabel.setAttribute("htmlFor", "commentText");
    commentLabel.innerHTML = "Comment";
    commentLabel.style.fontWeight = "bold";

    form.appendChild(commentLabel);

    let textarea = document.createElement("textarea");
    textarea.setAttribute("class", "commentInput form-control w-50");
    textarea.setAttribute("rows", "3");
    textarea.setAttribute("id", "commentText");
    if (text != null)
        textarea.innerHTML = text;
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
    cancelBtn.style.marginLeft = "20px";
    cancelBtn.innerHTML = "Cancel";
    cancelBtn.addEventListener("click", cancelButtonFuncion, false);
    divButtons.appendChild(cancelBtn);

    form.appendChild(divButtons)
    mainCommentContainer.appendChild(form);
}

addCommentBtn.addEventListener("click", () =>{
    addComment(null, null)
}, false);

function submitButtonFuncion(e) {
    let displayedName = document.getElementById("displayedName").value;
    let commentText = document.getElementById("commentText").value;

    if (displayedName && commentText) {

        let time = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

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

        let header = document.createElement("strong");
        header.setAttribute("class", "h4");
        header.innerHTML = displayedName;
        article.appendChild(header);

        let timeP = document.createElement("p");
        timeP.setAttribute("class", "small updatedTimestamp");
        timeP.innerHTML = time
        article.appendChild(timeP);

        let commentP = document.createElement("p");
        commentP.innerHTML = commentText;
        article.appendChild(commentP);
        
        let editBtn = document.createElement("button");
        editBtn.setAttribute("type", "button");
        editBtn.setAttribute("class", "btn btn-primary");
        editBtn.innerHTML = "Edit";
        editBtn.addEventListener("click", () =>{
            parentDiv.removeChild(commentDiv);
            addComment(displayedName, commentText);
        }, false);
        cardBodyDiv.appendChild(editBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("class", "btn btn-danger");
        deleteBtn.style.marginLeft = "20px";
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener("click", () =>{
            parentDiv.removeChild(commentDiv);
        }, false);
        cardBodyDiv.appendChild(deleteBtn);

        parentDiv.appendChild(commentDiv);
        addCommentBtn.style.display = "inline";
        mainCommentContainer.removeChild(mainCommentContainer.lastChild);
    } else {
        window.alert("Error: Empty fields on comment form!");
    }
}

function cancelButtonFuncion() {
    addCommentBtn.style.display = "inline";
    mainCommentContainer.removeChild(mainCommentContainer.lastChild);
}