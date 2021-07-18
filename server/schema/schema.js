const graphql = require("graphql")
const _ = require("lodash")
const {GraphQLObjectType, GraphQLString,GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

//dummy data
var books =[
{name: "hi" , genre: "comedy" , id: "1"}
]
var authors = [
    {name : "me" , age: 90 ,id : "1"}
]

//define object type
const BookType = new GraphQLObjectType({
    name : "Book",
    fields: () => ({
        id : {type : GraphQLID},
        name: { type: GraphQLString},
        genre : {type : GraphQLString}
    })
})

const AuthorType = new GraphQLObjectType({
    name : "Authors",
    fields: () => ({
        id : {type : GraphQLID},
        name: { type: GraphQLString},
        age : {type : GraphQLInt}
    })
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book: {
            type : BookType,
            args : {id : {type : GraphQLID}},
            resolve(parent,args){
                //get data from db
                return _.find(books,{id : args.id})
            }
        },
        author: {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent,args){
                //get data from db
                return _.find(authors,{id : args.id})
            }
        },

    }
})

module.exports= new GraphQLSchema({
    query : RootQuery
})

//RootQuery book field will look like this when we call from frontend
// book(id: '5'){
//     name,
//     genre
//   }