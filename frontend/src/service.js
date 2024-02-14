import api from './api/axiosConfig'


const service = {

    loadUsers: async() => {
        const result = await api.get("/users")
        return result.data;
    },
    loadTrips: async() => {
        const result = await api.get("/trips")
        return result.data;
    },
    getTripById: async(tripId) => {
        const result = await api.get(`/trips/${tripId}`)
        console.log(result.data);
        return result.data;
    },
    addTrip: async(trip) => {
        await api.post('/trips', JSON.stringify(trip),
        {headers: {'Content-Type': 'application/json'}})
    },
    editTrip: async(tripId, trip) => {
        await api.put(`/trips/${tripId}`, JSON.stringify(trip),
        {headers: {'Content-Type': 'application/json'}})
    },
    deleteTrip : async(tripId) => {
        const result = await api.delete(`/trips/${tripId}`)
        console.log(result);
    },
    bookTrip : async(userId, tripId) => {
        const result = await api.post(`/users/${userId}/${tripId}`)
        console.log(result);
    },
    loadCategories: async() => {
        const result = await api.get("/categories")
        return result.data;
    },
    loadComments: async() => {
        const result = await api.get("/comments")
        return result.data;
    },
    addComment: async(tripId, comment) => {
        const result = await api.post(`/comments/${tripId}`, JSON.stringify(comment),
        {headers: {'Content-Type': 'application/json'}});
    },
    deleteComment : async(commentId, tripId) => {
        const result = await api.delete(`/comments/${commentId}/${tripId}`)
        console.log(result);
    },
    loginUser: async (userData) => {
        const res = await api.post("/auth/login", JSON.stringify(userData),
            {headers: {'Content-Type': 'application/json'}});
        console.log("user", res);
        return res.data.user;
    },
    registerUser: async (userData) => {
        const user = await api.post("/auth/register", JSON.stringify(userData),
            {headers: {'Content-Type': 'application/json'}});
        console.log(user);
    },
    logoutUser : async() => {
        const res = await api.get("/auth/logout")
    },
    getCurrentUser: async () => {
        console.log('log');
        const user = await api.get("/auth/user")
        console.log('logged in user: ', user);
        return user;
    },


};


export default service;