import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

//components
import BookList from "./Components/BookList";
import AddBook from "./Components/AddBook";
//apollo client setup

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client} >
      <div id="main">
        <h2>Hello</h2>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
