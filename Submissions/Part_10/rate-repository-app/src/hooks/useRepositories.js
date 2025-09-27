import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";


const useRepositories = ({orderBy, orderDirection}, searchKeyword) => {
  const { data, loading, fetchMore, error } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: orderBy, orderDirection: orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    console.log('data: ', data?.repositories)
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        orderBy,
        orderDirection,
        searchKeyword,
        after: data?.repositories.pageInfo.endCursor,
      },
    });
  };

  return { repositories: data?.repositories, loading, fetchMore: handleFetchMore, error };
};

export default useRepositories;