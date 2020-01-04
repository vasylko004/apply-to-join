import { ApolloClient } from 'apollo-client'
import { createApplyToJoin } from "./applyToJoin";
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client';

const SERVER_URI = process.env.SERVER || "http://localhost:9000/graphql"

const gqlClient = new ApolloClient({ 
    cache: new InMemoryCache().restore({}),
    link: createUploadLink({ uri: SERVER_URI })
 });

export const GraphQL = {
    query: {

    },
    mutation: {
        applyToJoin: createApplyToJoin(gqlClient)
    }
}