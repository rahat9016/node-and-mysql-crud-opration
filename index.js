const express = require("express")
const mysql = require("mysql")


const app = express()

// Middleware
app.use(express.json())


// DB Connection 
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"rahat9016",
    database :"crud"
})

app.get("/", (req,res)=>{
    const queryCommand = "SELECT * FROM books"
    db.query(queryCommand, (error,data)=>{
        if (error) res.status(400).json(error)
        if(data) res.status(200).json({data})
    })
})


app.post("/", (req,res)=>{
    const queryCommand = "INSERT INTO books (`title`, `description`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover
    ]
    db.query(queryCommand, [values], (error, data)=>{
        if (error) res.status(400).json(error)
        if(data) res.status(201).json({message : "Create successfully done!"})
    })
})

app.put("/:id", (req,res)=>{
    const params = req.params.id
    const queryCommand = "UPDATE books SET `title` = ?, `description` = ?, `cover` = ? where id = ? "

    const values = [
        req.body.title,
        req.body.description,
        req.body.cover
    ]
    db.query(queryCommand, [...values, params], (error,data)=>{
        if (error) res.status(400).json(error)
        if(data) res.status(200).json({message : "update successfully done!"})
    })
})

app.delete("/:id", (req,res)=>{
    const params = req.params.id
    const queryCommand = "DELETE FROM books where id = ?"
    
    db.query(queryCommand, [params], (error,data)=>{
        if (error) res.status(400).json(error)
        if(data) res.status(200).json({message : "delete successfully done!"})
    })
})

app.get("/:id",(req,res)=>{
    const params = req.params.id
    const queryCommand = "SELECT * FROM books WHERE id = ?"
    db.query(queryCommand, [params], (error,data)=>{
        if (error) res.status(400).json(error)
        if(data) res.status(200).json({data})
    })
})
app.listen(8080, ()=>{
    console.log("Server is running on 8080 port")
})