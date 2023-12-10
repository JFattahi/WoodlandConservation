/**
 * Purpose: This JavaScript will retreive the user information from the photo upload form
 * Send an email to the Admin email via emailJS, and then send the user to the 
 * Success page after successfully sending the email to the Admin.
 * Author: Ben Le
 */

// Get references to the HTML elements
const imagesInput = document.getElementById("images");
const preview = document.querySelector(".preview");

// Holds the public ID(Key) of emailJS account
const publicKey = "Pn8eDSTRu9fiVDLQY";

// Holds the service ID of the service through which the email should be sent
const serviceID = "service_jelguak";

// Holds the template ID of the emailJS account, used for the format of the email sent
const templateID = "template_c6y1blp";

// Array to store images to be uploaded
let imageArray = [];

// Event listener for changes in the images input field
imagesInput.addEventListener("change", (event) => {
  // Get the list of selected files/images
  const fileList = event.target.files;

  // Populate the image array with selected files
  for (let element = 0; element < fileList.length; element++) {
    const item = fileList[element];
    imageArray.push(item);
  }

  // Display the selected images in the preview section
  displayImages();
});

/**
 * Function to retreive the information from the photo upload form, 
 * and send an email with that information to the admin account.
 * Author: Ben Le
 */
function sendMessage() {
  // Initialize EmailJS with the public key
  (function () {
    emailjs.init(publicKey);
  })();

  // Get user information from the form
  var params = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    media: document.querySelector("#media").value,
    images: document.querySelector("#images").value,
  };

  // Send an email using EmailJS
  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      // Redirect the user to the success page after successful photo submission
      location.replace("/Web/pages/success/photo_success.html");
    })
    .catch();
}

/**
 * Populate the preview section with the selected images.
 * Author: Agowun Muhammad Altaf (A00448118)
 */
function displayImages() {
  // Reset the preview section
  preview.innerHTML = null;

  // Loop through the images in the image array
  imageArray.forEach((img, i) => {
    // Create an img tag
    let image = document.createElement("img");

    // Set the src attribute of the img tag to the URL of the selected image
    image.src = URL.createObjectURL(img);

    // Remove the image after clicking on it and confirming
    image.addEventListener("click", () => {
      // Prompt the user for confirmation before removing the image

      // Remove the image from the image array
      imageArray.splice(i, 1);

      // Display the remaining images
      displayImages();
    });

    // Add the newly created img tag to the preview section
    preview.appendChild(image);
  });
}
