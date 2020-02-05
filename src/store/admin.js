export default {
  state: {
    users: [{
      id: 1,
      firstname: 'Иван',
      lastname: 'Иванов',
      midname: 'Иванович',
      email: 'ivan@email.end',
      role: 'Пользователь',
      status: 'Подтвержден',
      limit: 200,
      order: false,
      calendarDates: {
        dateRange: {
          start: {
            date: '10.2.2020'
          },
          end: {
            date: '17.2.2020'
          }
        }
      },
      inputsDates: {
        start: '10.02.2020',
        end: '17.02.2020'
      }
      // start: '10/02/2020',
      // end: '17/02/2020'
    }, {
      id: 2,
      firstname: 'Петр',
      lastname: 'Петров',
      midname: 'Петрович',
      email: 'petr@email.end',
      role: 'Администратор',
      status: 'Подтвержден',
      limit: 200,
      order: true,
      calendarDates: {
        dateRange: {
          start: {
            date: false
          },
          end: {
            date: false
          }
        }
      },
      inputsDates: {
        start: '',
        end: ''
      }
      // start: '',
      // end: ''
    }, {
      id: 3,
      firstname: 'Волк',
      lastname: 'Волков',
      midname: 'Волкович',
      email: 'volk@email.end',
      role: 'Пользователь',
      status: 'Не подтвержден',
      limit: 200,
      order: true,
      calendarDates: {
        dateRange: {
          start: {
            date: false
          },
          end: {
            date: false
          }
        }
      },
      inputsDates: {
        start: '',
        end: ''
      }
      // start: '',
      // end: ''
    }]
  },
  mutations: {
    // SET_ALL_LIMIT(state, limit) {
    //   if (limit != '')
    //     for (let i = 0; i < state.users.length; i++) {
    //       state.users[i].limit = parseInt(limit)
    //     }
    // }
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
    // SET_ALL_LIMIT({commit}, limit) {
    //   commit('SET_ALL_LIMIT', limit)
    // },
    DELETE_USER({commit}, id) {
      commit('DELETE_USER', id)
    },
    SAVE_CHANGES({getters}) {
      console.log(getters.users);
    },
    ADD_USER({commit}, user) {
      // send to server
      commit('ADD_USER', user)
    }
  },
  getters: {
    users: state => state.users
  }
}