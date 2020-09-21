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
    // Fetch token amount from Chrome storage api
    chrome.storage.sync.get({
        tokenAmount: 300
    }, function (items) {
        // Grab the URL of the current tab, because we will use this in the API request
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            // Validate that the user is on a match page, otherwise display an error
            if(tabs[0].url.includes('/match/')) {
                // Show loader
                $("#loader").show();

                fetch('https://api.gambitprofit.com/gambit-plays/tokens/' + items.tokenAmount + '/?PlayUrl=' + tabs[0].url)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        // Add information and alerts to window
                        // Show data in popup window
                        showData(data);
                        // Hide loader
                        $("#loader").hide();

                    })
                    .catch(function (err) {
                        alert('An error occurred! ' + err);
                    });
            } else {
                // Show error when the page is not correct
                $(`
                <div class="alert alert-danger mt-2 fade show" id="pageUrlError" role="alert">
                You need to open a match page for this calculation to work!
                </div>
                `).hide().appendTo('#showData').show();
            }
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
            ${data[0].Calc.NoRisk.ProfitPerCard > 0.00 ? "" : '<div class="alert alert-warning" role="alert">&#9888; This match is not profitable for hedging!</div>'}
            <b>Detected Game Name:</b> ${data[0].Team1.Name} v. ${data[0].Team2.Name}
            <br>
            Bet <b>${data[0].Calc.NoRisk.Team1BetAmount}</b> tokens on <b>${data[0].Team1.Name}</b> to win ${data[0].Calc.NoRisk.Team1BetAmount * data[0].Team1.Reward} tokens
            <br>
            Bet <b>${data[0].Calc.NoRisk.Team2BetAmount}</b> tokens on <b>${data[0].Team2.Name}</b> to win ${data[0].Calc.NoRisk.Team2BetAmount * data[0].Team2.Reward} tokens
            <br>
            <span class="badge ${ data[0].Calc.NoRisk.ProfitPerCard > 0.00 ? "badge-success" : "badge-danger"} badge-pill">${data[0].Calc.NoRisk.ProfitPerCard}% profit</span>
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

    // Load the data immediately on page load
    fetchData();
});


