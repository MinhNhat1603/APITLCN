fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'GET', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
  .then((response) => response.json())
  .then((data) => {
    getProvince(data); // data là một object
    // console.log(data)
  }); 
  function my_async_fn(url) {
    return fetch(url).then(response => {
        console.log(response); // Logs the response
        return response;
    });
)  