/**
 * Purpose: This JavaScript will retreive the user information from the contact form
 * Send an email to the Admin email via emailJS, and then send the user to the 
 * Success page after successfully sending the email to the Admin.
 * Author: Anonymous
 */

// Holds the public ID(Key) of emailJS account
const publicKey = "Pn8eDSTRu9fiVDLQY";

// Holds the service ID of the service through which the email should be sent
const serviceID = "service_jelguak";

// Holds the template ID of the emailJS account, used for the format of the email sent
const templateID = "template_3ewd6wh";

/**
 * Function to retreive the information from the contact form, 
 * and send an email with that information to the admin account.
 * Author: Anonymous
 */
function sendMessage() {
  // Initializes emailJS with the public key
  (function () {
    emailjs.init(publicKey);
  })();

  // Holds the user information from the contact form to be sent by email
  var userInfo = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    phone: document.querySelector("#phone").value,
    message: document.querySelector("#message").value,
  };

  // Sends the email using serviceID, templateID, and user Information
  emailjs
    .send(serviceID, templateID, userInfo)
    .then((res) => { // After successfully sending the email, send user to success page
      location.replace("/Web/pages/success/contact_success.html");
    })
    .catch();
}
