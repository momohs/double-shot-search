var profiles = {
    availableProfiles: [],
    activeProfileIndex: -1
};
var defaultProfileName = "Bing and Google";


function getProfiles(callback) {
    chrome.storage.sync.get(["profiles"], function(result) {
        if (result["profiles"]) {
            profiles = result["profiles"];
        }
        if (callback) {
            callback();
        }
    });
}
function getActiveProfileName() {
    if (profiles.activeProfileIndex == -1) {
        // Default to Bing and Google
        return defaultProfileName;
    } else {
        return profiles.availableProfiles[profiles.activeProfileIndex].name;
    }
}

function setActiveProfile(profileName) {
    profiles.activeProfileIndex = -1;
    for (var i in profiles.availableProfiles) {
        if (profiles.availableProfiles[i].name == profileName) {
            profiles.activeProfileIndex = i;
            break;
        }
    }
    saveProfiles();
}

function saveProfiles() {
    if (profiles.activeProfileIndex >= profiles.availableProfiles.length) {
        profiles.activeProfileIndex = -1;
    }
    
    chrome.storage.sync.set({"profiles": profiles});
}