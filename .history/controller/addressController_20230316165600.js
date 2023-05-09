const addressController ={
    code: async(req,res)=>{
        try {
            const Address = req.body.address;    //lay Adress
            const address= Address.split(",");
            var t = address.length -1;
            var code = [];
            const Province = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'POST', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
            const dataProvince = await Province.json();           
            code[0] = getProvince(dataProvince, address,t);
            const District = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",{method: 'POST', body: JSON.stringify({"province_id": code[0]}),headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
            const dataDistrict = await District.json()
            code[1]=getDistrict(dataDistrict,address,t)
            res.status(200).json(code);
        } catch (error) {
            res.status(500).json(error);
        }        
    }
}
module.exports = addressController;

function getProvince(data, address,t){
    const province = data.data;
    var code =null;
    for(t; t > -1; t--) { 
        address[t]=address[t].trim();
        for( let i=0; i<province.length;i++){
            if(address[t] == province[i].ProvinceName){
                code=province[i].ProvinceID;
                break;
            }
            name =province[i].NameExtension;
            for(let j=0; j< name.length;j++){
                if(address[t] == name[j]){
                    code=province[i].ProvinceID
                    break
                }            
            }
            if(code != null){
                break
            }
        }
        if(code != null){
            break
        }
    }
    return code;
}
function getDistrict(data,address,t){   
    const distric= data.data;
    var code =null;
    for(t; t > -1; t--) { 
        address[t]=address[t].trim();
        for( let i=0; i<province.length;i++){
            if(address[t] == province[i].DistrictName){
                code=province[i].DistrictID;
                break;
            }
            name =province[i].NameExtension;
            for(let j=0; j< name.length;j++){
                if(address[t] == name[j]){
                    code=province[i].DistrictID
                    break
                }            
            }
            if(code != null){
                break
            }
        }
        if(code != null){
            break
        }
    }
    return code;
    
}
function getWard(data,address,t){
    const ward = data.data;
    var code;
    for(t; t > -1; t--) { 
        address[t]=address[t].trim();
        for( let i=0; i<ward.length;i++){
            if(address[t] == ward[i].WardName){
                code[2]=ward[i].WardCode;
                break;
            }
            name =ward[i].NameExtension;
            for(let j=0; j< name.length;j++){
                if(address[t] == name[j]){
                    code[2]=ward[i].WardCode;
                    break;
                }            
            }
            if(code[2] != null){
                break;
            }
        }
        if(code[2]!= null){
            break;
        }
    }
    return code;
}

