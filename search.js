const shopPrefix = "shop ";
$( document ).ready(function() {
    getProfiles(function () {
        var url = $.url();
        var query = encodeURIComponent(url.param("q"));
        if(profiles.activeProfileIndex == -1) {
            searchDefaultProfile(query);
        } else {
            searchCustomProfile(profiles.availableProfiles[profiles.activeProfileIndex], query);
        }
    });
});

function searchDefaultProfile(query) {
    let left = "https://www.bing.com/search?q=";
    let right = "https://www.google.com/search?q=";

    if (typeof query != 'undefined')
    {
        if (query.indexOf(shopPrefix) === 0) {
            query = query.substr(shopPrefix.length);
            left = left.replace("search?", "shop?");
            right = right.replace("search?", "search?psb=1&tbm=shop&");
        }
        displaySbs(left + query, right + query);
        document.title = query.replace(/</g, "&lt;").replace(/>/g, "&gt;") + " - Double Shot Search";
    }
}

function searchCustomProfile(profile, query) {
    var leftUrl = profile.leftUrl;
    var rightUrl = profile.rightUrl;

    leftUrl = leftUrl.replace("{query}", query);
    rightUrl = rightUrl.replace("{query}", query);
    displaySbs(leftUrl, rightUrl);
    document.title = query.replace(/</g, "&lt;").replace(/>/g, "&gt;") + " - Double Shot Search";
}

function displaySbs(leftUrl, rightUrl) {
    $("#left").attr("src", leftUrl);
    $("#right").attr("src", rightUrl);
}