let products = [];
let users = [];
let tasks = [];
let notifications = [];

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function showAddProductForm() {
    document.getElementById('add-product-form').classList.toggle('hidden');
}

document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    const originalPrice = parseFloat(document.getElementById('originalPrice').value);
    const expirationDate = document.getElementById('expirationDate').value;
    const stock = parseInt(document.getElementById('stock').value);

    const product = {
        productName,
        category,
        originalPrice,
        expirationDate,
        stock,
        discountedPrice: calculateDiscountedPrice(originalPrice, expirationDate)
    };

    products.push(product);
    updateProductList();
    document.getElementById('product-form').reset();
    showAddProductForm();
});

function calculateDiscountedPrice(originalPrice, expirationDate) {
    const today = new Date();
    const expiryDate = new Date(expirationDate);
    const daysToExpire = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    if (daysToExpire <= 2) {
        return originalPrice * 0.2;
    } else if (daysToExpire <= 5) {
        return originalPrice * 0.5;
    } else if (daysToExpire <= 6) {
        return originalPrice * 0.6;
    } else if (daysToExpire <= 7) {
        return originalPrice * 0.7;
    } else {
        return originalPrice;
    }
}

function updateProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const row = `
            <tr>
                <td>${product.productName}</td>
                <td>${product.category}</td>
                <td>$${product.originalPrice.toFixed(2)}</td>
                <td>$${product.discountedPrice.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>${product.expirationDate}</td>
                <td>
                    <button class="delete-btn" onclick="removeProduct(${index})">Remove</button>
                </td>
            </tr>
        `;
        productList.insertAdjacentHTML('beforeend', row);
    });
}

function removeProduct(index) {
    products.splice(index, 1);
    updateProductList();
}

// Directly use salesData loaded from salesData.js
const sales = salesData;
updateSalesList();

function updateSalesList() {
    const salesList = document.getElementById('sales-list');
    const totalSalesAmountElement = document.getElementById('total-sales-amount');
    const totalSalesAmountElement1 = document.getElementById('total-sales-amount1');
    const Total = document.getElementById('Total');

    if (!salesList || !totalSalesAmountElement) {
        console.error('Required elements not found.');
        return;
    }

    salesList.innerHTML = ''; // Clear current list
    let totalSales = 0; // Initialize total sales variable

    sales.forEach(sale => {
        totalSales += parseFloat(sale.totalPrice); // Add up total price

        const row = `
            <tr>
                <td>${sale.productName}</td>
                <td>${sale.quantity}</td>
                <td>$${sale.totalPrice.toFixed(2)}</td>
                <td>${sale.transactionDate}</td>
            </tr>
        `;
        salesList.insertAdjacentHTML('beforeend', row);
    });

    // Update total sales amount on the screen
    totalSalesAmountElement.textContent = totalSales.toFixed(2);
    Total.textContent ="$ "+ totalSales.toFixed(2);


    if (!salesList || !totalSalesAmountElement1) {
        console.error('Required elements not found.');
        return;
    }

    salesList.innerHTML = ''; // Clear current list
    let totalSales1 = 0; // Initialize total sales variable

    sales.forEach(sale => {
        totalSales1 += parseFloat(sale.totalPrice); // Add up total price

        const row = `
            <tr>
                <td>${sale.productName}</td>
                <td>${sale.quantity}</td>
                <td>$${sale.totalPrice.toFixed(2)}</td>
                <td>${sale.transactionDate}</td>
            </tr>
        `;
        salesList.insertAdjacentHTML('beforeend', row);
    });

    // Update total sales amount on the screen
    totalSalesAmountElement1.textContent = totalSales1.toFixed(2);
    Total.textContent ="$ "+ totalSales1.toFixed(2);
}



const customers = customersData;
updateCustomerList();

function updateCustomerList() {
    const customerList = document.getElementById('customer-list');
    const totalCustomersElement = document.getElementById('total-customers');

    if (!customerList || !totalCustomersElement) {
        console.error('Required elements not found.');
        return;
    }

    customerList.innerHTML = ''; // Clear current list
    let totalCustomers = 0; // Initialize total customers variable

    customers.forEach(customer => {
        totalCustomers++; // Count customers

        const row = `
            <tr>
                <td>${customer.userName}</td>
                <td>${customer.email}</td>
                <td>${customer.membership}</td>
            </tr>
        `;
        customerList.insertAdjacentHTML('beforeend', row);
    });

    // Update total customers count on the screen
    totalCustomersElement.textContent = totalCustomers; // No need for .toFixed(2)
}


function downloadTableAsExcel(tableId, filename) {
    const table = document.getElementById(tableId);
    const tableHTML = table.outerHTML.replace(/ /g, '%20');
    const dataType = 'application/vnd.ms-excel';

    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        const blob = new Blob(['\ufeff', tableHTML], { type: dataType });
        navigator.msSaveOrOpenBlob(blob, filename + '.xls');
    } else {
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        downloadLink.download = filename + '.xls';
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}

function showAddUserForm() {
    document.getElementById('add-user-form').classList.toggle('hidden');
}

document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    const user = { userName, email, role };
    users.push(user);
    updateUserList();

    document.getElementById('user-form').reset();
    showAddUserForm();
});

function updateUserList() {
    const userList = document.getElementById('user-list').querySelector('tbody');
    userList.innerHTML = ''; // Clear current list

    users.forEach(user => {
        const row = `
            <tr>
                <td>${user.userName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
            </tr>
        `;
        userList.insertAdjacentHTML('beforeend', row);
    });
}

function toggleTaskForm() {
    const form = document.getElementById('add-task-form');
    form.classList.toggle('hidden');
}

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskAssignee = document.getElementById('taskAssignee').value;
    const dueDate = document.getElementById('dueDate').value;

    const task = { taskName, taskAssignee, dueDate };
    tasks.push(task);
    updateTaskList();
    document.getElementById('task-form').reset();
    toggleTaskForm();
});

function updateTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear current list

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        taskElement.innerHTML = `
            <h4>${task.taskName}</h4>
            <p>Assignee: ${task.taskAssignee}</p>
            <p>Due Date: ${task.dueDate}</p>
            <button onclick="removeTask(${index})">Remove Task</button>
        `;
        taskList.appendChild(taskElement);
    });
}

function removeTask(index) {
    tasks.splice(index, 1);
    updateTaskList(); // Refresh the list
}




// Example to generate sales chart
function generateSalesChart() {
    const ctx = document.getElementById('sales-chart').getContext('2d');
    const sot = document.getElementById('analytics-sale1').getContext('2d');
    const ic = document.getElementById('analytics-sale2').getContext('2d');
    const wr = document.getElementById('analytics-sale3').getContext('2d');
    const cd = document.getElementById('Customer-Demographics1').getContext('2d');
    const sbr = document.getElementById('Sales-by-Region2').getContext('2d');
    const salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Sales',
                data: [5000, 7000, 8000, 6000, 9000, 10000, 11000],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Months'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Sales ($)'
                    }
                }
            }
        }
    });
    const asot = new Chart(sot, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Sales',
                data: [5000, 7000, 8000, 6000, 9000, 10000, 11000],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Months'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Sales ($)'
                    }
                }
            }
        }
    });
    const aic = new Chart(ic, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'inventory left',
                data: [9572, 7924, 8375, 6198, 7572, 7924, 6617],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Months'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'inventory '
                    }
                }
            }
        }
    });
    const awr = new Chart(wr, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'waste reduction',
                data: [5617, 7924, 8375, 8198, 9572, 10342, 12819],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Months'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'return on stock'
                    }
                }
            }
        }
    });
    new Chart(cd, {
        type: 'pie',
        data: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            datasets: [{
                data: [20, 35, 25, 10, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    new Chart(sbr, {
        type: 'bar',
        data: {
            labels: ['North', 'South', 'East', 'West'],
            datasets: [{
                label: 'Sales by Region',
                data: [40000, 35000, 50000, 45000],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sales ($)'
                    }
                }
            }
        }
    });
}




function updateTrends(previousSales, currentSales, previousProductsSold, currentProductsSold) {
    const salesTrend = document.getElementById('sales-trend');
    const productsSoldTrend = document.getElementById('products-sold-trend');

    // Calculate the percentage change in sales
    const salesDifference = currentSales - previousSales;
    const salesPercentageChange = ((salesDifference / previousSales) * 100).toFixed(2);

    // Calculate the percentage change in products sold
    const productsSoldDifference = currentProductsSold - previousProductsSold;
    const productsSoldPercentageChange = ((productsSoldDifference / previousProductsSold) * 100).toFixed(2);

    // Update sales trend
    if (salesDifference > 0) {
        salesTrend.textContent = `+${salesPercentageChange}%`;
        salesTrend.classList.add('trend-up');
        salesTrend.classList.remove('trend-down');
    } else {
        salesTrend.textContent = `${salesPercentageChange}%`;
        salesTrend.classList.add('trend-down');
        salesTrend.classList.remove('trend-up');
    }

    // Update products sold trend
    if (productsSoldDifference > 0) {
        productsSoldTrend.textContent = `+${productsSoldPercentageChange}%`;
        productsSoldTrend.classList.add('trend-up');
        productsSoldTrend.classList.remove('trend-down');
    } else {
        productsSoldTrend.textContent = `${productsSoldPercentageChange}%`;
        productsSoldTrend.classList.add('trend-down');
        productsSoldTrend.classList.remove('trend-up');
    }
}

// Example of adding notifications dynamically
function addNotification(message) {
    const notificationsList = document.getElementById('notifications-list');
    const listItem = document.createElement('li');
    listItem.textContent = message;
    notificationsList.appendChild(listItem);
}

function clearNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    notificationsList.innerHTML = '';
}

// Example of adding recent activities dynamically
function addActivity(activity) {
    const activitiesList = document.getElementById('activities-list');
    const listItem = document.createElement('li');
    listItem.textContent = activity;
    activitiesList.appendChild(listItem);
}

function refreshActivities() {
    const activitiesList = document.getElementById('activities-list');
    activitiesList.innerHTML = ''; // Clear existing activities
    // Add some fresh activities (you can replace this with real data fetching)
    addActivity('Restocked 200 items of Eggs.');
    addActivity('Processed 80 customer orders.');
}



function generateRevenueReport() {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Revenue & Loss Report", 10, 10);

    // Add content to the report
    doc.setFontSize(12);
    doc.text("Total Revenue: $500,000", 10, 20);
    doc.text("Total Losses: $50,000", 10, 30);

    // Save the report
    doc.save('revenue_report.pdf');
}

function generateInventoryReport() {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Inventory Report", 10, 10);

    // Add content to the report
    doc.setFontSize(12);
    doc.text("Total Inventory: 72,594 items", 10, 20);

    // Save the report
    doc.save('inventory_report.pdf');
}

function generateWasteReport() {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Waste Management Report", 10, 10);

    // Add content to the report
    doc.setFontSize(12);
    doc.text("Waste Reduction: 35%", 10, 20);

    // Save the report
    doc.save('waste_report.pdf');
}

function generateMainReport() {
    html2canvas(document.querySelector("#dashboard")).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        doc.text("Main Report", 10, 10);
        doc.addImage(imgData, 'PNG', 10, 20, 180, 160);
        doc.save('main_report.pdf');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateSalesList();
});







// Call these functions when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    generateSalesChart();
    updateTrends();
    addNotification('Restocked 500 items of Milk.');
    addActivity('50 orders were processed today.');
    refreshActivities();
    updateSalesList();
    updateCustomerList();
    updateProductList();
    updateUserList();
    updateTaskList();

});
