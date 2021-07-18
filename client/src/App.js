import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

import BookList from "./Components/BookList";

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
      </div>
    </ApolloProvider>
  );
}

export default App;
