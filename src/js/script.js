// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const amountSendInput = document.getElementById('amount-send');
    const amountReceiveInput = document.getElementById('amount-receive');
    const currencySendSelect = document.getElementById('currency-send');
    const currencyReceiveSelect = document.getElementById('currency-receive');
    const swapButton = document.getElementById('swap-currencies');
    const conversionForm = document.getElementById('conversion-form');

    // Event listener for form submission
    conversionForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const amountSend = parseFloat(amountSendInput.value);
        const currencySend = currencySendSelect.value;
        const currencyReceive = currencyReceiveSelect.value;

        if (isNaN(amountSend) || amountSend <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        try {
            const exchangeRate = await fetchExchangeRate(currencySend, currencyReceive);
            const amountReceive = (amountSend * exchangeRate).toFixed(2);
            amountReceiveInput.value = amountReceive;
        } catch (error) {
            alert('Error fetching exchange rate. Please try again.');
        }
    });

    // Event listener for swapping currencies
    swapButton.addEventListener('click', () => {
        const tempCurrency = currencySendSelect.value;
        currencySendSelect.value = currencyReceiveSelect.value;
        currencyReceiveSelect.value = tempCurrency;
        amountSendInput.value = '';
        amountReceiveInput.value = '';
    });

    // Function to fetch exchange rate
    async function fetchExchangeRate(currencySend, currencyReceive) {
        const apiKey = 'your_api_key_here';
        const url = `https://api.exchangerate-api.com/v4/latest/${currencySend}`;
        const response = await fetch(url);
        const data = await response.json();
        const exchangeRate = data.rates[currencyReceive];
        if (!exchangeRate) {
            throw new Error('Exchange rate not found.');
        }
        return exchangeRate;
    }
});
