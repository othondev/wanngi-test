<template>
  <div>
    <v-list two-line flat>
      <v-subheader> {{ this.title }} </v-subheader>
      <template v-if="tasks.length>0">
        <v-list-item v-for="task in tasks" :key="task.id">
          <template>
            <v-list-item-action>
              <v-checkbox
                v-model="task.status"
                true-value="done"
                false-value="open"
                color="primary"
                @change="toggle(task)"
                ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title text--disabled> {{ task.title }} <span class="grey--text text--lighten-1">{{ task.tags.map(e=>e.title) }} </span> </v-list-item-title>
              <v-list-item-subtitle v-text="task.date"></v-list-item-subtitle>
            </v-list-item-content>
            <v-btn
              href=""
              @click.stop="deleteTask(task)"
              text
              >
              <v-icon color="grey" >mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </template>
      <template v-else>
        <p class="text--secondary text-center" > No itens added</p>
      </template>
    </v-list>
  </div>
</template>
<script>
import { eventBus } from '@/main.js'

export default {
  name: 'ToDoList',
  props:{
    title: String,
    tasks: Array,
    decoration: String,
  },
  methods:{
    toggle(task){
      eventBus.updateTask(task)
    },
    deleteTask(task) {
      eventBus.deleteTask(task)
    },
  }
}
</script>
