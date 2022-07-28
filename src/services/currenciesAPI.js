const requestCurrencies = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const currenciesResponse = await fetch(url);
  const currenciesData = await currenciesResponse.json();
  return currenciesData;
};

export default requestCurrencies;
