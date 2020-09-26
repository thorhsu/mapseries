<template>
  <div class="map-actions-cont">
    <div class="actions-main-button"
      @click="toggleMapActions"
    >
      <img src="https://fakeimg.pl/30/">
    </div>

    <div 
      class="actions-expanded-cont" 
      v-show="openedMapActions"
    >
      <div class="action-cont" 
        v-for="(mapAction, index) in mapActions" 
        :key="index"
      >
        <img v-bind:src="mapAction.img" />
        <p>{{mapAction.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mapActionsPanel",
  props: [],
  components: {},
  computed: {},
  data() {
    return {
      openedMapActions: false,
      mapActions: [
        {
          img: "https://fakeimg.pl/30/",
          text: "校正模式"
        },
        {
          img: "https://fakeimg.pl/30/",
          text: "校正模式"
        },
        {
          img: "https://fakeimg.pl/30/",
          text: "校正模式"
        },
        {
          img: "https://fakeimg.pl/30/",
          text: "校正模式"
        },
        {
          img: "https://fakeimg.pl/30/",
          text: "校正模式"
        },
        {
          img: "https://fakeimg.pl/30/",
          text: "校正模式"
        },
        {
          img: "https://fakeimg.pl/30/",
          text: "校正模式"
        },
        {
          img: "https://fakeimg.pl/30/",
          text: "校正模式"
        }
      ]
    };
  },
  methods: {
    toggleMapActions() {
      this.openedMapActions = !this.openedMapActions
    }
  }
};
</script>

<style scoped>

  .map-actions-cont {
    display: flex;
    align-items: center;
    position: relative;
    margin: 15px;
  }
  .actions-main-button {
    background-color: #FFC401;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  .actions-expanded-cont {
    display: flex;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 12px 10px 10px 45px;
    border-radius: 15px;
    position: absolute;
    left: 25px;
  }
  .action-cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin: 0 8px;
    cursor: pointer;
  }
  .action-cont p {
    margin-bottom: 0;
    color: white;
  }

  @media screen and (max-width: 768px) {
    .actions-expanded-cont {
      flex-direction: column;
      left: 0;
      top: 20px;
      padding: 60px 3px 15px 3px;
    }
    .action-cont {
      margin: 6px 8px;
    }
  }
</style>