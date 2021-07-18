const express = require("express")
const {graphqlHTTP} = require("express-graphql")
const schema = require("./schema/schema")
const mongoose = require("mongoose");
const cors = require("cors")


const app = express();

//allow cors
app.use(cors())
require("dotenv").config();

const MONGOURI = process.env.MONGOURI;
mongoose.connect(MONGOURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
           useCreateIndex : true
        }).then(
            console.log("Database connected!")
        );
        
        

app.use('/graphql', graphqlHTTP({
    schema,graphiql:true
}))


app.listen(4000 , ()=> {
    console.log("Server running at 4000")
})