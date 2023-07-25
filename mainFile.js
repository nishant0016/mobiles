let express =require("express");
let app = express();
app.use(express.json());
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept"
    );
    next();
})
var port=process.env.PORT||2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));

const {Client}=require("pg");

const client=new Client({
    user:"postgres",
    password:"7037700!!4nN",
    database:"postgres",
    port:5432,
    host:"db.fnmbkbheapxlvopfeiic.supabase.co",

    ssl:{rejectUnauthorized:false},
});

client.connect(function(res,error){
    console.log("Connected!!!");
});

app.get("/mobiles",function(req,res){
    let ram=req.query.ram;
    let rom=req.query.rom;
    let brand=req.query.brand;
    let sql="SELECT * FROM mobiles";
    client.query(sql,function(err,result){
        if (err) res.status(404).send(err);
        else{
            let arr1=result.rows;
            arr1=brand?arr1.filter(mb=>mb.brand===brand):arr1;
            arr1=ram?arr1.filter(mb=>mb.ram===ram):arr1;
            arr1=rom?arr1.filter(mb=>mb.rom===rom):arr1;
            res.send(arr1);
        } 
    })
});

app.get("/mobiles/:name",function(req,res){
    let name=req.params.name;
    const params=[name];
    let sql="SELECT * FROM mobiles WHERE name=$1";
    client.query(sql,params,function(err,result){
        if (err) res.status(404).send(err);
        else res.send(result.rows);
    })
});

app.get("/mobiles/brand/:name",function(req,res){
    let name=req.params.name;
    const params=[name];
    let sql="SELECT * FROM mobiles WHERE brand=$1";
    client.query(sql,params,function(err,result){
        if (err) res.status(404).send(err);
        else res.send(result.rows);
    })
});


app.get("/mobiles/ram/:name",function(req,res){
    let name=req.params.name;
    const params=[name];
    let sql="SELECT * FROM mobiles WHERE ram=$1";
    client.query(sql,params,function(err,result){
        if (err) res.status(404).send(err);
        else res.send(result.rows);
    })
});

app.get("/mobiles/rom/:name",function(req,res){
    let name=req.params.name;
    const params=[name];
    let sql="SELECT * FROM mobiles WHERE rom=$1";
    client.query(sql,params,function(err,result){
        if (err) res.status(404).send(err);
        else res.send(result.rows);
    })
});

app.get("/mobiles/os/:name",function(req,res){
    let name=req.params.name;
    const params=[name];
    let sql="SELECT * FROM mobiles WHERE os=$1";
    client.query(sql,params,function(err,result){
        if (err) res.status(404).send(err);
        else res.send(result.rows);
    })
});

app.post("/mobiles", function(req, res) {
    let body = req.body;
    console.log("inside post");
    let arr = [body.name, body.price, body.brand, body.ram, body.rom, body.os];
    let sql = "INSERT INTO mobiles (name, price, brand, RAM, ROM, OS) VALUES ($1, $2, $3, $4, $5, $6)";
    client.query(sql, arr, function(err, result) { // Fixed variable names here: err and result
        if (err) {
            console.log(err);
            res.status(404).send(err);
        } else {
            let sql1 = "SELECT * FROM mobiles WHERE name = $1";
            client.query(sql1, [body.name], function(err1, result1) { // Fixed variable names here: err1 and result1
                if (err1) {
                    console.log(err1);
                    res.status(404).send(err1);
                } else {
                    res.send(result1.rows);
                }
            });
        }
    });
});

app.delete("/mobiles/:name",function(req,res){
    let name=req.params.name;
    let params=[name];
    let sql="DELETE FROM mobiles WHERE name=$1";
    client.query(sql,params,function(err,result){
        if (err) res.status(404).send(err);
        else res.send("Data Successfully Deleted");
    })
})

app.put("/mobiles/:name",function(req,res){
    let body = req.body;
    let name=req.params.name;
    let arr = [body.price, body.brand, body.ram, body.rom, body.os,name];
    let sql = "UPDATE mobiles SET price=$1, brand=$2, RAM=$3, ROM=$4, OS=$5 WHERE name=$6";
    client.query(sql, arr, function(err, result) { 
        if (err) {
            console.log(err);
            res.status(404).send(err);
        } else {
            let sql1 = "SELECT * FROM mobiles WHERE name = $1";
            client.query(sql1, [body.name], function(err1, result1) { 
                if (err1) {
                    console.log(err1);
                    res.status(404).send(err1);
                } else {
                    res.send(result1.rows);
                }
            });
        }
    });
})