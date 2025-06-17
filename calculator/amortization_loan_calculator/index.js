document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results
  document.getElementById('results').style.display = 'none';
  
  // Show loader
  document.getElementById('loading').style.display = 'block';
  
  setTimeout(calculateResults, 1000);
  
  e.preventDefault();
});

function calculateResults() {
  // UI Variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  const scheduleBody = document.getElementById('schedule-body');

  // Parse input values
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Generate amortization schedule
    generateSchedule(principal, calculatedInterest, monthly, calculatedPayments);

    // Show results
    document.getElementById('results').style.display = 'block';
  } else {
    showError('Please check your numbers');
  }

  // Hide loader
  document.getElementById('loading').style.display = 'none';
}

function generateSchedule(principal, monthlyInterest, monthlyPayment, totalPayments) {
  let balance = principal;
  const scheduleBody = document.getElementById('schedule-body');
  
  // Clear previous schedule
  scheduleBody.innerHTML = '';

  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = balance * monthlyInterest;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;

    // Create table row
    const row = document.createElement('tr');
    
    // Add cells
    row.innerHTML = `
      <td>${i}</td>
      <td>$${monthlyPayment.toFixed(2)}</td>
      <td>$${principalPayment.toFixed(2)}</td>
      <td>$${interestPayment.toFixed(2)}</td>
      <td>$${Math.abs(balance).toFixed(2)}</td>
    `;
    
    scheduleBody.appendChild(row);
  }
}

function showError(error) {
  // Hide results and loader
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';

  // Create error div
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  const card = document.querySelector('.calculator');
  const heading = document.querySelector('h1');
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}