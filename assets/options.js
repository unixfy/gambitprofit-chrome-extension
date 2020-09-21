// This file holds common functions

// Saves extension options to chrome.storage
function saveSettings() {
    let tokenAmount = document.getElementById('defaultTokenAmount').value;
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

        // Hide alert after 2500ms
        setTimeout(function () {
            $("#settingsSuccessAlert").alert('close')
        }, 2500);
    });
}

// Restores options from chrome.storage
function restoreSettings() {
    // Default is 300 tokens
    chrome.storage.sync.get({
        tokenAmount: 300
    }, function (items) {
        // Set the value of the fields in settings to the ones pulled from Chrome.storage
        document.getElementById('defaultTokenAmount').value = items.tokenAmount;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Restore settings when options page loaded
    restoreSettings();

    // Run save function when save button clicked
    document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
});
