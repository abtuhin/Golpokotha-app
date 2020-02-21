import { gql } from "apollo-boost";

export const submitReview = gql`
  mutation($rating: Float!, $comment: String!, $storyId: ID!) {
    addReview(rating: $rating, storyId: $storyId, comment: $comment) {
      _id
    }
  }
`;

export const addToLibrary = gql`
  mutation($storyId: ID!) {
    addToLibrary(storyId: $storyId) {
      _id
    }
  }
`;

export const getStory = gql`
  query getStory($_id: ID!) {
    story(_id: $_id) {
      title
      views
      loved
      imageUrl
      pdf
      author {
        name
      }
      user {
        userId
        name
      }
      reviews {
        rating
        comment
        user {
          userId
          name
          profileImage
        }
      }
      categories {
        name
      }
    }
    trendingStories @client {
      categories
    }
  }
`;

export const getStories = gql`
  {
    categories {
      _id
      name
      stories(first: 10) {
        items {
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
  }
`;

export const getStoryListByCategory = gql`
  query getStoryListByCategory($_id: ID!, $first: Int, $skip: Int) {
    category(_id: $_id) {
      name
      stories(first: $first, skip: $skip) {
        items {
          _id
          title
          imageUrl
          author {
            name
          }
          views
        }
        count
      }
    }
  }
`;

export const getAllStories = gql`
  query getAllStories($first: Int, $skip: Int, $search: String) {
    stories(first: $first, skip: $skip, search: $search) {
      count
      items {
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
