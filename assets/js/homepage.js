var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#username")


var getUserRepos = function(user) {

    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a repo request to the url
    fetch(apiUrl).then(function(repsonse) {
        repsonse.json().then(function(data) {
            displayRepos(data, user);
        });
    });
};
getUserRepos();

var formSubmitHandler = function(event) {
    // get the value from input element 
    var username = nameInputE1.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputE1.value = "";
    } else {
        alert("Please enter a Github Username")
    }
}

var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
};

userFormE1.addEventListener("submit", formSubmitHandler);