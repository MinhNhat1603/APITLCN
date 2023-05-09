// fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'GET', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
//   .then((response) => response.json())
//   .then((data) => {
//     //getProvince(data); // data là một object
//     // console.log(data)
//   }); 
// function my_async_fn() {
//     return fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'GET', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}}).then(response => {
//         console.log(response); // Logs the response
//     }).then((data) => { // data là một object
//             console.log(data)
//             return data;
//     });
// }
// var a= my_async_fn();
// console.log(a);

async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'GET', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
    const posts = await res.json()
    console.log(posts)
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    
  }
  getStaticProps()