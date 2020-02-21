import { gql } from "apollo-boost";

export const getLibrary = gql`
  {
    library {
      _id
      stories {
        _id
        title
        views
        loved
        imageUrl
        author {
          name
        }
      }
    }
  }
`;
