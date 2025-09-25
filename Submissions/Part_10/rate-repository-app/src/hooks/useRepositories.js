import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";


const useRepositories = ({orderBy, orderDirection}) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: orderBy, orderDirection: orderDirection },
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: data?.repositories, loading, error };
};

export default useRepositories;