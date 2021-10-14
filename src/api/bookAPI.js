import { getRequest, putRequest, deleteRequest, postRequest} from "./util"; 

const BASE_URL = "/book"; 

export const getBooks = () => getRequest(`${BASE_URL}`);

export const getBooks = (id) => getRequest(`${BASE_URL}/${id}`);

export const lendBook = (id, burrowedMemberId, burrowedDate) =>
    putRequest(`${BASE_URL}/${id}/burrow`, { burrowedMemberId, burrowedDate});

export const returnBook = (id) => putRequest(`${BASE_URL}/${id}/return`);

export const deleteBooks = (id) => deleteRequest(`${BASE_URL}/${id}`); 

export const addBook = (data) =>
    posttRequest(`${BASE_URL}`,data);
  
export const editBook =  (id, data) => putRequest(`${BASE_URL}/${id}`,data);