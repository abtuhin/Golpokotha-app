import ApolloClient from "apollo-boost";
import { AsyncStorage } from "react-native";
import baseURL from "../../config/network";

const client = new ApolloClient({
  uri: baseURL + "/graphql",
  clientState: {
    defaults: {
      trendingStories: {
        __typename: "TRENDING_STORIES",
        categories: []
      }
    },
    resolvers: {
      Query: {},
      Mutation: {}
    },
    typeDefs: ``
  },
  request: async operation => {
    const token = await AsyncStorage.getItem("FB_TOKEN");
    operation.setContext({
      headers: {
        // authorization: token ? token : ""
        authorization:
          "EAADv3hGiFdwBAIMBD6q5M0NIwskM0z3j62I9hLl3vUbAX8AenO6CSgKFxiFoagOyIZAcRm8j4VGyWX41Cg4S2U8NSQhVdmpfmJ6SKSIXsaKitzqBwDL1ftOQND5j8Mv6P9JZAoeLEyZCRegKRZCpwXLZAY1oHOGDvT5iPHdHEuLwi3Q7g6fZCN4pOtTRY20aShCkZBTofcs6wZDZD"
      }
    });
  }
});

export default client;
