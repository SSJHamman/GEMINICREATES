// Animate balance
let balance = 1245;
let current = 0;
let balanceElement = document.getElementById('balance');

function animateBalance() {
  if (current < balance) {
    current += Math.ceil((balance - current)/10);
    balanceElement.textContent = current + " 💎";
    setTimeout(animateBalance, 50);
  }
}

animateBalance();

// Optional: could add dynamic fake transactions
