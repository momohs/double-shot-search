$( document ).ready(function() {
    $("#double-shot-search-box").attr("action", chrome.extension.getURL("search.html"));
    $("#add-profile-button").click(function() {
        console.log("going to page");
        chrome.tabs.create({"url": chrome.extension.getURL("manage-profiles.html")});
    });
    $("#query-box").focus();

    getProfiles(function () {
        setSearchButtonName();
        updateProfileSelector();
    });
});


function setSearchButtonName() {
    let profileName = getActiveProfileName();
    $("#search-button").attr("value", "Search " + profileName);
}

function updateProfileSelector() {
    var list = $("#active-profile-selector").empty();
    list.append($("<option>").attr("selected", profiles.activeProfileIndex == -1 ? "selected": null).html(defaultProfileName))
    for (var i in profiles.availableProfiles) {
        list.append($("<option>").attr("selected", profiles.activeProfileIndex == i ? "selected": null).html(profiles.availableProfiles[i].name))
    }
    list.change(function (){
        setActiveProfile($("#active-profile-selector option:selected").val());
        setSearchButtonName();
    })
}