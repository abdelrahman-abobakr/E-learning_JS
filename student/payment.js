import { isLogin } from "../work/displayIfLogin.js";
isLogin();

const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

const courseName = getQueryParam('title');
const coursePrice = getQueryParam('price');
if (!courseName || !coursePrice) {
  console.error("Course data not found in localStorage.");
  alert("Course data not found. Please check your selection and try again.");
} else {

  // Store course data in localStorage for later use
  localStorage.setItem('courseName', courseName);
  localStorage.setItem('coursePrice', coursePrice);

  function renderPayPalButton() {
    paypal.Buttons({
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: coursePrice 
            },
            description: courseName
          }]
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          alert("Payment successful!");

          // Save payment status and details in localStorage
          const paymentData = {
            courseName: courseName,
            coursePrice: coursePrice,
            paymentStatus: 'Success',
            transactionId: details.id,  // Save the PayPal transaction ID
            payerName: details.payer.name.given_name, // Payer's name
            payerEmail: details.payer.email_address  // Payer's email
          };

          localStorage.setItem('paymentData', JSON.stringify(paymentData));

          setTimeout(function () {
            window.location.href = "/student/maincourses.html";
          }, 2000); // Redirect after 2 seconds
        });
      }
    }).render("#paypal-button-container");
  }

  renderPayPalButton();
}