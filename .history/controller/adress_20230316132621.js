const { raw } = require("body-parser");

const Address ="01 Võ Văn Ngân, Bình Thọ, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam";
const address= Address.split(",");
var t = address.length -1;
fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'GET', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
  .then((response) => response.json())
  .then((data) => {
    getProvince(data); // data là một object
    // console.log(data)
  }); 
function getProvince(data){
    const province = data.data;
    var codeProvince= null;
    for(t; t > -1; t--) { 
        address[t]=address[t].trim();
        for( let i=0; i<province.length;i++){
            name =province[i].NameExtension;
            for(let j=0; j< name.length;j++){
                if(address[t] == name[j]){
                    codeProvince=province[i].ProvinceID
                    break
                }            
            }
            if(codeProvince != null){
                break
            }
        }
        if(codeProvince != null){
            break
        }
    }
    console.log(codeProvince);
    console.log(t);
    fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",{method: 'POST', body: JSON.stringify({"province_id": codeProvince}), 
    headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
    .then((response) => response.json())
    .then((data1) => {
        getDistrict(data1); // data là một object
    }); 
}
function getDistrict(data){
    const province = data.data;
    var codeProvince= null;
    for(t; t > -1; t--) { 
        address[t]=address[t].trim();
        for( let i=0; i<province.length;i++){
            name =province[i].NameExtension;
            for(let j=0; j< name.length;j++){
                if(address[t] == name[j]){
                    codeProvince=province[i].ProvinceID
                    break
                }            
            }
            if(codeProvince != null){
                break
            }
        }
        if(codeProvince != null){
            break
        }
    }
}
