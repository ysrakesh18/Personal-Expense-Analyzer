let expenses = [];


// Load saved expenses from browser

window.onload = function () {

    const savedExpenses = localStorage.getItem("expenses");

    if (savedExpenses) {

        expenses = JSON.parse(savedExpenses);

    }

    displayExpenses();

    updateSummary();

    displayCategoryAnalysis();

};


// Add Expense

function addExpense() {

    const name =
        document.getElementById("expenseName").value.trim();

    const amount =
        document.getElementById("expenseAmount").value;

    const category =
        document.getElementById("expenseCategory").value;

    const date =
        document.getElementById("expenseDate").value;


    // Validation

    if (!name || !amount || !category || !date) {

        alert("Please fill all the fields.");

        return;

    }


    const expense = {

        id: Date.now(),

        name: name,

        amount: Number(amount),

        category: category,

        date: date

    };


    expenses.push(expense);


    // Save to browser

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    // Clear inputs

    document.getElementById("expenseName").value = "";

    document.getElementById("expenseAmount").value = "";

    document.getElementById("expenseCategory").value = "";

    document.getElementById("expenseDate").value = "";


    displayExpenses();

    updateSummary();

    displayCategoryAnalysis();

}


// Display Expenses

function displayExpenses() {

    const container =
        document.getElementById("expenses");

    const filter =
        document.getElementById("filter").value;


    container.innerHTML = "";


    let filteredExpenses = expenses;


    if (filter !== "All") {

        filteredExpenses =
            expenses.filter(
                expense => expense.category === filter
            );

    }


    if (filteredExpenses.length === 0) {

        container.innerHTML = `
            <p class="empty">
                No expenses found.
            </p>
        `;

        return;

    }


    filteredExpenses.forEach(expense => {

        const div =
            document.createElement("div");

        div.className = "expense-item";


        div.innerHTML = `

            <div>

                <div class="expense-name">

                    ${getIcon(expense.category)}
                    ${expense.name}

                </div>

                <div class="expense-details">

                    ${expense.category}
                    •
                    ${expense.date}

                </div>

            </div>


            <div>

                <span class="expense-amount">

                    ₹${expense.amount.toFixed(2)}

                </span>


                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})"
                >

                    Delete

                </button>

            </div>

        `;


        container.appendChild(div);

    });

}


// Delete Expense

function deleteExpense(id) {

    const confirmation =
        confirm("Delete this expense?");


    if (!confirmation) {
        return;
    }


    expenses =
        expenses.filter(
            expense => expense.id !== id
        );


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    displayExpenses();

    updateSummary();

    displayCategoryAnalysis();

}


// Update Summary

function updateSummary() {

    const total =
        expenses.reduce(
            (sum, expense) =>
                sum + expense.amount,
            0
        );


    const count = expenses.length;


    const average =
        count > 0
            ? total / count
            : 0;


    document.getElementById("total").textContent =
        `₹${total.toFixed(2)}`;


    document.getElementById("count").textContent =
        count;


    document.getElementById("average").textContent =
        `₹${average.toFixed(2)}`;

}


// Category Analysis

function displayCategoryAnalysis() {

    const container =
        document.getElementById("categoryAnalysis");


    container.innerHTML = "";


    if (expenses.length === 0) {

        container.innerHTML =
            "<p>No data available.</p>";

        return;

    }


    const categories = {};


    expenses.forEach(expense => {

        if (!categories[expense.category]) {

            categories[expense.category] = 0;

        }

        categories[expense.category] +=
            expense.amount;

    });


    const total =
        expenses.reduce(
            (sum, expense) =>
                sum + expense.amount,
            0
        );


    Object.keys(categories).forEach(category => {

        const amount =
            categories[category];


        const percentage =
            (amount / total) * 100;


        const row =
            document.createElement("div");

        row.className = "category-row";


        row.innerHTML = `

            <div class="category-info">

                <span>
                    ${getIcon(category)}
                    ${category}
                </span>

                <span>
                    ₹${amount.toFixed(2)}
                    (${percentage.toFixed(1)}%)
                </span>

            </div>


            <div class="progress">

                <div
                    class="progress-bar"
                    style="width: ${percentage}%"
                ></div>

            </div>

        `;


        container.appendChild(row);

    });

}


// Category Icons

function getIcon(category) {

    const icons = {

        Food: "🍔",

        Travel: "🚗",

        Shopping: "🛍️",

        Education: "📚",

        Entertainment: "🎬",

        Other: "📦"

    };


    return icons[category] || "💰";

}