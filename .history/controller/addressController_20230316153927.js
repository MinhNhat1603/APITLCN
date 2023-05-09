const addressController ={
    codeA: async(req,res)=>{

    }
}
module.exports = addressController

async function getStaticProps() {
    const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'GET', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
    const posts = await res.json()
    console.log(posts)
}
  getStaticProps();