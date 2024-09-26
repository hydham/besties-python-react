import { create } from "zustand";
import { BASE_URL } from "../App";

export const useFriendStore = create((set) => ({
    friends: [],

    setFriends: friends => set({friends}),

    createFriend: async (inputs) => {
        try {
            const resp = await fetch(BASE_URL + "/friends", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(inputs)
            })

            const data = await resp.json()

            if (!resp.ok) {
                throw new Error(data.error);
            }

            set(state => ({friends: [...state.friends, data.data]}))

            return {success: true, message: data.message}

        } catch (error) {
            return {success: false, message: error.message}
        }
    },

    getFriends: async () => {
        try {
            const resp = await fetch(BASE_URL + "/friends")
            const data = await resp.json()

            if (!resp.ok) {
                throw new Error(data.error || "Failed to fetch friends");
            }

            set({friends: data.data})


        } catch (error) {
            console.error("Failed to fetch friends ", error.message)
    }
    },

    deleteFriend: async (id) => {
        try {
            const resp = await fetch(BASE_URL + "/friends/" + id, {
                method: "DELETE"
            })

            const data = await resp.json()

            if (!resp.ok) {
                throw new Error(data.error);
            }

            set(state => ({friends: state.friends.filter(friend => friend.id !== id)}))

            return {success: true, message: data.message}

        } catch (error) {
            return {success: false, message: error.message}
        }
    },

    updateFriend: async (id, inputs) => {
        try {
            const resp = await fetch(BASE_URL + "/friends/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            })

            const data = await resp.json()

            if (!resp.ok) {
                throw new Error(data.error);
            }

            set(state => ({friends: state.friends.map(friend => friend.id === id ? data.data : friend)}))

            return {success: true}

        } catch (error) {
           return {success: false, message: error.message}

        } 

    }

}))
