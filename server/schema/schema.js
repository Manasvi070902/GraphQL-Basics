const graphql = require("graphql")

const {GraphQLObjectType, GraphQLString,GraphQLSchema} = graphql;

//define object type
const BookType = new GraphQLObjectType({
    name : "Book",
    fields: () => ({
        id : {type : GraphQLString},
        name: { type: GraphQLString},
        genre : {type : GraphQLString}
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book: {
            type : BookType,
            args : {id : {type : GraphQLString}},
            resolve(parent,args){
                //get data from db
            }
        }
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