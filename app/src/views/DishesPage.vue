<script lang="ts" setup>
import NewDishForm from '../components/NewDishForm.vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import { ref, computed, onMounted } from 'vue'
import type { Dish, Status } from '../types'
import { useRoute } from 'vue-router'

const filterText = ref('')

const dishList = ref([
  {
    id: '7d9f3f17-964a-4e82-98e5-ecbba4d709a1',
        name: 'Ghost Pepper Poppers',
        status: 'Want to Try' as Status,
      },
      {
        id: '5c986b74-fa02-4a22-98f2-b1ff3559e85e',
        name: 'A Little More Chowder Now',
        status: 'Recommended' as Status,
      },
      {
        id: 'c113411d-1589-414f-a283-daf7eedb631e',
        name: 'Full Laptop Battery',
        status: 'Do Not Recommend' as Status,
  },
])

const showNewForm = ref(false)

const filteredDishList = computed((): Dish[] => {
  return dishList.value.filter((dish) => {
    return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
  })
})

const numberOfDishes = computed((): number => {
  return filteredDishList.value.length
})

  const addDish = (payload: Dish) => {
    dishList.value.push(payload)
    hideForm()
  }

  const deleteDish = (payload: Dish) => {
    dishList.value = dishList.value.filter((dish) => {
      return dish.id !== payload.id
    })
  }

  const hideForm = () => {
    showNewForm.value = false
  }

  const updateFilterText = (event: KeyboardEvent) => {
    filterText.value = (event.target as HTMLInputElement).value
  }

  onMounted(() => {
    const route = useRoute()

  if (route.query.new) {
    showNewForm.value = true
  }
})
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Dishes</h1>

        <!-- CTA Bar -->
        <nav v-if="!showNewForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="showNewForm = true" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Dish name"
                    :value="filterText"
                    @keyup.enter="updateFilterText"
                  />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Dish Form -->
        <NewDishForm v-if="showNewForm" @add-new-dish="addDish" @cancel-new-dish="hideForm" />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" class="column is-full" :key="`item-${item}`">
            <DishCard :dish="item" @delete-dish="deleteDish" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
