<template>
  <div class="map-sidePanel-cont">
    <div class="sidePanel-title-cont">
      <p>工程表單</p>
      <hr>
    </div>

    <div class="sidePanel-events-cont">
      <div class="event-cont" 
        v-for="(event, index) in events" 
        :key="index"
      >
        <div class="event-row">
          <p class="event-name">{{event.eventName}}</p>
          <p class="event-time">{{event.time.start}} ~ {{event.time.end}}</p>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mapSidePanel",
  props: [],
  components: {},
  computed: {},
  data() {
    return {
      events: [
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        },
        {
          time: {
            start: '2020-08-04',
            end: '2020-08-06'
          },
          eventName: '雲林辦事處測試'
        }
      ],
    };
  },
  methods: {
  }
};
</script>

<style scoped>
  .map-sidePanel-cont {
    width: 250px;
    height: 450px;
    background-color: white;
    padding: 20px 0;
    border-radius: 10px;
    margin: 15px;
    padding-right: 10px;
  }
  .sidePanel-title-cont {
    margin: 0 15px;
  }
  .sidePanel-events-cont {
    margin: 0 15px;
    overflow-y: auto;
    height: 350px;
    margin-right: 5px;
  }
  .event-row {
    margin-right: 10px;
    cursor: pointer;
    border-left: 3px solid transparent;
  }
  .event-row:hover {
    background-color: #F4F8FB;
    border-left: 3px solid #FFC401;
  }
  .event-row p {
    margin-bottom: 0;
  }
  .event-name {
    padding-top: 10px;
    padding-left: 10px;
  }
  .event-time {
    color: #A0A0A0;
    font-size: 14px;
    padding-bottom: 10px;
    padding-left: 10px;
  }
  .event-cont hr {
    margin: 0;
  }

  /* ScrollBar */
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #D1D1D1;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
</style>