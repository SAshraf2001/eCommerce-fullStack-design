const axios = require('axios');

axios.get('https://ecommerce-fullstack-design-wfp9.onrender.com/api/products/featured/')
  .then(res => console.log('DATA:', res.data))
  .catch(err => {
    console.error('ERROR:', err.message);
    if (err.response) {
      console.error('STATUS:', err.response.status);
      console.error('DATA:', err.response.data);
    }
  });
