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
            if(code[0]==null){
                res.status(404).json("Sai thông tin tỉnh!")
            }
            const District = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",{method: 'POST', body: JSON.stringify({"province_id": code[0]}),headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
            const dataDistrict = await District.json()
            code[1]=getDistrict(dataDistrict,address,t)
            if(code[1]==null){
                res.status(404).json("Sai thông tin quận, huyện!")
            }
            const Ward = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",{method: 'POST', body: JSON.stringify({"district_id": code[1]}),headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
            const dataWard = await Ward.json()
            code[2]=getWard(dataWard,address,t)
            if(code[2]==null){
                res.status(404).json("Sai thông tin phường, xã!")
            }
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
    const district = data.data;
    var code =null;
    for(t; t > -1; t--) { 
        address[t]=address[t].trim();
        for( let i=0; i<district.length;i++){
            if(address[t] == district[i].DistrictName){
                code=district[i].DistrictID;
                break;
            }
            name =district[i].NameExtension;
            for(let j=0; j< name.length;j++){
                if(address[t] == name[j]){
                    code=district[i].DistrictID
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
    var code =null;
    for(t; t > -1; t--) { 
        address[t]=address[t].trim();
        for( let i=0; i< ward.length;i++){
            if(address[t] == ward[i].WardName){
                code=ward[i].WardCode;
                break;
            }
            name =ward[i].NameExtension;
            for(let j=0; j< name.length;j++){
                if(address[t] == name[j]){
                    code=ward[i].WardCode
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
function shippingCharges(code){
    
}

