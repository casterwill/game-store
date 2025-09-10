import { create } from "zustand";
import axios from "axios";

const baseURL = "http://localhost:3000";

export const useGamesStore = create((set) => ({
    games: [],
    loading: false,
    error: null,
    fetchGames: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${baseURL}/api/games/fetch`);
            set({ games: response.data, error: null });
        } catch (error) {
            if (err.status == 429) set({ error: "Rate limit exceeded", games: [] });
            else set({ error: "Something went wrong"});
        } finally {
            set({ loading: false });
        }
    },
})
);