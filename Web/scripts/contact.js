const publicKey = "Pn8eDSTRu9fiVDLQY";
const serviceID = "service_jelguak";
const templateID = "template_3ewd6wh";

function sendMessage() {
  (function () {
    emailjs.init(publicKey);
  })();

  var params = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    phone: document.querySelector("#phone").value,
    message: document.querySelector("#message").value,
  };

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      location.replace("/Web/pages/success/contact_success.html");
    })
    .catch();
}
