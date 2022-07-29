const getCurrencies = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const currenciesResponse = await fetch(url);
  const currenciesData = currenciesResponse.json();
  return currenciesData;
};

export default getCurrencies;
