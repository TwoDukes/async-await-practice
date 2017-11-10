const axios = require('axios');

/** 
 //Promise Version 
**/
const getExchangeRate = async(from, to) => {
    return axios.get(`https://api.fixer.io/latest?base=${from}`).then((res) => {
        return res.data.rates[to];
    });
};

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((res) => {
        return res.data.map((country) => country.name);
    });
};

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

//  convertCurrency('USD', 'EUR', 100).then((status) => {
//      console.log(status);
// }).catch((e) => {
//     console.log(e);
// });


/** 
 //Async-Await Version 
**/
const getExchangeRateAlt = async (from, to) => {
    try{
        const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
        return response.data.rates[to];
    }catch(e){
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }
};

const getCountriesAlt = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch(e) {
        throw new Error(`Unable to get countries that use ${currencyCode} currency code`)
    }
};

const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountriesAlt(to);
    const rate = await getExchangeRateAlt(from, to);
    const exchangedAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

convertCurrencyAlt('USD', 'EUR', 100).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
});
