<template>
  <div class="map-actions-cont">
    <div class="actions-main-button"
      @click="toggleMapActions"
    >
      <img src="../../assets/icons/map/tool-box.png">
    </div>

    <div 
      class="actions-expanded-cont" 
      v-show="openedMapActions"
    >
      <div class="action-cont" 
        v-for="(mapAction, index) in mapActions" 
        :key="index"
        @mouseover="activateHover(index)"
        @mouseleave="deactivateHover(index)"
      >
        <img v-bind:src="require(`@/assets/icons/map/${mapAction.img}.png`)" />        
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
          img: "edit-location",
          imgHover: "edit-location-a",
          text: "校正模式"
        },
        {
          img: "hand-paper",
          imgHover: "hand-paper-a",
          text: "拖曳模式"
        },
        {
          img: "add-location",
          imgHover: "add-location-a",
          text: "畫點工具"
        },
        {
          img: "linear-scale",
          imgHover: "linear-scale-a",
          text: "畫線工具"
        },
        {
          img: "area",
          imgHover: "area-a",
          text: "畫面工具"
        },
        {
          img: "save",
          imgHover: "save-a",
          text: "儲存檔案"
        },
        {
          img: "location-off",
          imgHover: "location-off-a",
          text: "刪除模式"
        },
        {
          img: "exit",
          imgHover: "exit-a",
          text: "離開"
        }
      ]
    };
  },
  methods: {
    toggleMapActions() {
      this.openedMapActions = !this.openedMapActions
    },
    activateHover (i) {
      this.mapActions[i].img = this.mapActions[i].imgHover
    },
    deactivateHover (i) {
      this.mapActions[i].img = this.mapActions[i].img.slice(0, -2)
    }
  }
};
</script>

<style scoped>

  .map-actions-cont {
    display: flex;
    align-items: center;
    position: relative;
    padding: 15px;
  }
  .actions-main-button {
    height: 80px;
    width: 80px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  .actions-main-button img {
    height: 100%;
    width: 100%;
  }
  .actions-expanded-cont {
    display: flex;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 12px 10px 10px 45px;
    border-radius: 15px;
    position: absolute;
    left: 45px;
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
  .action-cont img {
    height: 30px;
    padding-bottom: 2px;
  }
  .action-cont p {
    margin-bottom: 0;
    color: white;
  }
  .action-cont:hover p {
    color: #F2D36E;
  }

  @media screen and (max-width: 768px) {
    .actions-expanded-cont {
      flex-direction: column;
      left: 18px;
      top: 35px;
      padding: 60px 3px 15px 3px;
    }
    .action-cont {
      margin: 6px 8px;
    }
  }
</style>