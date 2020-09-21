// Saves extension options to chrome.storage
function save_options() {
    var tokenAmount = document.getElementById('defaultTokenAmount').value;
    chrome.storage.sync.set({
        // Drop the token amount into the Chrome synced storage
        tokenAmount: tokenAmount
    }, function () {
        // Show success alert when settings are saved.
        $(`
        <div class="alert alert-success mt-2 fade show" id="settingsSuccessAlert" role="alert">
        Options were successfully saved!
        </div>
        `).hide().appendTo('#response').show();

        // Hide alert after 750ms
        setTimeout(function () {
            $("#settingsSuccessAlert").alert('close')
        }, 2500);
    });
}

// Restores options from chrome.storage
function restore_options() {
    // Default is 300 tokens
    chrome.storage.sync.get({
        tokenAmount: 300
    }, function (items) {
        // Set the value of the fields in settings to the ones pulled from Chrome.storage
        document.getElementById('defaultTokenAmount').value = items.tokenAmount;
    });
}

// Listen for options save
document.addEventListener('DOMContentLoaded', function () {
    restore_options();

    // Add listener to save button
    document.getElementById('saveSettingsBtn').addEventListener('click', save_options);
});
