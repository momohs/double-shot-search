$( document ).ready(function() {
    loadProfiles();
});

function loadProfiles() {
    getProfiles(function () {
        constructProfileTable();
    });
}

function constructProfileTable() {
    var list = $("#profiles-grid").empty();

    list.append(constructGridTitle("Profile Name"));
    list.append(constructGridTitle("Left URL"));
    list.append(constructGridTitle("Right URL"));
    list.append(constructGridTitle());

    for (var i in profiles.availableProfiles) {
        list.append(constructGridItem(profiles.availableProfiles[i].name));
        list.append(constructGridItem(profiles.availableProfiles[i].leftUrl));
        list.append(constructGridItem(profiles.availableProfiles[i].rightUrl));
        list.append(constructGridItem(
            $("<input>")
                .addClass("delete-button")
                .attr("type", "button")
                .attr("value", "Delete")
                .attr("data-id", i)
                .click(deleteProfile)));
    }

    list.append(constructGridItem(constructInputField("input-name-field")));
    list.append(constructGridItem(constructInputField("input-left-url-field")));
    list.append(constructGridItem(constructInputField("input-right-url-field")));
    list.append(
        constructGridItem(
            $("<input>")
                .addClass("add-button")
                .attr("type", "button")
                .attr("value", "Add")
                .click(addNewProfile)));
}

function deleteProfile() {
    var index = $(this).attr("data-id");
    profiles.availableProfiles.splice(index, 1);
    saveProfiles();
    loadProfiles();
}

function constructInputField(id) {
    return $("<input>")
        .attr("id", id)
        .addClass("input-field")
        .attr("type", "text");
}

function constructGridTitle(html) {
    return $("<div>")
        .addClass("grid-item title")
        .html(html);
}

function constructGridItem(html) {
    return $("<div>")
        .addClass("grid-item")
        .html(html);
}

function addNewProfile() {
    console.log("Adding new profile");

    var profileName = $("#input-name-field").val();
    var leftUrl = $("#input-left-url-field").val();
    var rightUrl = $("#input-right-url-field").val();

    if (!validateProfile(profileName, leftUrl, rightUrl)) {
        return;
    }

    profiles.availableProfiles.push({name: profileName, leftUrl: leftUrl, rightUrl: rightUrl});
    saveProfiles();
    loadProfiles();
}

function validateProfile(name, leftUrl, rightUrl){
    var message = "";
    if (!name || !leftUrl || !rightUrl) {
        message += "Profile name, left URL and right URL cannot be empty."
    }

    if (!leftUrl.includes("{query}") || !rightUrl.includes("{query}")) {
        message += "Urls must contain '{query}' as a placeholder for the query."
    }

    if (message) {
        alert(message);
        return false;
    }
    return true;
}
