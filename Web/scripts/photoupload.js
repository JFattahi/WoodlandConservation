// Get references to the HTML elements
const imagesInput = document.getElementById("images");
const preview = document.querySelector(".preview");

// EmailJS configuration
const publicKey = "Pn8eDSTRu9fiVDLQY";
const serviceID = "service_jelguak";
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

// Function to send a message using EmailJS
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
