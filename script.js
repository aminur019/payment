 // --- Menu Toggle Functionality ---
 const menuToggle = document.getElementById('menu-toggle');
 const menu = document.querySelector('.menu');
 // Toggle menu visibility and cross icon
 menuToggle.addEventListener('click', () => {
   menu.classList.toggle('active');
   menuToggle.classList.toggle('active');
 });
 // --- Modal Functionality ---
 var modal = document.getElementById("myModal");
 var btn = document.getElementById("openModalBtn");
 var span = document.getElementById("closeModalBtn");
 // Open modal when button is clicked
 btn.onclick = function() {
   modal.style.display = "block";
 }
 // Close modal when 'x' is clicked
 span.onclick = function() {
   modal.style.display = "none";
 }
 // Close modal if clicked outside
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 };
 // --- Payment Popup Functionality ---
 document.querySelector('.addpayment-new-method').addEventListener('click', function() {
   document.getElementById('addpayment-payment-popup').style.display = 'flex';
 });
 document.querySelector('.addpayment-close-modal').addEventListener('click', function() {
   document.getElementById('addpayment-payment-popup').style.display = 'none';
 });
 // Handle dynamic fields based on payment method type
 document.getElementById('addpayment-payment-type').addEventListener('change', function() {
   const selectedType = this.value;
   const creditCardFields = document.getElementById('addpayment-credit-card-fields');
   const paypalFields = document.getElementById('addpayment-paypal-fields');
   const bankTransferFields = document.getElementById('addpayment-bank-transfer-fields');
   // Show/Hide the relevant fields based on the selected payment method
   if (selectedType === 'credit-card') {
     creditCardFields.style.display = 'block';
     paypalFields.style.display = 'none';
     bankTransferFields.style.display = 'none';
   } else if (selectedType === 'paypal') {
     creditCardFields.style.display = 'none';
     paypalFields.style.display = 'block';
     bankTransferFields.style.display = 'none';
   } else if (selectedType === 'bank-transfer') {
     creditCardFields.style.display = 'none';
     paypalFields.style.display = 'none';
     bankTransferFields.style.display = 'block';
   }
 });
 // Handle the form submission
 document.getElementById('addpayment-payment-form').addEventListener('submit', function(e) {
   e.preventDefault();
   const formData = {
     paymentType: document.getElementById('addpayment-payment-type').value,
     cardNumber: document.getElementById('addpayment-card-number')?.value || '',
     expiryDate: document.getElementById('addpayment-expiry-date')?.value || '',
     cvv: document.getElementById('addpayment-cvv')?.value || '',
     cardholderName: document.getElementById('addpayment-cardholder-name')?.value || '',
     emailAddress: document.getElementById('addpayment-email-address')?.value || '',
     accountHolderName: document.getElementById('addpayment-account-holder-name')?.value || '',
     bankName: document.getElementById('addpayment-bank-name')?.value || '',
     accountNumber: document.getElementById('addpayment-account-number')?.value || '',
     routingNumber: document.getElementById('addpayment-routing-number')?.value || '',
     country: document.getElementById('addpayment-country')?.value || '',
     city: document.getElementById('addpayment-city')?.value || '',
     billingAddress: document.getElementById('addpayment-billing-address').value,
     savePaymentMethod: document.getElementById('addpayment-save-payment-method').checked
   };
   console.log('Payment Method Data:', formData);
   // Close the popup after submitting
   document.getElementById('addpayment-payment-popup').style.display = 'none';
 });
 // --- Close Button Functionality ---
 document.getElementById('closeButton').addEventListener('click', function() {
   document.getElementById('myDiv').style.display = 'none';
 });
 // --- Dynamic Span Data Type Logging ---
 document.querySelectorAll('span').forEach(span => {
   const dataType = span.dataset.type; // Access the data-type value
   console.log(`Span ID: ${span.id}, Data Type: ${dataType}`);
 });
 // --- Total Calculation Functionality ---
 function calculateTotal() {
   const priceElement = document.getElementById('editable-price');
   const deliveryElement = document.getElementById('editable-delevery');
   const discountElement = document.getElementById('editable-discount');
   const couponRow = document.getElementById('cupon-dis');
   // Extract values based on `data-type`
   const price = parseFloat(priceElement.textContent.trim()) || 0;
   const delivery = parseFloat(deliveryElement.textContent.trim()) || 0;
   let discount = 0;
   // Calculate discount dynamically if coupon row is visible
   if (!couponRow.classList.contains('dis-none')) {
     discount = price * 0.05; // 5% of the price
     discountElement.textContent = discount.toFixed(2); // Set as plain number
   }
   const total = price + delivery - discount;
   document.getElementById('total').textContent = total.toFixed(2); // Set as plain number
 }
 // --- Enable Editing Functionality ---
 function enableEditing() {
   document.querySelectorAll('.edit-icon').forEach(icon => {
     icon.addEventListener('click', function() {
       const targetId = this.getAttribute('data-edit-target');
       const targetElement = document.getElementById(targetId);
       if (!targetElement) return;
       const currentContent = targetElement.textContent.trim();
       const dataType = targetElement.getAttribute('data-type');
       // Create an input field for editing
       const input = document.createElement('input');
       input.type = 'text';
       input.className = 'editable-input';
       input.value = currentContent;
       // Replace the target element with the input
       targetElement.parentNode.replaceChild(input, targetElement);
       // Focus on the input field
       input.focus();
       // Save the edited content on blur or Enter key
       const saveContent = () => {
         const newContent = input.value.trim();
         if (newContent) {
           if (dataType === 'number') {
             targetElement.textContent = parseFloat(newContent) || 0; // Set as plain number
           } else {
             targetElement.textContent = newContent; // Set as plain text
           }
         }
         input.parentNode.replaceChild(targetElement, input);
         calculateTotal(); // Recalculate the total after editing
       };
       input.addEventListener('blur', saveContent);
       input.addEventListener('keydown', function(e) {
         if (e.key === 'Enter') {
           saveContent();
         }
       });
     });
   });
 }
 // --- Coupon Validation ---
 document.getElementById('add-coupon').addEventListener('click', function() {
   const validCoupon = 'aminur';
   const userInput = document.getElementById('coupon-code').value.trim();
   const messageElement = document.getElementById('message');
   const discountRow = document.getElementById('cupon-dis');
   const deliveryRow = document.getElementById('delivery-row');
   // Reset message and hide discount initially
   messageElement.textContent = '';
   messageElement.classList.remove('valid', 'invalid');
   discountRow.classList.add('dis-none');
   deliveryRow.classList.add('button-padding');
   // Validate coupon code
   if (userInput === validCoupon) {
     messageElement.textContent = 'Valid coupon code!';
     messageElement.classList.add('valid');
     discountRow.classList.remove('dis-none');
     discountRow.classList.add('button-padding');
     deliveryRow.classList.remove('button-padding');
     calculateTotal(); // Recalculate total with discount
   } else {
     messageElement.textContent = 'Invalid coupon code. Please try again.';
     messageElement.classList.add('invalid');
     calculateTotal();
   }
 });
 // Initialize the functionality
 enableEditing();
 calculateTotal();