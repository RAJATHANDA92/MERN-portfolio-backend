const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "curd_db"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req, res) => {
    const sqlGet ="select * from contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
       });
});

app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert =
    "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if(error){
            console.log("error", error);
         }
    });
    
});
     
app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params.id;
    const sqlRemove =
    `DELETE FROM contact_db WHERE id = ${req.params.id}`;
    db.query(sqlRemove, id, (error, result) => {
        if(error){
            console.log(error);
         }
    });
    
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
        const sqlGet ="select * from contact_db where id = ?";
        db.query(sqlGet, id, (error, result) => {
            if(error){
                console.log(error);
            }
            res.send(result);
     });
});
 
app.put("/api/update/:id", (req, res) => {
    const { id } = req.params.id;
    const { name, email, contact } = req.body;
    const sqlUpdate = `UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ${req.params.id}`;
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });

  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const sqlInsert =
    "INSERT INTO login_db (email, password) VALUES (?, ?)";
    db.query(sqlInsert, [email, password], (error, result) => {
        if(error){
            console.log("error", error);
         }
    });
    
});

app.post("/api/register", (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const sqlInsert =
    "INSERT INTO register_db (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [firstname, lastname, email, password], (error, result) => {
        if(error){
            console.log("error", error);
         }
    });
    
});

app.listen(5050, () => {
    console.log("server is running at port 5050");
}); 