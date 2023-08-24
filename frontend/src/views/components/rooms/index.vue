<template>
    <v-container>
      <v-row>
        <v-col v-for="room in rooms" :key="room.id" cols="12" sm="6" md="4">
          <v-card class="pa-2" outlined>
            <v-card-title class="text-center">{{ room.title }}</v-card-title>
            <v-card-subtitle>Limit: {{ room.participant_limit }} participants</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import RoomPresenter from '@Presenters/room-presenter';

  export default {
    name: 'RoomList',
    data() {
      return {
          rooms: []
      };
    },
    created() {
        this.getRooms();
    },
    methods: {
      async getRooms() {
          await RoomPresenter.index()
          .then(response => {
            this.rooms = response;
          })
          .catch(error => {
            console.log(error)
          });
        console.log('rodou')
      }
    }
  }
  </script>
  
  <style scoped>
  .text-center {
    display: flex;
    justify-content: center;
  }

  * {
    background-color: transparent;
  }
  </style>
  