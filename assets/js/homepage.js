var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#username")
var repoContainerE1 = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // format the github api url
    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            // notice this '.catch()' getting chained ontothe end of the '.then()'
            alert("unable to connect to Github")
        })



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

    // check if api returned repos
    if (repos.length === 0) {
        repoContainerE1.textContent = "No repositories found"
        return;
    }
    // clear old content
    repoContainerE1.textContent = "";
    repoSearchTerm.textContent = searchTerm;


    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repository name 
        var titleE1 = document.createElement("span");
        titleE1.textContent = repoName;

        // append to container
        repoEl.appendChild(titleE1);

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

        // create a status element 
        var statusE1 = document.createElement("span");
        statusE1.classList = "flex-row align-center";

        // check if current repos has issues or not
        if (repos[i].open_issues_count > 0) {
            statusE1.innerHTML =
                "<i class = 'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusE1.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusE1)
            // append container to the dom
        repoContainerE1.appendChild(repoEl);

    }
};


userFormE1.addEventListener("submit", formSubmitHandler);