const addressController ={
    code: async(req,res)=>{
        try {
            const aa = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'POST', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
        const posts = await aa.json()
        res.status(200).json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
        
    }
}
module.exports = addressController;

// async function getStaticProps() {
//     const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'GET', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
//     const posts = await res.json()
//     console.log(posts)
// }
//   getStaticProps();