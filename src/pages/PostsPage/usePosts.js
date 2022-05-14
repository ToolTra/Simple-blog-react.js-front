import { useState } from "react";

// Other custom hooks
import usePaginatedApiCall from "../../hooks/usePaginatedApiCall";

// API calls
import { fetchPaginatedPosts } from "../../apis/posts-api";

// Custom hook for the posts data
function usePosts() {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [order, setOrder] = useState("desc");

	const [posts, isLoading, count, pages] = usePaginatedApiCall(() => {
		const LIMIT = 12;
		return fetchPaginatedPosts(page, LIMIT, order, search);
	}, [page, search, order]);

	return {
		posts,
		page,
		order,
		search,
		handlePageChange: setPage,
		handleSearchChange: setSearch,
		handleOrderChange: setOrder,
		isLoading,
		count,
		pages,
	};
}

export default usePosts;
