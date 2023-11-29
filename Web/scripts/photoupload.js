const imagesInput = document.getElementById("images");
const preview = document.querySelector(".preview");

const publicKey = "Pn8eDSTRu9fiVDLQY";
const serviceID = "service_jelguak";
const templateID = "template_c6y1blp";

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

function sendMessage() {
  (function () {
    emailjs.init(publicKey);
  })();

  var params = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    media: document.querySelector("#media").value,
    images: document.querySelector("#images").value,
  };

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      location.replace("/Web/pages/success/photo_success.html");
    })
    .catch();
}

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

      // remove the image from the image array
      imageArray.splice(i, 1);

      // display the images again after that image was removed
      displayImages();
    });

    // add the newly created img tag to the preview section
    preview.appendChild(image);
  });
}
