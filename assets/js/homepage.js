var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#username")
var repoContainerE1 = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


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
// getUserRepos();

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var nameInputE1 = document.querySelector("#username")
    var userName = nameInputE1.value.trim();

    if (userName) {
        getUserRepos(userName);
        nameInputE1.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
}

var displayRepos = function(repos, searchTerm) {
    // clear old content
    repoContainerE1.textContent = "";
    repoSearchTerm.textContent = searchTerm;


    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name 
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoE1 = document.createElement("div");
        repoE1.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name 
        var titleE1 = document.createElement("span");
        titleE1.textContent = repoName;

        // append to container
        repoE1.appendChild(titleE1);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append container to the dom
        repoContainerE1.appendChild(repoE1);

    }
};


userFormE1.addEventListener("submit", formSubmitHandler);