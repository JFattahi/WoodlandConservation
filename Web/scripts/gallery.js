/**
 * Purpose: This JavaScript filters the photo gallery based on a given tag.
 * The gallery will shows photos with the given tag, and hide the other 
 * photos without the given tag.
 * Author: Ben Le
 */

// Initialize with all elements displayed
filterPhotos("all");

/**
 * Function to filter photos based on the given tag
 * Author: Ben Le
 * @param {*} tag, the tag to be filtered
 */
function filterPhotos(tag) {
  // Get all elements with the class "column" (representing photos)
  var photos;
  var i;

  // Gets all the photos
  photos = document.getElementsByClassName("column");

  // If the category is "all," display all photos
  if (tag == "all") {
    tag = "";
  }

  // Iterate through each photo
  for (i = 0; i < photos.length; i++) {
    // Remove "show" from all class name of photos
    removePhoto(photos[i]);

    // If the photo belongs to the selected tag, add the "show" class
    if (photos[i].className.indexOf(tag) > -1) addPhoto(photos[i]);
  }
}

/**
 * Function to add photo to gallery
 * @param {*} photo, the current photo selected
 */
function addPhoto(photo) {
  // Holds the tags of the photo
  var tags;

  // Holds "show" to append to class name in order to make photo visible
  var display;

  // Creates an array of the tag names
  tags = photo.className.split(" ");

  display = "show";

  // Add show to class name of photo to make it visible
  if (tags.indexOf(display) == -1) {
    photo.className += " " + display;
  }
}

/**
 * Function to hide photo in gallery
 * Author: Anonymous
 * @param {*} photo, the current photo selected
 */
function removePhoto(photo) {
  // Holds the tags of the photo
  var tags;

  // Holds "show" to remove from class name to hide the photo
  var hide;

  // Split the photo's current classes and the classes to be removed
  tags = photo.className.split(" ");
  hide = "show";

  // Removes "show" from class name of photo to hide
  while (tags.indexOf(hide) > -1) {
    tags.splice(tags.indexOf(hide), 1);
  }

  // Resets class name
  photo.className = tags.join(" ");
  console.log(photo.className);
}

// Gets container for the buttons
var buttonContainer = document.getElementById("myBtnContainer");

// Gets each of the tag buttons
var tagButtons = buttonContainer.getElementsByClassName("btn");

// Add click event listeners to buttons for highlighting
for (var i = 0; i < tagButtons.length; i++) {
  tagButtons[i].addEventListener("click", function () {
    // Remove the "active" class from the currently active button
    var currentActiveButton = document.getElementsByClassName("active");
    currentActiveButton[0].className = currentActiveButton[0].className.replace(
      " active",
      ""
    );

    // Add the "active" class to the clicked button
    this.className += " active";
  });
}
