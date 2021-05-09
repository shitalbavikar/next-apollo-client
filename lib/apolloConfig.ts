import { ApolloClient , InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://whispering-headland-98128.herokuapp.com/",
  cache: new InMemoryCache()
}); 


// alternate localhost server url: http://localhost:4000/graphql/