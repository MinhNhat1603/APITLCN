const addressController ={
    code: async(req,res)=>{
        try {
            const adress = new product(req.body);
            const province = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'POST', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
            const data = await aa.json()
            code=getProvince(data);
            res.status(200).json(code);
        } catch (error) {
            res.status(500).json(error);
        }        
    }
}
module.exports = addressController;

function getProvince(data){
    const province = data.data;
    var code =[];
    for(t; t > -1; t--) { 
        address[t]=address[t].trim();
        for( let i=0; i<province.length;i++){
            if(address[t] == province[i].ProvinceName){
                code[0]=province[i].ProvinceID;
                break;
            }
            name =province[i].NameExtension;
            for(let j=0; j< name.length;j++){
                if(address[t] == name[j]){
                    code[0]=province[i].ProvinceID
                    break
                }            
            }
            if(code[0] != null){
                break
            }
        }
        if(code[0] != null){
            break
        }
    }
    return code;
    // fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",{method: 'POST', body: JSON.stringify({"province_id": code[0]}), 
    // headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
    // .then((response) => response.json())
    // .then((data1) => {
    //     getDistrict(data1,code); // data là một object
    //     //console.log(data1)
    // }); 
}
