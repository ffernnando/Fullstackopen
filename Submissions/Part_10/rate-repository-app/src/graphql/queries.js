import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ownerAvatarUrl,
          fullName,
          description,
          language,
          forksCount,
          stargazersCount,
          reviewCount,
          ratingAverage
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;