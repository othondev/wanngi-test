import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import UUID from 'vue-uuid';
import Api from '@/services/api'

export const eventBus = new Vue({
  methods: {
    async updateTask(task){
      const api = new Api(this.token)
      const taskEdited = await api.setTaskStatus(task.id, task.status)
      this.$emit('update:task', taskEdited)
    },
    async deleteTask(task){
      const api = new Api(this.token)
      await api.deleteTask(task.id)
      this.$emit('delete:task', task)
    },
    async login(user){
      const api = new Api(this.token)
      const userData = await api.login(user)
      this.$emit('login:user', userData)
    },
    async info(user){
      const api = new Api(this.token)
      const userData = await api.info(user)
      this.$emit('info:user', userData)
    },
  }
})

Vue.config.productionTip = false
Vue.use(UUID);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
