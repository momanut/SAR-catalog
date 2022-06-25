const express = require('express')
const app = express()
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs')
const req = require('express/lib/request')

 
//use express static folder
app.use(cors());
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 
// Database connection
const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    database:'sar_cat'
})
 
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})
 
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 
//@type   POST
//route for post data
app.post("/upload", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log('No file upload');
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:3001/images/' + req.file.filename
        var insertData = 'INSERT INTO image(IMAGE)VALUES(?)'
        db.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
        })
    }
});

app.get("/getuser/:username/:password", (req, res) =>{
    const username = req.params.username
    const password = req.params.password
    db.query("SELECT * FROM employees where username = ? and password = ?",[username,password],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})
app.get("/getregister/:username/", (req, res) =>{
    const username = req.params.username
    db.query("SELECT * FROM employees where username = ?",[username,],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})
app.get("/getdata/:setting/", (req, res) =>{
    var setting = req.params.setting.slice(1)
    db.query("SELECT "+ setting + " FROM satdata  ORDER BY ID DESC LIMIT 0, 25",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
    console.log(setting);
})


app.get("/data_with_option/:option/:page/:setting/:startDate/:endDate", (req, res) =>{
    var setting = req.params.setting.slice(1)
    var option ;var start ;var end ;
    if(req.params.option !== '-'){
        option = "(work_order_id LIKE '%"+req.params.option+"%' OR order_id LIKE '%"+req.params.option+"%' OR pr_id LIKE '%"+req.params.option+"%') "
    }else{
        option = 1
    }
    if(req.params.startDate !== '-'){
        start = "(acq_date >= '"+req.params.startDate +"')"
    }else{
        start = 1
    }
    if(req.params.endDate !== '-'){
        end = "(acq_date <= '"+req.params.endDate +"')"
    }else{
        end = 1
    }
    
    var page = (parseInt(req.params.page)-1)*50
    //console.log("SELECT "+ setting + " FROM satdata WHERE "+option+" AND "+start+" AND "+end+" ORDER BY ID DESC LIMIT "+page+", 50");
    db.query("SELECT "+ setting + " FROM satdata WHERE "+option+" AND "+start+" AND "+end+" ORDER BY id DESC LIMIT "+page+", 25",[],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
    
})



app.get("/geteditrequest/:work_order_id",(req,res)=>{
    const work_order_id = req.params.work_order_id
    db.query("SELECT * FROM satdata where work_order_id = ?",[work_order_id,],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})

app.get("/geteditarea/:plan_id",(req,res)=>{
    const plan_id = req.params.plan_id
    db.query("SELECT * FROM `aoi_input` where id = 1",[],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})

app.post('/create_user',(req,res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const agency = req.body.agency;    
    const role = 'user';
    //console.log(firstname)
    db.query("INSERT INTO employees( firstname,lastname,username,email,password,role,agency) VALUES (?,?,?,?,?,?,?)",
    [firstname,lastname,username,email,password,role,agency],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Add_success')
        }
    })
})

app.post('/create_satdata_input',(req,res)=>{
    const satellite = req.body.satellite;
    const type = req.body.type;
    const insert_request =  req.body.insert_request;
    const work_order_id = req.body.work_order_id;
    const order_id = req.body.order_id;
    const pr_id = req.body.pr_id;
    const ar_counter = req.body.ar_counter;
    const dtos_id = req.body.dtos_id;
    const acq_date = req.body.acq_date;
    const start_time = req.body.start_time;
    const stop_time = req.body.stop_time;
    const sensor_mode = req.body.sensor_mode;
    const beam_type = req.body.beam_type;
    const level = req.body.level;
    const format = req.body.format;
    const direction = req.body.direction;
    const angle = req.body.angle;
    const polarization = req.body.polarization;
    const aoi_tl_n = req.body.tl_n;
    const aoi_tl_e = req.body.tl_e;
    const aoi_tr_n = req.body.tr_n;
    const aoi_tr_e = req.body.tr_e;
    const aoi_br_n = req.body.br_n;
    const aoi_br_e = req.body.br_e;
    const aoi_bl_n = req.body.bl_n;
    const aoi_bl_e = req.body.bl_e;
    const area = req.body.area;
    const status = req.body.status;            
    const remark = req.body.remark;
    const operator = req.body.operator;
    const customer = req.body.customer;
    const organization = req.body.organization;
    const project = req.body.project;
    const qty = req.body.qty;
    const priority = req.body.priority;
    const package = req.body.package;
    const acq_id = req.body.acq_id;
    db.query("INSERT INTO `satdata`(`satellite`, `type`, `insert_request`, `work_order_id`, "+
    " `order_id`, `pr_id`, `ar_counter`, `dtos_id`, `acq_date`, `start_time`, `stop_time`, "+
    "`sensor_mode`, `level`, `format`, `direction`, `angle`, `polarization` "+
    " , `area`, `status`, `remark`,"+
    " `customer`, `organization`, `project`, `operator`, `qty`, `package`, `acq_id`,`priority`,"+
    " `beam_type`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [satellite,type,insert_request,work_order_id,order_id,pr_id,ar_counter,dtos_id,acq_date,start_time,stop_time,
        sensor_mode,level,format,direction,angle,polarization,area,status,
        remark,customer,organization,project,operator,qty,package,acq_id,priority,beam_type
        ],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            db.query("INSERT INTO `aoi_input`(`satdata_id`, `tl_n`, `tl_e`, `tr_n`, `tr_e`, `br_n`, `br_e`, `bl_n`, `bl_e`) VALUES (?,?,?,?,?,?,?,?,?)",
            [work_order_id,aoi_tl_n,aoi_tl_e,aoi_tr_n,aoi_tr_e,aoi_br_n,aoi_br_e,aoi_bl_n,aoi_bl_e],(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(result)
                    res.send('Add_success')
                }
            })    
        }
    })
})

app.post('/create_satdata_input',(req,res)=>{
    const satellite = req.body.satellite;
    const type = req.body.type;
    const insert_request =  req.body.insert_request;
    const work_order_id = req.body.work_order_id;
    const order_id = req.body.order_id;
    const pr_id = req.body.pr_id;
    const ar_counter = req.body.ar_counter;
    const dtos_id = req.body.dtos_id;
    const acq_date = req.body.acq_date;
    const start_time = req.body.start_time;
    const stop_time = req.body.stop_time;
    const sensor_mode = req.body.sensor_mode;
    const beam_type = req.body.beam_type;
    const level = req.body.level;
    const format = req.body.format;
    const direction = req.body.direction;
    const angle = req.body.angle;
    const polarization = req.body.polarization;
    const aoi_tl_n = req.body.tl_n;
    const aoi_tl_e = req.body.tl_e;
    const aoi_tr_n = req.body.tr_n;
    const aoi_tr_e = req.body.tr_e;
    const aoi_br_n = req.body.br_n;
    const aoi_br_e = req.body.br_e;
    const aoi_bl_n = req.body.bl_n;
    const aoi_bl_e = req.body.bl_e;
    const area = req.body.area;
    const status = req.body.status;            
    const remark = req.body.remark;
    const operator = req.body.operator;
    const customer = req.body.customer;
    const organization = req.body.organization;
    const project = req.body.project;
    const qty = req.body.qty;
    const priority = req.body.priority;
    const package = req.body.package;
    const acq_id = req.body.acq_id;
    console.log(aoi_tl_n);
    console.log(aoi_tl_e);
    console.log(aoi_tr_n);
    console.log(aoi_tr_e);
    console.log(aoi_br_n);
    console.log(aoi_br_e);
    console.log(aoi_bl_n);
    console.log(aoi_bl_e);
    db.query("INSERT INTO `satdata`(`satellite`, `type`, `insert_request`, `work_order_id`, "+
    " `order_id`, `pr_id`, `ar_counter`, `dtos_id`, `acq_date`, `start_time`, `stop_time`, "+
    "`sensor_mode`, `level`, `format`, `direction`, `angle`, `polarization` "+
    " , `area`, `status`, `remark`,"+
    " `customer`, `organization`, `project`, `operator`, `qty`, `package`, `acq_id`,`priority`,"+
    " `beam_type`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [satellite,type,insert_request,work_order_id,order_id,pr_id,ar_counter,dtos_id,acq_date,start_time,stop_time,
        sensor_mode,level,format,direction,angle,polarization,area,status,
        remark,customer,organization,project,operator,qty,package,acq_id,priority,beam_type
        ],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            db.query("INSERT INTO `aoi_input`(`satdata_id`, `tl_n`, `tl_e`, `tr_n`, `tr_e`, `br_n`, `br_e`, `bl_n`, `bl_e`) VALUES (?,?,?,?,?,?,?,?,?)",
            [work_order_id,aoi_tl_n,aoi_tl_e,aoi_tr_n,aoi_tr_e,aoi_br_n,aoi_br_e,aoi_bl_n,aoi_bl_e],(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(result)
                    res.send('Add_success')
                }
            })    
        }
    })
})



app.post('/update_satdata_input',(req,res)=>{
    const satellite = req.body.satellite;
    const type = req.body.type;
    const insert_request =  req.body.insert_request;
    const work_order_id = req.body.work_order_id;
    const order_id = req.body.order_id;
    const pr_id = req.body.pr_id;
    const ar_counter = req.body.ar_counter;
    const dtos_id = req.body.dtos_id;
    const acq_date = req.body.acq_date;
    const start_time = req.body.start_time;
    const stop_time = req.body.stop_time;
    const sensor_mode = req.body.sensor_mode;
    const beam_type = req.body.beam_type;
    const level = req.body.level;
    const format = req.body.format;
    const direction = req.body.direction;
    const angle = req.body.angle;
    const polarization = req.body.polarization;
    const aoi_tl_n = req.body.tl_n;
    const aoi_tl_e = req.body.tl_e;
    const aoi_tr_n = req.body.tr_n;
    const aoi_tr_e = req.body.tr_e;
    const aoi_br_n = req.body.br_n;
    const aoi_br_e = req.body.br_e;
    const aoi_bl_n = req.body.bl_n;
    const aoi_bl_e = req.body.bl_e;
    const area = req.body.area;
    const status = req.body.status;            
    const remark = req.body.remark;
    const operator = req.body.operator;
    const customer = req.body.customer;
    const organization = req.body.organization;
    const project = req.body.project;
    const qty = req.body.qty;
    const priority = req.body.priority;
    const package = req.body.package;
    const acq_id = req.body.acq_id;
    db.query("UPDATE `satdata` SET `satellite`=?,`type`=?,`insert_request`=?,`work_order_id`=?,`order_id`=?,`pr_id`=?,`ar_counter`=?,`dtos_id`='?',`acq_date`=?,`start_time`=?,`stop_time`=?,`sensor_mode`=?`level`=?,`format`=?,`direction`=?,`angle`=?,`polarization`=?,`area`=?,`status`=?,`remark`=?,`remark2`=?,`customer`=?,`organization`=?,`project`=?,`operator`=?,`qty`=?,`package`=?,`acq_id`=?,`beam_type`=?,`priority`=?,`dup_quatity`=? WHERE work_order_id =?",
    [satellite,type,insert_request,work_order_id,order_id,pr_id,ar_counter,dtos_id,acq_date,start_time,stop_time,
        sensor_mode,level,format,direction,angle,polarization,area,status,
        remark,customer,organization,project,operator,qty,package,acq_id,priority,beam_type,work_order_id
        ],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            db.query("INSERT INTO `aoi_input`(`satdata_id`, `tl_n`, `tl_e`, `tr_n`, `tr_e`, `br_n`, `br_e`, `bl_n`, `bl_e`) VALUES (?,?,?,?,?,?,?,?,?)",
            [work_order_id,aoi_tl_n,aoi_tl_e,aoi_tr_n,aoi_tr_e,aoi_br_n,aoi_br_e,aoi_bl_n,aoi_bl_e],(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(result)
                    res.send('Add_success')
                }
            })    
        }
    })
})



app.get("/getItemCart/:condition/", (req, res) =>{
    const condition = req.params.condition;
    var new_cordition = ''

    condition.split(',').forEach(element=>{
        new_cordition = new_cordition+" OR work_order_id = '"+element+"' "
    })
    new_cordition = new_cordition.slice(3)
    db.query("SELECT * FROM `satdata` WHERE "+new_cordition,[],(err,result)=>{
        if(err){
            console.log(err);
        }else{
           
            //console.log(result)
            res.send(result)
        }
    })
    
})
app.get("/getarea/", (req, res) =>{

    db.query("SELECT * FROM `aoi_shp` ORDER BY `aoi_shp`.`satdata_id` ASC ",[],(err,result)=>{
        if(err){
            console.log(err);
        }else{
           
            //console.log(result)
            res.send(result)
        }
    })
    
})

app.post('/create_customer',(req,res)=>{
    const name = req.body.this_customer.name
    const email = req.body.this_customer.email
    const FTP = req.body.this_customer.FTP
    const IP = req.body.this_customer.IP
    const username = req.body.this_customer.username
    const password = req.body.this_customer.password
    const customer_description = req.body.this_customer.customer_description
    db.query("INSERT INTO customer( name,email,description,FTP,username,password) VALUES (?,?,?,?,?,?)",
    [name,email,FTP,IP,username,password,customer_description],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Add_success')
        }
    })
})

app.get('/getcustomer/:nameword',(req,res)=>{
    var nameword = req.params.nameword;
    if(req.params.nameword ==='-'){
        nameword = ''
    }
    db.query("SELECT * FROM customer WHERE NAME LIKE '"+nameword+"%' ",[],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})


app.get('/get_AOI/:workorderID',(req,res)=>{
    var workorderID = req.params.workorderID;
    // if(req.params.nameword ==='-'){
    //     nameword = ''
    // }
    db.query("SELECT * FROM `aoi_input` WHERE satdata_id =? ",[workorderID],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})




app.post('/addHistory',(req,res)=>{
    var Date_order = req.body.date_order;
    var Time_order = req.body.time_order;
    var Work_order_id = req.body.work_order_id;
    var type_image = req.body.type;
    var price = req.body.price;
    db.query("INSERT INTO `history`(`Date_order`, `Time_order`, `Work_order_id`, `type`, `price`) VALUES (?,?,?,?,?)",[
        Date_order,Time_order,Work_order_id,type_image,price
    ],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})

app.get('/getHistory/:condition',(req,res)=>{

    var condition = 'WHERE'+ req.params.condition.slice(4);
    
    if(req.params.condition ==='-'){
        condition = ''
    }
    
    db.query("SELECT * FROM `history` "+condition,[],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})

app.get('/count_work_order/',(req,res)=>{

    
    
    db.query("SELECT COUNT(work_order_id) as count FROM `satdata` ",[],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})


//create connection
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))