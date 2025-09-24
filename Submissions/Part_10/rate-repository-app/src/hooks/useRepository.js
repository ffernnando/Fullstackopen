import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";


const useRepository = (repositoryId) => {
  console.log('CALLED WITH: ', repositoryId);
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: repositoryId },
    fetchPolicy: 'cache-and-network',
  });

  return { repository: data?.repository, loading, error };
};

export default useRepository;