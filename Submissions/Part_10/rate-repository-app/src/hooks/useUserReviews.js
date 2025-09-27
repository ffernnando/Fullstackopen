import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";

const useUserReviews = () => {
  const { data, error, loading, fetchMore } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me?.reviews?.pageInfo?.hasNextPage;
    if (!canFetchMore) return;

    fetchMore({
      variables: {
        includeReviews: true,
        after: data.me.reviews.pageInfo.endCursor,
      },
    });
  };


  return {
    user: data?.me,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useUserReviews;
