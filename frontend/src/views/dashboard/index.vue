<template>
  <div id="container">
    <h1>Book your room</h1>

    <div class="calendar">
      <FullCalendar />
    </div>
  </div>
</template>

<script>
import FullCalendar from '@Components/calendar';

export default {
  name: 'DashboardPage',
  components: {
    FullCalendar
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