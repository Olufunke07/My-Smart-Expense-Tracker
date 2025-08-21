const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");
const totalAmountEl = document.getElementById("totalAmount");

let total = 0;
let expenses = [];

// Chart.js setup
const ctx = document.getElementById("expenseChart").getContext("2d");
let expenseChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Expenses ($)",
        data: [],
        backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind blue
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  },
});

// Add expense function
addExpenseBtn.addEventListener("click", () => {
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (name === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid name and amount.");
    return;
  }

  // Update state
  expenses.push({ name, amount });
  total += amount;

  // Update list
  const li = document.createElement("li");
  li.textContent = `${name}: $${amount}`;
  li.classList.add("border-b", "pb-1");
  expenseList.appendChild(li);

  // Update total
  totalAmountEl.textContent = total.toFixed(2);

  // Update chart
  expenseChart.data.labels.push(name);
  expenseChart.data.datasets[0].data.push(amount);
  expenseChart.update();

  // Reset input
  expenseNameInput.value = "";
  expenseAmountInput.value = "";
});
