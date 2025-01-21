import type { Restaurant } from '@/types'
import { defineStore } from 'pinia'

export const useRestaurantStore = defineStore('RestaurantStore', {
  state: () => ({
    restaurants: [] as Restaurant[],
  }),
})
 