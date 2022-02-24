<template>
  <MainLayout>
    <CalendarEvents :events="events" />
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout"
import CalendarEvents from "@/components/CalendarEvents"

export default {
  name: 'HomePage',
  components: {
    MainLayout,
    CalendarEvents
  },
  data() {
    return {
      events: [
        {
          id: 1,
          title: 'Коммуникационный дизайн среды',
          date: '2022-02-01T12:00:00+05:00',
          type: 'design'
        },
        {
          id: 1,
          title: 'Коммуникационный дизайн среды',
          date: '2022-02-01T16:00:00+05:00',
          type: 'frontend'
        },
        {
          id: 3,
          title: 'Коммуникационный дизайн среды',
          date: '2022-02-14T14:00:00+05:00',
          type: 'backend'
        },
      ]
    }
  }
}
</script>
