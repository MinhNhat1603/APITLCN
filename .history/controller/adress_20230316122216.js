const Address ="01 Võ Văn Ngân, Bình Thọ, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam";
const address= Address.split(",");
var t = address.length -1;
fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'GET', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
  .then((response) => response.json())
  .then((data) => {
    getADistrict(data); // data là một object
  }); 
function getADistrict(data){
    const district = data.data;
    var codeDistrict= null;
    for(t; t > -1; t--) { 
        address[t]=address[t].trim();
        for( let i=0; i<district.length;i++){
            name =district[i].NameExtension;
            for(let j=0; j< name.length;j++){
                if(address[t] == name[j]){
                    codeDistrict=district[i].ProvinceID
                    break
                }            
            }
            if(codeDistrict != null){
                break
            }
        }
        if(codeDistrict != null){
            break
        }
    }
    console.log(codeDistrict);
    return codeDistrict
}
console
// hcm = aaddress[3].trim();

// console.log(atinh)
// console.log(b.length);