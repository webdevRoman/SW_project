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
      order: true,
      orderDates: {
        dateRange: {
          start: {
            date: '10.02.2020'
          },
          end: {
            date: '16.02.2020'
          }
        }
      }
      // start: '10/02/2020',
      // end: '16/02/2020'
    }, {
      id: 2,
      firstname: 'Петр',
      lastname: 'Петров',
      midname: 'Петрович',
      email: 'petr@email.end',
      role: 'Администратор',
      status: 'Подтвержден',
      limit: 200,
      order: false,
      orderDates: {
        dateRange: {
          start: {
            date: ''
          },
          end: {
            date: ''
          }
        }
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
      order: false,
      orderDates: {
        dateRange: {
          start: {
            date: ''
          },
          end: {
            date: ''
          }
        }
      }
      // start: '',
      // end: ''
    }]
  },
  mutations: {
    
  },
  actions: {
    
  },
  getters: {
    users: state => state.users
  }
}