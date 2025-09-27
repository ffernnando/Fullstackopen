import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $after: String) {
    repositories(first: 5, orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, after: $after) {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          forksCount
          stargazersCount
          reviewCount
          ratingAverage
          url
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      ownerAvatarUrl
      fullName
      description
      language
      forksCount
      stargazersCount
      reviewCount
      ratingAverage
      url
      reviews(first: 6) {
        edges {
          node {
            id,
            text,
            rating,
            createdAt,
            user {
              id,
              username,
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;


export const ME = gql`
  query me ($includeReviews: Boolean = false){
    me {
      id
      username
      reviews(first: 6) @include(if: $includeReviews) {
        
        edges {
          node {
            id
            rating
            repository {
              fullName
              id
            }
            createdAt
            text
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;