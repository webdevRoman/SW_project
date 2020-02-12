import axios from 'axios'

export default {
  state: {
    users: []
  },
  mutations: {
    SET_USERS(state, data) {
      function formatDateCalendar(dateStr) {
        let dateArr = dateStr.split('.')
        if (dateArr[1].length > 1 && dateArr[1][0] == '0') {
          dateArr[1] = dateArr[1][1]
        }
        if (dateArr[2].length > 1 && dateArr[2][0] == '0') {
          dateArr[2] = dateArr[2][1]
        }
        return dateArr.join('.')
      }
      function formatDateInputs(dateStr) {
        let dateArr = dateStr.split('.')
        return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0]
      }
      let loadedUsers = []
      data.users.forEach(user => {
        let newUser = Object.assign({}, user)
        if (user.role == 'admin') {
          newUser.role = 'Администратор'
        } else if (user.role == 'user' || user.role == null) {
          newUser.role = 'Пользователь'
        } else if (user.role == 'banned') {
          newUser.role = 'Удален'
        }
        newUser.status = data.statuses[user.status].name
        if (user.start == null || user.end == null) {
          newUser.order = true
          newUser.calendarDates = {
            dateRange: {
              start: {
                date: false
              },
              end: {
                date: false
              }
            }
          }
          newUser.inputsDates = {
            start: '',
            end: ''
          }
        } else {
          newUser.order = false
          newUser.calendarDates = {
            dateRange: {
              start: {
                date: formatDateCalendar(user.start)
              },
              end: {
                date: formatDateCalendar(user.end)
              }
            }
          }
          newUser.inputsDates = {
            start: formatDateInputs(user.start),
            end: formatDateInputs(user.start)
          }
        }
        delete newUser.start
        delete newUser.end
        loadedUsers.push(newUser)
      })
      state.users = loadedUsers
    },
    DELETE_USER(state, id) {
      let arrIndex
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id == id) {
          arrIndex = i
          break
        }
      }
      state.users.splice(arrIndex, 1)
    },
    ADD_USER(state, user) {
      user.id = 999
      user.status = 'Не подтвержден'
      user.order = true
      user.calendarDates = {
        dateRange: {
          start: {
            date: false
          },
          end: {
            date: false
          }
        }
      }
      user.inputsDates = {
        start: '',
        end: ''
      }
      state.users.push(user)
    }
  },
  actions: {
    LOAD_USERS({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        axios({ url: '/backend/modules/admin/index', method: 'GET' })
        .then(resp => {
          commit('SET_USERS', resp.data)
          commit('SET_PROCESSING', false)
          resolve()
        })
        .catch(err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    CHANGE_USER_STATUS({commit}, user) {
      return new Promise((resolve, reject) => {
        // axios({ url: '/backend/modules/account/edit', data: { id: data.dish.id }, method: 'POST' })
        // .then(resp => {
        //   if (data.remove)
        //     commit('REMOVE_FAVOURITE', data.dish)
        //   else
        //     commit('ADD_FAVOURITE', data.dish)
        //   resolve()
        // })
        // .catch(err => {
        //   reject(err)
        // })
      })
    },
    DELETE_USER({commit}, id) {
      commit('DELETE_USER', id)
    },
    SAVE_CHANGES({getters}) {
      console.log(getters.users);
    },
    ADD_USER({commit}, user) {
      // send to server
      // commit('ADD_USER', user)
    }
  },
  getters: {
    users: state => state.users
  }
}