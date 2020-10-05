<template>
  <div class="map-actions-cont">
    <div class="actions-main-button"
      @click="toggleMapActions"
    >
      <img src="@/assets/icons/map/tool-box.png">
    </div>

    <div 
      class="actions-expanded-cont" 
      v-show="openedMapActions"
    >
      <div class="actions-main-cont">
        <div class="action-cont" 
          v-for="(mapAction, index) in mapActions" 
          :key="index"
          @mouseover="activateHover(index)"
          @mouseleave="deactivateHover(index)"
          @click="handleFunctionCall(mapAction.clickEvent)"
        >
          <img v-bind:src="require(`@/assets/icons/map/${mapAction.img}.png`)" />        
          <p>{{mapAction.text}}</p>
        </div>
      </div>

      <div class="actions-sub-cont" v-show="dragMode">
        <div class="drag-mode-cont">
          <div class="drag-action" @click="handleFunctionCall('clear')">
            <img src="@/assets/icons/map/check-circle.png" />
            <p>取消變更</p>
          </div>
          <div class="drag-action" @click="handleFunctionCall('save')">
            <img src="@/assets/icons/map/close-circle.png" />
            <p>完成變更</p>
          </div>
        </div>
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
      dragMode: false,
      mapActions: [
        {
          img: "edit-location",
          imgUnhover: "edit-location",
          imgHover: "edit-location-a",
          text: "校正模式",
          clickEvent: "calibrate"
        },
        {
          img: "hand-paper",
          imgUnhover: "hand-paper",
          imgHover: "hand-paper-a",
          text: "拖曳模式",
          clickEvent: "edit"
        },
        {
          img: "add-location",
          imgUnhover: "add-location",
          imgHover: "add-location-a",
          text: "畫點工具",
          clickEvent: "drawMarker"
        },
        {
          img: "linear-scale",
          imgUnhover: "linear-scale",
          imgHover: "linear-scale-a",
          text: "畫線工具",
          clickEvent: "drawLine"
        },
        {
          img: "area",
          imgUnhover: "area",
          imgHover: "area-a",
          text: "畫面工具",
          clickEvent: "drawPoligon"
        },
        {
          img: "save",
          imgUnhover: "save",
          imgHover: "save-a",
          text: "儲存檔案",
          clickEvent: ""
        },
        {
          img: "location-off",
          imgUnhover: "location-off",
          imgHover: "location-off-a",
          text: "刪除模式",
          clickEvent: ""
        },
        {
          img: "exit",
          imgUnhover: "exit",
          imgHover: "exit-a",
          text: "離開",
          clickEvent: ""
        }
      ]
    };
  },
  methods: {
    toggleMapActions() {
      this.openedMapActions = !this.openedMapActions
      this.dragMode = false
    },
    activateHover (i) {
      this.mapActions[i].img = this.mapActions[i].imgHover
    },
    deactivateHover (i) {
      this.mapActions[i].img = this.mapActions[i].imgUnhover
    },
    handleFunctionCall(functionName) {
      if (functionName==="edit" && this.dragMode === false) {
        this.dragMode = true
      }
      else if (functionName==="edit" && this.dragMode === true) {
        this.dragMode = false
        this.$emit("handleFunctionCall", "clear")
        return
      }
      else if (functionName==="clear" || functionName==="save") {
        this.dragMode = false
      }
      
      this.$emit("handleFunctionCall", functionName)
    }
  }
};
</script>

<style scoped>

  .map-actions-cont {
    display: flex;
    align-items: flex-start;
    position: relative;
    padding: 15px;
  }
  .actions-main-button {
    height: 85px;
    width: 85px;
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
    position: absolute;
    left: 50px;
    top: 20px;
  }
  .actions-main-cont {
    display: flex;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 13px 10px 11px 45px;
    border-radius: 15px;
  }
  .action-cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin: 0 8px;
    cursor: pointer;
    width: 50px;
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

  /* Drag Mode */
  .actions-sub-cont {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 12px 0;
    border-radius: 15px;
    width: 300px;
    margin-left: 25px;
    margin-top: 15px;
  }
  .drag-mode-cont {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .drag-action {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin: 0 8px;
    cursor: pointer;
  }
  .drag-action img {
    height: 25px;
  }
  .drag-action p {
    margin-bottom: 0;
    color: white;
    margin-left: 10px;
  }

  @media screen and (max-width: 768px) {
    .actions-main-cont {
      flex-direction: column;
      left: 20px;
      top: 35px;
      padding: 60px 3px 15px 3px;
    }
    .actions-expanded-cont {
      display: flex;
      left: 20px;
      top: 40px;
    }
    .action-cont {
      margin: 6px 8px;
    }
    .actions-sub-cont {
      width: auto;
      height: 175px;
      display: flex;
      margin-left: 15px;
      margin-top: 120px;
    }
    .drag-mode-cont {
      flex-direction: column;
    }
    .drag-action {
      flex-direction: column;
      
    }
    .drag-action p {
      margin-bottom: 10px;
      margin-left: 0;
    }
  }
</style>