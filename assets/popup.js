// Gambit Team Challenge Bot
// function teamChallengeBot() {
//     // Get Gambit JWT from Localstorage
//     const gambitJwt = localStorage["token"];
//     const headers = new Headers();
//     headers.append('Authorization', gambitJwt);
//     headers.append('Content-Type', 'application/json');
//     const body = `{"swagbucks_point":{"amount":1}}`;
//
//     const payload = {
//         method: 'POST',
//         headers,
//         body
//     };
//
//     // Amount of tokens to redeem - we get this from the form
//     let amount = document.getElementById('redeemAmount').value;
//     // Counter utility
//     let counter = 0;
//     while (counter < amount) {
//         // Shoot API request
//         fetch('https://api-production.gambitrewards.com/api/v1/swagbucks_points', payload)
//             .then((response) => {
//                 response.text();
//             })
//             .then((text) => {
//                 alert(text);
//             })
//             .catch((err) => {
//                 alert(err);
//             });
//         // Increment counter by 1
//         counter = counter + 1
//     }
// }

// Fetch data from GambitProfit API
function fetchData() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        fetch('https://api.gambitprofit.com/gambit-plays/tokens/' + document.getElementById('tokenAmount').value + '/?PlayUrl=' + tabs[0].url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Show data in popup window
                showData(data);
                console.log('Data successfully reloaded.');
            })
            .catch(function (err) {
                alert('An error occurred! ' + err);
            });
    });
}

// Show data in extension popup
function showData(data) {
    console.log(data);
    let mainContainer = document.getElementById("showData");

    // Empty out data first
    mainContainer.innerHTML = "";

    let content = document.createElement("span");

    content.innerHTML = `
            <b>Detected Game Name:</b> ${data[0].Team1.Name} v. ${data[0].Team2.Name}
            <br>
            <b>Bet ${data[0].Calc.NoRisk.Team1BetAmount} tokens on ${data[0].Team1.Name}</b>
            <br>
            <b>Bet ${data[0].Calc.NoRisk.Team2BetAmount} tokens on ${data[0].Team2.Name}</b>
            <br>
            <span class="badge badge-success badge-pill">${data[0].Calc.NoRisk.ProfitPerCard}% profit</span>
            <br>
            <small class="text-muted">Last updated ${data[0].updatedAt}</small>
`

    mainContainer.appendChild(content);
}

document.addEventListener('DOMContentLoaded', function () {
    // Listener for redeem button
/*
    document.getElementById("teamChallengeSubmitBtn").addEventListener("click", teamChallengeBot);
*/
    // Listener for bet amounts token button (preventdefault to stop page from reloading)
    document.getElementById("tokenAmountForm").addEventListener("submit", function(e){
       e.preventDefault();
       fetchData();
    });
});


