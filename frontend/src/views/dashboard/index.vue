<template>
  <div id="container">
    <h1>Book your room</h1>

    <div class="rooms">
      <Rooms />
    </div>

    <div class="calendar">
      <FullCalendar />
    </div>
  </div>
</template>

<script>
import FullCalendar from '@Components/calendar';
import Rooms from '@Components/rooms'

export default {
  name: 'DashboardPage',
  components: {
    FullCalendar, Rooms
  },
}
</script>
  
<style scoped lang='scss'>
#container {
  padding: 10px;

  h1 {
    margin-bottom: 20px;
  }
}

.calendar {
  padding: 10px 20px;
}
</style>