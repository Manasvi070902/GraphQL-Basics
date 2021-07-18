const graphql = require("graphql")
const _ = require("lodash")
const {GraphQLObjectType, GraphQLString,GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

const Book = require('../models/book')
const Author = require('../models/author')

//define object type
const BookType = new GraphQLObjectType({
    name : "Book",
    fields: () => ({
        id : {type : GraphQLID},
        name: { type: GraphQLString},
        genre : {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name : "Authors",
    fields: () => ({
        id : {type : GraphQLID},
        name: { type: GraphQLString},
        age : {type : GraphQLInt},
        books:{
          type : new GraphQLList(BookType),
          resolve(parent, args){
              //return _.filter(books,{authorId : parent.id})
              return Book.find({authorId : parent.id})
          }
        }
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
                //return _.find(books,{id : args.id})
                return Book.findById(args.id)
            }
        },
        author: {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent,args){
                //get data from db
                //return _.find(authors,{id : args.id})
                return Author.findById(args.id)
            }
        },
        books : {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return books
                return Book.find({});
            }
        },
        authors : {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
               // return authors
               return Author.find({});
            }
        },


    }
})
const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields:{
        addAuthor : {
            type: AuthorType,
            args:{
                name:{type:GraphQLString},
                age : {type : GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook : {
            type: BookType,
            args:{
                name:{type:GraphQLString},
                genre : {type : GraphQLString},
                authorId : {type:GraphQLString}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId : args.authorId
                })
                return book.save()
            }
        }
    }
})
module.exports= new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})

//RootQuery book field will look like this when we call from frontend
// book(id: '5'){
//     name,
//     genre
//   }