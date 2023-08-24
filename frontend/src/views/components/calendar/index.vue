<template>
  <div class="container">
    <FullCalendar ref="calendar" :events="data" :config="config" @event-selected="crudSelect"
      @event-created="e => crudSelect(e)" />
  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar';
import 'fullcalendar/dist/locale/pt-br';
import 'fullcalendar/dist/fullcalendar.css';

export default {
  components: { FullCalendar },
  data() {
    return {
      user: {},
      calendarEvents: [
        { title: 'Evento 1', start: '2023-08-01' },
        { title: 'Evento 2', start: '2023-08-15' }
      ],
      data: [],
      config: {
        defaultView: 'month',
        editable: false,
        selectable: true,
        nextDayThreshold: '23:59:01',
        slotLabelFormat: 'HH:mm',
        columnHeaderFormat: 'dddd\nDD/MM',
        allDaySlot: false,
        height: 'auto',
        slotDuration: '00:15:00',
        nowIndicator: true,
        viewRender: () => {
          this.loadEvents();
          this.getSchedules();
        },
        eventMouseover: this.showTooltip,
        eventMouseout: this.closeTooltip
      },
    };
  },
  methods: {
    crudSelect() {

    },
    async loadEvents() {
      const calendar_view = this.$refs.calendar.fireMethod('getCalendar').view;
      const request_body = {
        
      };
    },
    async getSchedules() {
      const calendar_view = this.$refs.calendar.fireMethod('getCalendar').view;
      const request_body = {
        
      };
    }
  }
};
</script>

<style>
.container {
  padding: 20px 40px;
  background-color: #f4f4f4;
  border-radius: 10px;
}
</style>