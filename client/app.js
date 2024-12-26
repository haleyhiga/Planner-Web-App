console.log("connected");
//text wrapper where all the inputs 
let plannerWrapper = document.querySelector("#planner-wrapper");
let inputHomeworkName = document.querySelector("#add-homework-name");
let inputHomeworkDate = document.querySelector("#add-homework-date");
let inputHomeworkDesc = document.querySelector("#add-homework-desc");
let inputHomeworkCourse = document.querySelector("#add-homework-course");
let inputHomeworkNotes = document.querySelector("#add-homework-notes");
let saveHomeworkButton = document.querySelector("#save-homework-button");
let addHomeworkButton = document.querySelector("#add-homework-button");
let homeworkToDo = document.querySelector("#homework-to-do");
let signUpPage = document.querySelector("#sign-up");
let addFormWrapper = document.querySelector("#add-form-wrapper");
let inputFavColor = document.querySelector("#colorPicker");

let changeColorTheme = document.querySelector("#change-color-theme");


// Get modal elements
const modal = document.getElementById("modal");
const showModalButton = document.getElementById("show-modal-button");
const closeModal = document.querySelector(".close");


let saveColorButton = document.querySelector("#save-color-button");
let saveColorTheme = document.querySelector("#change-color-theme");
let addForm = document.querySelector("#add-form");

// hide stuff if not logged in or signed in
signUpPage.style.display = "block";
addFormWrapper.style.display = "none";
plannerWrapper.style.display = "none";
homeworkToDo.style.display = "none";

addForm.style.display = "none";
addFormWrapper.style.display = "none";
changeColorTheme.style.display = "none";





let editID = null;

saveColorButton.addEventListener("click", function() {
    console.log("favColor: ", inputFavColor.value);
    let data = "color=" + encodeURIComponent(inputFavColor.value);

    fetch("http://localhost:8080/sessions/settings/colors", {
        headers: {
            "Authorization": authorizationHeader(),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "PUT",
        body: data,
    })
    .then(function(response) {
        console.log(response.text)
        document.body.style.backgroundColor = inputFavColor.value;
    })

})



// save the color theme
saveColorTheme.addEventListener("click", function() {
    console.log("changing the color theme");
    let data = "theme=" + encodeURIComponent('#282828');
    fetch("http://localhost:8080/sessions/settings/themes", {
        headers: {
            "Authorization": authorizationHeader(),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "PUT",
        body: data,
    })
    .then(function(response) {
        console.log(response.text)
            document.body.style.backgroundColor = '#282828';

                    // sign in page colors
                    document.querySelector(".container").style.backgroundColor = '#282828';
                    document.querySelector(".header").style.backgroundColor = '#282828';
                    document.querySelector("#notebook").style.backgroundColor = '#282828';
                    document.querySelector("#pen").style.backgroundColor = '#282828';
                    document.querySelector('h1').style.backgroundColor = '#282828';
                    document.querySelector('h1').style.color = 'white';
                    saveColorButton.style.backgroundColor = '#738678';
                    saveColorTheme.style.backgroundColor = '#738678';

                    signUpPage.style.backgroundColor = '#909190';
                    document.querySelector('h4').style.backgroundColor = '#909190';
                    document.querySelector('h4').style.color = 'white';
                    document.querySelectorAll('textarea').forEach(function(textarea) {
                        textarea.style.backgroundColor = 'white';
                    })
                    document.querySelectorAll('label').forEach(function(label) {
                        label.style.backgroundColor = '#909190';
                        label.style.color = 'white';
                    })
                    createAccountButton.style.backgroundColor = '#738678';
                    loginButton.style.backgroundColor = '#738678';


                    // ADD HOMEWORK COLORS
                     document.querySelector('#add-form').style.backgroundColor = '#909190';
                     document.querySelector('#add-form-wrapper').style.backgroundColor = '#909190';
                    // document.querySelector('#add-form-wrapper').style.color = 'white';
                     addHomeworkButton.style.backgroundColor = '#738678';
                     saveHomeworkButton.style.backgroundColor = '#738678';
                     document.querySelector("#add-form h4").style.backgroundColor = '#909190';
                     document.querySelector("#add-form h4").style.color = 'white';


                     // HOMEWORK TO DO COLORS
                     homeworkToDo.style.backgroundColor = '#282828';
                     document.querySelector("#homework-to-do h5").style.color = 'white';
                     document.querySelector("#homework-to-do h5").style.backgroundColor = '#282828';
                     document.querySelector("h5").style.backgroundColor = '#282828';

                    plannerWrapper.style.backgroundColor = '#909190';
                    // document.querySelector("#planner-wrapper h3").style.backgroundColor = '#909190';
                    // document.querySelector("#planner-wrapper p").style.backgroundColor = '#909190';
                    // document.querySelector("#planner-wrapper button").style.backgroundColor = '#909190';

        

    

    })

})








let loginButton = document.querySelector("#login-button");
loginButton.onclick = function authenticateUserOnServer(){
    console.log("Login button clicked.");



    let inputEmail = document.querySelector("#add-email");
    let inputPassword = document.querySelector("#add-password");
    let data = "email=" + encodeURIComponent(inputEmail.value);
    data += "&password=" + encodeURIComponent(inputPassword.value);
    console.log("Data:",data);
    fetch("http://localhost:8080/sessions/auth",{
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authorizationHeader()
        }
    }).then(function(response){
        response.text().then(function(text) {
            // need to notify user if success or failure 
            if (response.status == 200) {
                console.log("Successfully logged in",response);
                signUpPage.style.display = "none";
                addFormWrapper.style.display = "block";
                plannerWrapper.style.display = "block";
                homeworkToDo.style.display = "block";


                addForm.style.display = "none";
                addFormWrapper.style.display = "none";
                changeColorTheme.style.display = "none";
                
                loadHomeworkFromServer();
                alert(text);
            } else {
                // lowkey i dont think i need this cuz its redundant
                signUpPage.style.display = "block";
                addFormWrapper.style.display = "none";
                plannerWrapper.style.display = "none";
                homeworkToDo.style.display = "none";
                
                addForm.style.display = "none";
                addFormWrapper.style.display = "none";
                changeColorTheme.style.display = "none";

                alert(text);
            }
        })
    })
}




let createAccountButton = document.querySelector("#create-account-button");
// edited this in class today
createAccountButton.onclick = function(){
    console.log("Create button clicked.");


    let inputFirstName = document.querySelector("#add-first-name");
    let inputLastName = document.querySelector("#add-last-name");
    let inputEmail = document.querySelector("#add-email");
    let inputPassword = document.querySelector("#add-password");
    let data = "first_name=" + encodeURIComponent(inputFirstName.value);
    data += "&last_name=" + encodeURIComponent(inputLastName.value);
    data += "&email=" + encodeURIComponent(inputEmail.value);
    data += "&password=" + encodeURIComponent(inputPassword.value);
    console.log("Data:",data);
    // added this
    fetch("http://localhost:8080/users",{
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authorizationHeader()
        }
    }).then(function(response){
        response.text().then(function(text) {
            // need to notify user if success or failure 
            if (response.status == 201) {
                console.log("New user created",response);
                signUpPage.style.display = "none";
                addFormWrapper.style.display = "block";
                plannerWrapper.style.display = "block";
                homeworkToDo.style.display = "block";
                alert(text);
            } else {
                signUpPage.style.display = "block";
                addFormWrapper.style.display = "none";
                plannerWrapper.style.display = "none";
                homeworkToDo.style.display = "none";
                alert(text);
            }
        })

    })
}


const apiUrl = window.location.protocol === 'file:'
? 'http://localhost:8080' // Local API server during development
: ''; // Production API

function saveHomework(){
    console.log("Save button clicked.")
    let data = "name=" + encodeURIComponent(inputHomeworkName.value);
    data += "&date=" + encodeURIComponent(inputHomeworkDate.value);
    data += "&desc=" + encodeURIComponent(inputHomeworkDesc.value);
    data += "&course=" + encodeURIComponent(inputHomeworkCourse.value);
    data += "&notes=" + encodeURIComponent(inputHomeworkNotes.value);

    console.log("Data:",data)
    let method = "POST";
    let URL = "http://localhost:8080/homework"
    if(editID){
        method = "PUT";
        URL = "http://localhost:8080/homework/"+editID;
    }
    fetch(URL,{
        method: method,
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authorizationHeader()

        }
    }).then(function(response){
        console.log("New homework created",response);
        plannerWrapper.textContent = "";
        loadHomeworkFromServer();
        
    });
    inputHomeworkName.value = "";
    inputHomeworkDate.value = "";
    inputHomeworkDesc.value = "";
    inputHomeworkCourse.value = "";
    inputHomeworkNotes.value = "";
    editID = null; 
}

function addHomework(data){
    console.log("Added homework")
    let homeworkName = document.createElement("h3"); // this just creates the element of where the value is going to be placed
    //homeworkName.textContent = data.name;
    homeworkName.textContent = "Name: " + data.name;
    let homeworkDate = document.createElement("p");
    homeworkDate.textContent = "Due: " + data.date;
    
    let homeworkDesc = document.createElement("p");
    homeworkDesc.textContent = "Description: " + data.desc;
    let homeworkCourse = document.createElement("p");
    homeworkCourse.textContent = "Course: " + data.course;
    let homeworkNotes = document.createElement("p");
    homeworkNotes.textContent = "Notes: " + data.notes;
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn-delete"); 
    let homeworkSeperator = document.createElement("hr")


    //when the edit button is clicked it edits the rollercoaster with that specific ID
    editButton.onclick = function(){
        console.log("homework ID: ", data.id)
        inputHomeworkName.value = data.name;
        inputHomeworkDate.value = data.date;
        inputHomeworkDesc.value = data.desc;
        inputHomeworkCourse.value = data.course;
        inputHomeworkNotes.value = data.notes;
        editID = data.id;

        showModalButton.click();
    };

    deleteButton.onclick = function(){
        deleteHomework(data);
};


    plannerWrapper.appendChild(homeworkName); 
    plannerWrapper.appendChild(homeworkDate);    
    plannerWrapper.appendChild(homeworkDesc);    
    plannerWrapper.appendChild(homeworkCourse);    
    plannerWrapper.appendChild(homeworkNotes);    
    plannerWrapper.appendChild(editButton);
    plannerWrapper.appendChild(deleteButton);
    plannerWrapper.appendChild(homeworkSeperator);
}

function loadHomeworkFromServer() {
    fetch("http://localhost:8080/homework", {
        method: "GET",
        headers: {
            "Authorization": authorizationHeader()
        }
    })

    .then(function(response){
        if(response.status == 401){
            return;
        }
    response.json()
    .then(function(homework){
            console.log("loaded homework data:", homework);
            plannerWrapper.textContent = "";
            homework.forEach(addHomework);
            })
    })
}

// function loadHomeworkFromServer() {
//     fetch("http://localhost:8080/homework")
//     .then(function(response){
//         response.json()
//             .then(function(data){
//                 console.log(data);
//                 let homework = data;
//                 homework.forEach(addHomework)
//             })
//     })
// }


function deleteHomework(data){
    console.log("delete button");
    console.log("DataID:",data)
    let URL =  + data.id;
    if (confirm("Are you sure you want to delete?")==true) {
        fetch("http://localhost:8080/homework/" + data.id, {
            method: "DELETE",
            headers: {
                "Authorization": authorizationHeader(),
                "Content-Type": "application/x-www-form-urlencoded"
            }

    }).then(function(response){
        console.log("Delete data", response)
        plannerWrapper.textContent = "";
        loadHomeworkFromServer()
        
    })
}
}


function authorizationHeader() {
    console.log("in authorization header")
    let sessionId = localStorage.getItem("sessionId");
 
    if (sessionId) {
        console.log(sessionId);
        return `Bearer ${sessionId}`;

     } else {
        console.log("in the else statement of authorization header");
        return null;
    }
 
 }


function createSessionId() {
    console.log("in createsessionid");
    fetch("http://localhost:8080/sessions", {
        headers: {
            "Authorization": authorizationHeader() 
        }

    }).then(function(response) {
        if (response.status == 200) {
            response.json().then(function(session) {
                localStorage.setItem("sessionId", session.id);
                console.log("Session ID from server:", session.id);
                console.log("Session data from server:", session.data);
                
                if (session.data.fav_color) {
                    inputFavColor.value = session.data.fav_color;
                    document.body.style.backgroundColor = session.data.fav_color;
                }

                if (session.data.theme) {
                    document.body.style.backgroundColor = session.data.theme;

                    // sign in page colors
                    document.querySelector(".container").style.backgroundColor = '#282828';
                    document.querySelector(".header").style.backgroundColor = '#282828';
                    document.querySelector("#notebook").style.backgroundColor = '#282828';
                    document.querySelector("#pen").style.backgroundColor = '#282828';
                    document.querySelector('h1').style.backgroundColor = '#282828';
                    document.querySelector('h1').style.color = 'white';
                    saveColorButton.style.backgroundColor = '#738678';
                    saveColorTheme.style.backgroundColor = '#738678';

                    signUpPage.style.backgroundColor = '#909190';
                    document.querySelector('h4').style.backgroundColor = '#909190';
                    document.querySelector('h4').style.color = 'white';
                    document.querySelectorAll('textarea').forEach(function(textarea) {
                        textarea.style.backgroundColor = 'white';
                    })
                    document.querySelectorAll('label').forEach(function(label) {
                        label.style.backgroundColor = '#909190';
                        label.style.color = 'white';
                    })
                    createAccountButton.style.backgroundColor = '#738678';
                    loginButton.style.backgroundColor = '#738678';


                    // ADD HOMEWORK COLORS
                     document.querySelector('#add-form').style.backgroundColor = '#909190';
                     document.querySelector('#add-form-wrapper').style.backgroundColor = '#909190';
                    // document.querySelector('#add-form-wrapper').style.color = 'white';
                     addHomeworkButton.style.backgroundColor = '#738678';
                     saveHomeworkButton.style.backgroundColor = '#738678';
                     document.querySelector("#add-form h4").style.backgroundColor = '#909190';
                     document.querySelector("#add-form h4").style.color = 'white';


                     // HOMEWORK TO DO COLORS
                     homeworkToDo.style.backgroundColor = '#282828';
                     document.querySelector("#homework-to-do h5").style.color = 'white';
                     document.querySelector("#homework-to-do h5").style.backgroundColor = '#282828';
                     document.querySelector("h5").style.backgroundColor = '#282828';

                    plannerWrapper.style.backgroundColor = '#909190';
                    document.querySelector("#planner-wrapper h3").style.backgroundColor = '#909190';
                    document.querySelector("#planner-wrapper p").style.backgroundColor = '#909190';
                    document.querySelector("#planner-wrapper button").style.backgroundColor = '#909190';

        
                }

                loadHomeworkFromServer();
            })
        }
    })
}




// Show the modal
showModalButton.addEventListener("click", () => {
    modal.style.display = "block";
    addForm.style.display = "block";
    addFormWrapper.style.display = "block";
});



// Close the modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    addForm.style.display = "none";
    addFormWrapper.style.display = "none";
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        addForm.style.display = "none";
        addFormWrapper.style.display = "none";
    }
});


saveHomeworkButton.onclick = saveHomework;
addHomeworkButton.onclick = saveHomework;

createSessionId();

