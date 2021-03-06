import * as axios from "axios";


//403 error - API-key

const instance = axios.create({
   withCredentials: true,
   baseURL: "https://social-network.samuraijs.com/api/1.0/",
   headers: {
      "API-KEY": "1ae474cc-6077-46bc-8a25-db0c669baff8",
   },
});

export const dalAPI = {
   getUsers(currentPage, pageSize) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data);
   },
   followUser(id) {
      return instance.post(`follow/${id}`).then((response) => response.data);
   },
   unfollowUser(id) {
      return instance.delete(`follow/${id}`).then((response) => response.data);
   },
   getProfile(id) {
      return instance.get(`profile/${id}`).then((response) => response.data);
   },
   requestUsersData() {
      return instance.get(`auth/me`).then((response) => response.data);
   },
   getStatus(id) {
      return instance.get(`profile/status/${id}`).then(response => response.data);
   },
   updateStatus(status) {
      return instance.put(`profile/status`, { status }).then(response => response.data);
   },
   login(email, password, rememberMe = false, captcha = null) {
      return instance.post(`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data)
   },
   logout() {
      return instance.delete(`auth/login`).then(response => response.data)
   },
   updatePhoto(file) {
      const formData = new FormData()   //to upload an image file
      formData.append('image', file)
      return instance.put(`profile/photo`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      }).then(response => response.data)
   },
   updateProfile(info) {
      return instance.put(`profile`, info).then(response => response.data)
   },
   getCaptchaUrl() {
      return instance.get(`security/get-captcha-url`).then(response => response.data)
   },
   getDialogs() {
      return instance.get(`dialogs`).then(response => response.data)
   },
};