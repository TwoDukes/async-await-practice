// USD CAD 23
// 23 USD is worth 28 CAD. You can spend these in the following countries: 

const axios = require('axios');

const getExchangeRate = (from, to) => {
    return axios.get(`https://api.fixer.io/latest?base=${from}`).then((res) => {
        return res.data.rates[to];
    });
};

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((res) => {
        return res.data.map((country) => country.name);
    });
};

//Promise Version
const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;
        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
    });
};


//Async-Await version
const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(from, to);
    const rate = await getExchangeRate(from, to);
    const exchangedAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

convertCurrencyAlt('USD', 'EUR', 100).then((status) => {
    console.log(status);
});

// getExchangeRate('USD', 'EUR').then((rate) => {
//     console.log(rate);
// });

// getCountries('USD').then((countries) => {
//     console.log(countries);
// });