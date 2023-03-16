con=fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'GET', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
  .then((response) => response.json())
  .then((data) => console.log(data));
const t=tinh.data;
const a ="01 Võ Văn Ngân, Bình Thọ, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam";
const b= a.split(",");
// var i = b.length -1;
// for(i; i > -1; i--) {
//     b[i]=b[i].trim();
//     if(Object.is(b[i], "Vietnam")){
//         continue
//     }
//     else{
//         console.log(b[i]);
//     }
// }
hcm = b[3].trim();
for( let i=0; i<t.length;i++){
    name =t[i].NameExtension;
    var d=0;
    for(let j=0; j< name.length;j++){
        if(hcm == name[j]){
            d=1;
        }            
    }
    if(d==1){
        var codet=t[i].ProvinceID;
        break
    }
}
aa=fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'GET', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
  .then((response) => response.json())
  .then((data) => console.log(data));
console.log(aa)
console.log(b.length);