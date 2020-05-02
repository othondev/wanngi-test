import Axios from 'axios'
const { VUE_APP_API_URL:API_URL } = process.env

export default class Api {
  
  constructor(token) {
    this.axios = Axios.create({
      headers: {
          common: {
              'Access-Token': token,
          },
      },
    });
  }

  async addTask (task) {
    const {data=[]} = await this.axios.post(`http://${API_URL}/tasks`, task)
    return data
  }

  async getTasks(userId) {
    const {data=[]} = await this.axios.get(`http://${API_URL}/tasks`, {params: {userId}})
    return data
  }

  async deleteTask (id) {
    return this.axios.delete(`http://${API_URL}/tasks`, { data: {id}})
  }

  async setTaskStatus (id, status) {
    return this.axios.put(`http://${API_URL}/tasks`, {id, status})
  }

  async getTags (userId) {
    const {data=[]} = await this.axios.get(`http://${API_URL}/tasks/tags`, {params: {userId}})
    return data
  }

  async addTag(tag) {
    const {data=[]} = await this.axios.post(`http://${API_URL}/tasks/tags`, tag)
    return data
  }

  async login(user) {
    const {data=[]} = await this.axios.post(`http://${API_URL}/users/login`, user)
    return data
  }

  async info (user) {
    const {data=[]} = await this.axios.get(`http://${API_URL}/users/info`, user)
    return data
  }
}







