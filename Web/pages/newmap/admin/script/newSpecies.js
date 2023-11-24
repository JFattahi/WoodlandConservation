/**
 * The purpose of this file is to add the behaviours for the newSpecies page within the admin folder
 *
 * Author: Agowun Muhammad Altaf (A00448118), wrote the whole file
 */


// global reference to the category selection
const categoryInput = document.getElementById("category");
// global reference to the name text input
const nameInput = document.getElementById("name");
// global reference to the description textarea
const descriptionInput = document.getElementById("description");
// global reference to the hidden image file input
const imagesInput = document.getElementById("imageInput");
// global reference to the upload button
const uploadBtn = document.getElementById("upload");
// global reference to the images preview section
const preview = document.querySelector(".preview");
// global reference to the progress area
const progessSect = document.getElementById("progress");

// store all the images to be uploaded
let imageArray = [];

// monitor for new images to be uploaded
imagesInput.addEventListener("change", (event) => {
    // stores a list of the file/image objectss
    const fileList = event.target.files;

    // populate image array
    for (let element = 0; element < fileList.length; element++) {
        const item = fileList[element];

        imageArray.push(item);
    }

    displayImages();
});

/**
 * populate the preview section with the images to be uploaded.
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 */
function displayImages() {
    // reset the images
    preview.innerHTML = null;

    // loop though the images in the image array
    imageArray.forEach((img, i) => {
        // create an img tag
        let image = document.createElement("img");
        // set the src of the img tag to that of the image
        image.src = URL.createObjectURL(img);

        // remove the image after clicking on it and confirming
        image.addEventListener("click", () => {
            // prompt the user for whether they intended to remove the image
            if (confirm("Confirm deletion")) {
                // remove the image from the image array
                imageArray.splice(i, 1);

                // display the images again after that image was removed
                displayImages();
            }
        });

        // add the newly created img tag to the preview section
        preview.appendChild(image);
    });
}

// listen to when the user clicks on the upload button
uploadBtn.addEventListener("click", uploadContent);


