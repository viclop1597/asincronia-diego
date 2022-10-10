// API to obtain data 
const api = 'https://reqres.in/api/users?delay=3'

function btn() {
    const container = document.getElementById("contBtn")
    container.innerHTML =
        `<div class="row my-4 justify-content-evenly mx-auto">
            <div class="col-md-3">
                <button class="btn btn-info form-control col-md-4" id="btnUser" onclick="readUser()">Obtener usuarios</button>
            </div>
        </div>`
}

// Spiner function to change the button and show that data is being loading 
function spiner() {
    const container = document.getElementById("contBtn")
    container.innerHTML =
        `<div class="row my-4 justify-content-evenly mx-auto">
            <div class="col-md-3">
                <button class="btn btn-info form-control -md-4" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Cargando...
            </div>
        </div>`
}

// Reading data function to read either from local data or API 
function readUser() {
    const user = JSON.parse(localStorage.getItem("users"));
    user && user.time > Date.now() ?
        displayUsers(user.content) :
        fetchRequest();
}

// Fetch function to obtain data from API 
function fetchRequest() {
    spiner();
    fetch(api)
        .then(response => response.json())
        .then(users => {
            usersToLocalStorage(users.data);
            displayUsers(users.data);
        })
    setTimeout(() => btn(), 3500);
}

// Saving data function to save data to local storage 
function usersToLocalStorage(data) {
    const users = {
        usersData: [...data],
        time: Date.now() + 60000  //Obtain local time and add 1 min.
    }
    localStorage.setItem("userData", JSON.stringify(users)); //To convert object to JSON: JSON.stringify(object)
}

const displayUser = ({ avatar, id, email, first_name, last_name }) => {
    return `<div class="container overflow-hidden text-center my-3">
                <div class="row align-items-center gy-5">
                    <div class="col md-6 "></div>
                    <div class="col border bg-light md-6 ">
                        <div class="row-md-9">
                            <img src="${avatar}" class="rounded-circle mx-auto" style="width: 90px"></img>
                        </div>
                        <div class="row-md-3">
                            <p class="text-center">First Name: ${first_name}</p>
                        </div>
                        <div class="row-md-3">
                            <p class="text-center">Last Name: ${last_name}</p>
                        </div>
                        <div class="row-md-1">
                            <p class="text-center">Id: ${id}</p>
                        </div>
                        <div class="row-md-4">
                            <p class="text-center">Email: ${email}</p>
                        </div>
                    </div>
                    <div class="col md-6 "></div>
                </div>
            </div>`
}

// Display function to print all users info 
function displayUsers(data) {
    const container = document.getElementById("contUser")
    data.forEach(user => container.innerHTML += displayUser(user));
}