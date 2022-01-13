// use axios for crud
import Restaurant from '../components/restaurants';
import http from '../http-common'

// all the functions that will make and return api calls
class RestaurantDataService {
  // Get all - url added to base url
  getAll(page = 0) {
    return http.get(`restaurants?page=${page}`);
  }

  // get specific restaurant by ID
  get(id) {
    return http.get(`/restaurant?id=${id}`);
  }

  // find takes the query (search term), what you're searching by, page number 
  find(query, by = "name", page = 0) {
    // added to end of base url
    return http.get(`restaurants?${by}=${query}&page=${page}`);
  } 

  createReview(data) {
    return http.post("/review-new", data);
  }

  updateReview(data) {
    return http.put("/review-edit", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
  }

  getCuisines(id) {
    return http.get(`/cuisines`);
  }
}

export default new RestaurantDataService