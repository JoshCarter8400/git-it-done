var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a repo request to the url
    fetch(apiUrl).then(function(repsonse) {
        repsonse.json().then(function(data) {
            console.log(data)
        });
    });
};
getUserRepos("microsoft");