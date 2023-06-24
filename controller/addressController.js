const fetch = require('node-fetch');

const addressController ={
    code: async(req,res)=>{
        try {
            const Address = req.query.address;    //lay Adress
            var tt_value = req.query.total;     //lay gia tri don hang
            var quantity = req.query.quantity;
            tt_value = parseInt(tt_value);
            quantity = parseInt( quantity)*200;
            const address= Address.split(",");
            var t = address.length -1;
            var code = [];
            const Province = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'POST', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
            const dataProvince = await Province.json();           
            code[0] = getProvince(dataProvince, address,t);
            if(code[0]==null){
                res.status(404).json("Sai thông tin tỉnh!")
            }
            const District = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
            {method: 'POST', body: JSON.stringify({"province_id": code[0]}),
            headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
            const dataDistrict = await District.json()
            code[1]=getDistrict(dataDistrict,address,t)
            if(code[1]==null){
                res.status(404).json("Sai thông tin quận, huyện!")
            }
            const Ward = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
            {method: 'POST', body: JSON.stringify({"district_id": code[1]}),
            headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
            const dataWard = await Ward.json()
            code[2]=getWard(dataWard,address,t)
            if(code[2]==null){
                res.status(404).json("Sai thông tin phường, xã!")
            }
            const Service = await fetch("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
            {method: 'POST', body: JSON.stringify({"shop_id": 3912285, "from_district": 1542 , "to_district": 1542}), 
            headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
            const dataService = await Service.json();
            var service = dataService.data;
            var shippingFee =[];
            for ( let i = 0; i< service.length; i++){
                var ShippingFee = await fetch("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                {method: 'POST', body: JSON.stringify({"service_type_id":service[i].service_type_id, "insurance_value":tt_value, "coupon": null, "from_district_id":1542, 
                "to_district_id":code[1], "to_ward_code":code[2],  "height":2, "length":30, "weight":quantity, "width":20}), 
                headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
                a = await ShippingFee.json();
                if( a.data!=null){
                    a.data.short_name= service[i].short_name;
                    shippingFee[i] = a.data;
                }
            }
            
            res.status(200).json(shippingFee.filter(a => a !== null));
        } catch (error) {
            res.status(500).json(error);
        }        
    },
    codeProvince: async(req,res)=>{
        try {
            const Province = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{method: 'POST', headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22"}})
            var dataProvince = await Province.json();
            dataProvince = dataProvince.data;
            for ( let i = 0; i< dataProvince.length; i++){
                delete dataProvince[i].CountryID;
                delete dataProvince[i].Code;
                delete dataProvince[i].Status;
                delete dataProvince[i].CanUpdateCOD;
                delete dataProvince[i].UpdatedAt;
                delete dataProvince[i].CreatedAt;
                delete dataProvince[i].UpdatedBy;
                delete dataProvince[i].RegionCPN;
                delete dataProvince[i].RegionID;
                delete dataProvince[i].IsEnable;
                delete dataProvince[i].NameExtension;
            }
            res.status(200).json(dataProvince);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    codeDistrict: async(req,res)=>{
        try {
            const province_id= req.body.province_id;
            const District = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
            {method: 'POST', body: JSON.stringify({"province_id": province_id}),
            headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
            var dataDistrict = await District.json();
            dataDistrict = dataDistrict.data;
            for ( let i = 0; i< dataDistrict.length; i++){
                delete dataDistrict[i].ProvinceID;
                delete dataDistrict[i].Code;
                delete dataDistrict[i].Type;
                delete dataDistrict[i].UpdatedDate;
                delete dataDistrict[i].UpdatedSource;
                delete dataDistrict[i].UpdatedEmployee;
                delete dataDistrict[i].UpdatedIP;
                delete dataDistrict[i].OnDates;
                delete dataDistrict[i].ReasonMessage;
                delete dataDistrict[i].ReasonCode;
                delete dataDistrict[i].WhiteListDistrict;
                delete dataDistrict[i].WhiteListClient;
                delete dataDistrict[i].DeliverType;
                delete dataDistrict[i].PickType;
                delete dataDistrict[i].Status;
                delete dataDistrict[i].CanUpdateCOD;
                delete dataDistrict[i].UpdatedAt;
                delete dataDistrict[i].CreatedAt;
                delete dataDistrict[i].UpdatedBy;
                delete dataDistrict[i].IsEnable;
                delete dataDistrict[i].NameExtension;
                delete dataDistrict[i].SupportType;
            }
            res.status(200).json(dataDistrict);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    codeWard: async(req,res)=>{
        try {
            const district_id= req.body.district_id;
            const Ward = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
            {method: 'POST', body: JSON.stringify({"district_id": district_id}),
            headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
            var dataWard = await Ward.json();
            dataWard = dataWard.data;
            for ( let i = 0; i< dataWard.length; i++){
                delete dataWard[i].OnDates;
                delete dataWard[i].ReasonMessage;
                delete dataWard[i].ReasonCode;
                delete dataWard[i].Status;
                delete dataWard[i].WhiteListWard;
                delete dataWard[i].WhiteListClient;
                delete dataWard[i].DeliverType;
                delete dataWard[i].PickType;
                delete dataWard[i].SupportType;
                delete dataWard[i].UpdatedAt;
                delete dataWard[i].CreatedAt;
                delete dataWard[i].UpdatedBy;
                delete dataWard[i].CanUpdateCOD;
                delete dataWard[i].IsEnable;
                delete dataWard[i].NameExtension;
                delete dataWard[i].DistrictID;
                delete dataWard[i].UpdatedDate;
                delete dataWard[i].UpdatedSource;
                delete dataWard[i].UpdatedEmployee
                delete dataWard[i].UpdatedIP
                delete dataWard[i].CreatedDate
                delete dataWard[i].CreatedSource
                delete dataWard[i].CreatedEmployee
                delete dataWard[i].CreatedIP;   
            }
            res.status(200).json(dataWard);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getFeeShip: async(req,res)=>{
        try {
            const to_district= req.body.district_id;
            const to_ward= req.body.WardCode;
            const quantity = req.body.quantity;
            const tt_value = req.body.total;
            const Service = await fetch("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
            {method: 'POST', body: JSON.stringify({"shop_id": 3912285, "from_district": 1542 , "to_district": to_district}), 
            headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
            const dataService = await Service.json();
            var service = dataService.data;
            var shippingFee =[];
            for ( let i = 0; i< service.length; i++){
                var ShippingFee = await fetch("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                {method: 'POST', body: JSON.stringify({"service_type_id":service[i].service_type_id, "insurance_value":tt_value, "coupon": null, "from_district_id":1542, 
                "to_district_id":to_district, "to_ward_code":to_ward,  "height":2, "length":30, "weight":quantity, "width":20}), 
                headers: {"token": "427bb6dc-bc24-11ed-9dc6-f64f768dbc22", "Content-Type": "application/json"}})
                var a = await ShippingFee.json();
                if( a.data!=null){
                    a.data.short_name= service[i].short_name;
                    shippingFee[i] = a.data;
                }
            }
            
            res.status(200).json(shippingFee.filter(a => a !== null));
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

