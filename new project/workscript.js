const loginContainer = document.getElementById('loginContainer');
const dashboard = document.getElementById('dashboard');
const loginError = document.getElementById('loginError');

const products = [
  { name: "Paracetamol Drops", quantity: 25, price: 350 },
  { name: "Vitamin C Syrup", quantity: 15, price: 800 },
  { name: "Ibuprofen Tablets", quantity: 30, price: 600 },
  { name: "Cough Syrup", quantity: 10, price: 1200 },
];

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === 'agent' && password === '1234') {
    showDashboard('agent');
  } else if (username === 'admin' && password === 'admin123') {
    showDashboard('admin');
  } else {
    loginError.style.display = 'block';
  }
}

function showDashboard(role) {
  loginContainer.classList.add('hidden');
  dashboard.classList.remove('hidden');
  loginError.style.display = 'none';
  displayGoods();

  const adminSection = document.getElementById('adminSection');
  adminSection.style.display = role === 'admin' ? 'block' : 'none';
}

function displayGoods() {
  const goodsList = document.getElementById('goodsList');
  goodsList.innerHTML = '';

  if (products.length === 0) {
    goodsList.innerHTML = "<p>No goods available at the moment.</p>";
    return;
  }

  const table = document.createElement("table");
  const header = document.createElement("tr");

  ["Product", "Quantity", "Price (₦)"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    header.appendChild(th);
  });

  table.appendChild(header);

  products.forEach(p => {
    const row = document.createElement("tr");
    [p.name, p.quantity, `₦${p.price}`].forEach(val => {
      const td = document.createElement("td");
      td.textContent = val;
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  goodsList.appendChild(table);
}
// Notification Form Submission Logic
const notificationForm = document.getElementById('notificationForm');
const notificationText = document.getElementById('notificationText');
const notificationsList = document.getElementById('notificationsList'); // Notifications list in the "Notifications" section

notificationForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get the notification text
  const notification = notificationText.value.trim();

  if (notification) {
    // Create a new list item for the notification
    const listItem = document.createElement('li');
    listItem.textContent = notification;

    // Append the notification to the notifications list
    notificationsList.appendChild(listItem);

    // Clear the input field
    notificationText.value = '';

    // Optionally, show a success message to the admin
    alert('Notification posted successfully!');
  }
});

// Sales Record submission logic
const form = document.getElementById('saleForm');
const successMessage = document.getElementById('successMessage');
const receiptSection = document.getElementById('receiptSection');
const receiptContent = document.getElementById('receiptContent');

form.addEventListener('submit', function (e) {
e.preventDefault();

// Get form data
const goods = document.getElementById('goods').value;
const price = document.getElementById('price').value;
const customer = document.getElementById('customer').value;
const address = document.getElementById('address').value;
const phone = document.getElementById('phone').value;

// Generate receipt content
receiptContent.innerHTML = `
<p><strong>Goods Bought:</strong> ${goods}</p>
<p><strong>Price Sold:</strong> ₦${price}</p>
<p><strong>Customer Name:</strong> ${customer}</p>
<p><strong>Customer Address:</strong> ${address}</p>
<p><strong>Phone Number:</strong> ${phone}</p>
<p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
`;

// Show success message and receipt section
successMessage.style.display = 'block';
receiptSection.classList.remove('hidden');

// Reset form
form.reset();

// Hide success message after 3 seconds
setTimeout(() => {
successMessage.style.display = 'none';
}, 3000);
});

function printReceipt() {
    const receiptContent = document.getElementById('receiptContent').innerHTML;

    // Open a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              background-color: #f4f4f9;
              color: #333;
            }
            h3 {
              text-align: center;
              color: #6200ea;
              margin-bottom: 20px;
            }
            .receipt-container {
              position: relative;
              border: 2px solid #6200ea;
              border-radius: 10px;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .receipt-container p {
              margin: 10px 0;
              font-size: 16px;
              line-height: 1.5;
            }
            .receipt-container p strong {
              color: #6200ea;
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 50px;
              color: rgba(98, 0, 234, 0.1); /* Light purple with transparency */
              white-space: nowrap;
              pointer-events: none;
              z-index: -1;
            }
          </style>
        </head>
        <body>
          <h3>AA MAILAFIYA Pharmacy Receipt</h3>
          <div class="receipt-container">
            <div class="watermark">AA MAILAFIYA Pharmacy</div>
            ${receiptContent}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
}