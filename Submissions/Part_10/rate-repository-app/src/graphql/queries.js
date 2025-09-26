import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
      edges {
        node {
          id,
            ownerAvatarUrl,
            fullName,
            description,
            language,
            forksCount,
            stargazersCount,
            reviewCount,
            ratingAverage,
            url
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id,  
      ownerAvatarUrl,
      fullName,
      description,
      language,
      forksCount,
      stargazersCount,
      reviewCount,
      ratingAverage,
      url,
      reviews {
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
        }
      }
    }
  }
`;


export const ME = gql`
  query  me ($includeReviews: Boolean = false){
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            rating
            repository {
              fullName
            }
            createdAt
            text
          }
        }
      }
    }
  }
`;