const Address ="01 Võ Văn Ngân,P. Bình Thọ, TP. Thủ Đức, Thành phố Hồ Chí Minh, Vietnam";
const address= Address.split(",");
var t = address.length -1;
var code =null;
fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'GET', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
  .then((response) => response.json())
  .then((data) => {
    getProvince(data); // data là một object
    // console.log(data)
  }); 
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
    console.log(code);
    console.log(t);
    fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",{method: 'POST', body: JSON.stringify({"province_id": code[0]}), 
    headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
    .then((response) => response.json())
    .then((data1) => {
        getDistrict(data1,code); // data là một object
        //console.log(data1)
    }); 
}
function getDistrict(data,code){
    const district = data.data;
    var codeDistrict= null;
    for(t; t > -1; t--) { 
        address[t]=address[t].trim();
        for( let i=0; i<district.length;i++){
            if(address[t] == district[i].DistrictName){
                codeDistrict=district[i].DistrictID;
                break;
            }
            name =district[i].NameExtension;
            for(let j=0; j< name.length;j++){
                if(address[t] == name[j]){
                    codeDistrict=district[i].DistrictID;
                    break;
                }            
            }
            if(codeDistrict != null){
                break;
            }
        }
        if(codeDistrict != null){
            break;
        }
    }
    console.log(codeDistrict);
    console.log(t);
    fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",{method: 'POST', body: JSON.stringify({"district_id": codeDistrict}), 
    headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
    .then((response) => response.json())
    .then((data1) => {
        getWard(data1); // data là một object
    }); 
}
function getWard(data){
    const ward = data.data;
    var codeWard= null;
    for(t; t > -1; t--) { 
        address[t]=address[t].trim();
        for( let i=0; i<ward.length;i++){
            if(address[t] == ward[i].WardName){
                codeWard=ward[i].WardCode;
                break;
            }
            name =ward[i].NameExtension;
            for(let j=0; j< name.length;j++){
                if(address[t] == name[j]){
                    codeWard=ward[i].WardCode;
                    break;
                }            
            }
            if(codeWard != null){
                break;
            }
        }
        if(codeWard != null){
            break;
        }
    }
    console.log(t);
}

