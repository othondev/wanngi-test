<template>
  <v-app>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
    <template v-if='!validToken'>
      <login-dialog></login-dialog>
    </template>
    <template v-else>
      <div>
        <v-app-bar
          color="primary"
          dark
          >
          Hi {{ user.login }}
          <v-spacer></v-spacer>

          <v-btn
            href=""
            @click="logout"
            text
            >
            <span class="mr-2">Logout</span>
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </v-app-bar>
      </div>
      <v-container>
        <v-container
          class="d-flex pa-2"
          outlined
          tile
        >
          <v-autocomplete
            ref="tagInput"
            v-model="tagsSelected"
            :items="tagsAvailable"
            item-text="title"
            item-value="_id"
            @keyup.enter="addTag"
            chips
            small-chips
            label="Tags"
            multiple
            ></v-autocomplete>
            <v-divider
              class="mx-4"
              vertical
              ></v-divider>
          <v-text-field ref="newTaskInput" v-model="newTask" placeholder= "Add new task" :rules="[!!newTask]" :loading="loading" :disabled="disabled" v-on:keyup.enter="addTask()"></v-text-field>
        </v-container>
        <v-divider></v-divider>
        <v-container class="d-flex pa-2" outlined tile>
          <v-btn
            href=""
            @click.stop="changeOrder"
            text
            >
            <v-icon color="grey" >{{ asc? 'mdi-arrow-up': 'mdi-arrow-down' }}</v-icon>
            Date
          </v-btn>
          <v-btn :class="[tagsFilter.map(e=>e._id).includes(tag._id)?'button-on':'']" v-for="tag in this.tagsAvailable.slice(0,5)" :key="tag._id"
            href=""
            @click.stop="filterByTag(tag)"
            text
            >
            {{ tag.title }}
          </v-btn>
        </v-container>
        
          <v-divider></v-divider>
          <to-do-list title='To Do' :tasks='this.toDoList'></to-do-list>
          <v-divider></v-divider>
          <to-do-list decoration='done' title='Done' :tasks='this.doneList'></to-do-list>
      </v-container>
    </template>
  </v-app>
</template>

<script>
import { eventBus } from '@/main.js'
import ToDoList from './components/ToDoList'
import LoginDialog from './components/LoginDialog'
import { uuid } from 'vue-uuid'
import Api from '@/services/api'

export default {
  name: 'App',
  components: {
    ToDoList,
    LoginDialog
  },
  data: () => ({
    tasks: [],
    newTask:"",
    loading: false,
    disabled: false,
    asc: false,
    tagsSelected:[],
    tagsAvailable:[],
    tagsFilter:[],
    user:{},
    token:null
  }),
  methods: {
    addTask(){
      const tagIds = this.tagsSelected
      const tags = this.tagsAvailable.filter(t=> tagIds.some(ts => ts === t._id))
      if(this.$refs.newTaskInput.validate()){
        const task = {
          title:this.newTask, 
          id: uuid.v1(), 
          status: 'open',
          date: new Date(),
          tags
        }
        const api = new Api(this.token)
        api.addTask(task).then( (t) => {
          this.tasks.push(t)
          this.newTask = ""
          this.tagsSelected = []
        }).catch( e => {
          console.error(e)
        })
      }
    },
    filterByTag(tag){
      const indexFound = this.tagsFilter.findIndex(e=> e._id === tag._id)
        if(indexFound > -1 ){
        this.tagsFilter = this.tagsFilter.filter((e,i)=> indexFound!==i)
      }else{
        this.tagsFilter.push(tag)
      }
    },
    changeOrder(){
      this.asc = !this.asc
    },
    addTag(){
      const tagRef = this.$refs.tagInput
      const tag = { title: tagRef.lazySearch, date: new Date()} 

      if(tagRef.lazySearch){
        const api = new Api(this.token)
        api.addTag(tag)
          .then( (t) =>{
            console.log({t})
            this.tagsAvailable.unshift(t)
            this.tagsSelected.unshift(t._id)
            
            tagRef.lazySearch = ""
          })
          .catch((e)=>{
            console.error(e)
          })

      }
    },
    logout(){
      this.user = {}
      this.token = ""
      this.tagsAvailable = []
      this.tasks = []
      localStorage.token = ""
    },
    async loadData(){
      const api = new Api(this.token)
      this.user = await api.info()
      this.tasks = await api.getTasks()
      this.tagsAvailable = await api.getTags()
    }
  },
  computed:{
    toDoList(){
      const ft = (task) => {
        if (this.tagsFilter.length === 0 ){
          return true
        }else{
          return task.tags.some( tags => this.tagsFilter.map(e=>e._id).includes(tags._id))
        }
      }

      return this.tasks
        .filter(t => t.status !== 'done')
        .filter(ft)
        .sort((a,b) => !this.asc ? new Date(a.date)-new Date(b.date) : new Date(b.date)-new Date(a.date))
    },
    doneList(){
      return this.tasks.filter(t => t.status === 'done')
    },
    validToken(){
      return !!this.token
    }
  },
  async created(){

    if(localStorage.token){
      this.token = localStorage.token
      this.loadData()
    }

    eventBus.$on('update:task', async ()=> {
      const api = new Api(this.token)
      this.tasks = await api.getTasks()
    })

    eventBus.$on('delete:task', (task)=> {
      this.tasks = this.tasks.filter(t => task.id !== t.id)
    })

    eventBus.$on('login:user', async (user)=> {
      this.token = user.token
      localStorage.token = user.token
      this.loadData()
    })

  }
}
</script>
<style scoped>
.button-on{
  background-color: grey;
}

</style>

