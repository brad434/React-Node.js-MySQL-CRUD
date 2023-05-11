import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

//this is creating the template for the mysql so the data can be related and know where to place it
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mbijune181993!",
  database: "mydb",
});

app.use(express.json());
app.use(cors());

//this is the code for putting a message to the frontend of the website
app.get("/", (req, res) => {
  res.json("Hello This Is The Backend Code!");
});

//this next get request is to display our book table
app.get("/books", (req, res) => {
  //create the written code for mySQL to understand to then pass it onto the database aka db
  const q = "SELECT * FROM books";
  //connect the requested code in mySQL to the SQL database and report an error if there is or if not then produce the code
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully");
  });
});

//this code will create a port and initialize a backend server message stating whatever you want
app.listen(8800, () => {
  console.log("connected to backend!!");
});
