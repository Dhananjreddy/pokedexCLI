import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

console.log('Testing with DNS fix...');
fetch('https://pokeapi.co/api/v2/location-area')
  .then(response => {
    console.log('Success! Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Got', data.results.length, 'locations');
  })
  .catch(error => {
    console.log('Failed:', error.message);
  });
