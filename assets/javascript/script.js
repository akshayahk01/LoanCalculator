document.getElementById('loan-form').addEventListener('submit', function (e) {
    e.preventDefault(); 
    document.getElementById('results').style.display = "none";
    document.getElementById('loading').style.display = "block";


    setTimeout(() => calculate(), 2000);
});

function calculate() {
    
    const amount = document.getElementById('loan_amount');
    const interest = document.getElementById('interest_rate');
    const years = document.getElementById('years');
    const monthly_payment = document.getElementById('monthly_payment');
    const total_amount_paid = document.getElementById('total_amount_paid');
    const total_interest = document.getElementById('total_interest');

    
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    
    if (isNaN(principal) || isNaN(calculatedInterest) || isNaN(calculatedPayments) || principal <= 0 || calculatedPayments <= 0) {
        showAlert('Please enter valid numbers for loan amount, interest rate, and years.');
        document.getElementById('loading').style.display = "none";
        return;
    }

    
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthly_payment.value = monthly.toFixed(2);
        total_amount_paid.value = (monthly * calculatedPayments).toFixed(2);
        total_interest.value = (monthly * calculatedPayments - principal).toFixed(2);

        document.getElementById('results').style.display = "block";
    } else {
        showAlert('Calculation error. Please check your input values.');
    }

    
    document.getElementById('loading').style.display = "none";
}

function showAlert(error) {

    if (document.querySelector('.alert')) return;

    const errorDiv = document.createElement('div');
    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);


    setTimeout(() => {
        if (document.querySelector('.alert')) {
            document.querySelector('.alert').remove();
        }
    }, 3000);
}
