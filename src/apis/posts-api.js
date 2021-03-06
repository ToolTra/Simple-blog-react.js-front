import axios from "axios";
import apiConfig from "../configs/api-config";

const ENDPOINT = `${apiConfig.URL}/posts`;

// Fetches paginated posts
async function fetchPaginatedPosts(
  page = 1,
  limit = 12,
  order = "desc",
  search = "",
  categoryId = null,
  authorId = null
) {
  const params = { page, limit, order, search: encodeURI(search) };
  if (authorId) params.authorId = authorId;
  if (categoryId) params.categoryId = categoryId;
  return axios
    .get(ENDPOINT, {
      params,
    })
    .then((response) => response.data);
}

// Fetches a post by id
async function fetchPost(id) {
  const URL = `${ENDPOINT}/${id}`;
  const result = await axios.get(URL);
  return result.data;
}

// Adds a new post to api
async function addPost(postData, onUploadProgress) {
  const token = localStorage.getItem("access-token");
  const response = await axios.post(ENDPOINT, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    onUploadProgress: (e) => {
      const progress = parseInt(Math.round((e.loaded * 100) / e.total));
      onUploadProgress(progress);
    },
  });
  return response.data;
}

// Updates a post's text fields
async function updatePostTextFields(id, values) {
  const token = localStorage.getItem("access-token");
  const URL = `${ENDPOINT}/${id}/text`;
  return (
    await axios.put(URL, values, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}

// Updates a post's categories
async function updatePostCategories(id, categories, newCategories) {
  const token = localStorage.getItem("access-token");
  const URL = `${ENDPOINT}/${id}/categories`;
  const data = { categories, newCategories };
  return (
    await axios.put(URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}

// Deletes a user's post
async function deletePost(id) {
  const token = localStorage.getItem("access-token");
  const URL = `${ENDPOINT}/${id}`;
  await axios.delete(URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export { fetchPaginatedPosts, fetchPost, addPost, updatePostTextFields, updatePostCategories, deletePost };
