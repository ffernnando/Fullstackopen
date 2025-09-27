import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";


const useRepository = (repositoryId) => {
  console.log('CALLED WITH: ', repositoryId);
  const { data, error, loading, fetchMore, refetch } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: repositoryId },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;
    if (!canFetchMore) return;

    fetchMore({
      variables: {
        repositoryId,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };


  console.log('useRepository data.repo: ', data?.repository);
  return { repository: data?.repository, loading, error, fetchMore: handleFetchMore, refetch} ;
};

export default useRepository;