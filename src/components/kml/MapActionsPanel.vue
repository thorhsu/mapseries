<template>
  <div>
    <l-control position="topleft">
      <div class="map-actions-cont" v-show="isEditing">
        <div class="actions-main-button"
          @click="toggleMapActions"
        >
          <img src="../../assets/icons/map/tool-box.png">
        </div>

        <div 
          class="actions-expanded-cont" 
          v-show="openedMapActions"
        >
          <div class="actions-main-cont">
            <div :class="{'action-cont': true, 'forbidden': mapActionsActivity[index]}" 
              v-for="(mapAction, index) in mapActions" 
              :key="index"
              @mouseover="activateHover(index)"
              @mouseleave="deactivateHover(index)"
              @click="handleFunctionCall(mapAction.clickEvent, index)"
            >
              <img :src="require(`@/assets/icons/map/${mapActionsImage[index]}.png`)" />        
              <p>{{mapAction.text}}</p>
            </div>
          </div>

          <div class="actions-sub-cont" v-show="dragMode">
            <div class="drag-mode-cont">
              <div class="drag-action" @click="handleFunctionCall('clear')">
                <img src="@/assets/icons/map/close-circle.png" />            
                <p>取消變更</p>
              </div>
              <div class="drag-action" @click="handleFunctionCall('save')">
                <img src="@/assets/icons/map/check-circle.png" />
                <p>完成變更</p>
              </div>
            </div>
          </div>      
          <div :class="{'actions-sub-cont': true, 'delete-mode': deleteMode}" v-show="deleteMode">
            <div class="drag-mode-cont">
              <div class="drag-action" @click="handleFunctionCall('cancelDelete')">
                <img src="@/assets/icons/map/close-circle.png" />
                <p>取消變更</p>
              </div>
              <div class="drag-action" @click="handleFunctionCall('saveDelete')">
                <img src="@/assets/icons/map/check-circle.png" />            
                <p>完成變更</p>
              </div>
            </div>
          </div>      
        </div>      
      </div>
    </l-control>
    <el-dialog v-dialogDragAble :visible.sync="isDraw" @close="back" title="畫面工具"
          width="30%" center>
      <el-row type="flex" justify="space-around">
        <el-col class="text-center" :span="9">
          <el-button type="success" plain size="medium">
            <el-row style="margin-bottom: 10px">
              <el-col :span="24">
                輸入座標
              </el-col>                
            </el-row>
            
            <el-row>
              <el-col :span="24">
                <img src="@/assets/icons/map/keyboard.png" style="object-fit: scale-down" />
              </el-col>
            </el-row>              
          </el-button>
        </el-col>
        <el-col class="text-center" :span="9">
          <el-button type="success" plain size="medium" @click.stop.prevent="fire(true, functionName)">
            <el-row style="margin-bottom: 10px">
              <el-col :span="24">
                手動繪製
              </el-col>                
            </el-row>              
            <el-row>
              <el-col :span="24">
                <img src="@/assets/icons/map/pen-nib.png" style="object-fit: scale-down;" />                
              </el-col>
            </el-row>
          </el-button>            
        </el-col>              
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { LControl } from 'vue2-leaflet';
export default {
  name: "mapActionsPanel",
  props: {
    modifying: {
      type: Boolean,
      default: false,
    },
    isEditing: {
      type:Boolean,
      default: false
    }
  },
  watch: {
    // 如果離開編輯狀態，把activedIndex改為-1
    modifying (newVal) {
      if(!newVal){
        this.activedIndex = -1;
      }
    }
  },
  components: {
    LControl
  },
  computed: {
    mapActionsActivity() {
      return this.mapActions.map((action, index) => 
        this.activedIndex === -1? false : this.activedIndex !== index
      );
    },
    mapActionsImage() {
      return this.mapActions.map((action, index) => 
        this.activedIndex === -1 || this.activedIndex === index? this.mapActions[index].img : this.mapActions[index].imgDisabled          
      );
    },
  },
  data() {
    return {
      openedMapActions: false,
      dragMode: false,
      deleteMode: false,
      activedIndex: -1,
      isDraw: false,
      functionName: "",
      mapActions: [
        {
          img: "edit-location",
          imgUnhover: "edit-location",
          imgHover: "edit-location-a",
          imgDisabled: "edit-location-d",
          text: "校正模式",
          clickEvent: "calibrate"
        },
        {
          img: "hand-paper",
          imgUnhover: "hand-paper",
          imgHover: "hand-paper-a",
          imgDisabled: "hand-paper-d",
          text: "拖曳模式",
          clickEvent: "edit"
        },
        {
          img: "add-location",
          imgUnhover: "add-location",
          imgHover: "add-location-a",
          imgDisabled: "add-location-d",
          text: "畫點工具",
          clickEvent: "drawMarker"
        },
        {
          img: "linear-scale",
          imgUnhover: "linear-scale",
          imgHover: "linear-scale-a",
          imgDisabled: "linear-scale-d",
          text: "畫線工具",
          clickEvent: "drawLine"
        },
        {
          img: "area",
          imgUnhover: "area",
          imgHover: "area-a",
          imgDisabled: "area-d",
          text: "畫面工具",
          clickEvent: "drawPolygon"
        },
        {
          img: "save",
          imgUnhover: "save",
          imgHover: "save-a",
          imgDisabled: "save-d",
          text: "儲存檔案",
          clickEvent: "upload"
        },
        {
          img: "location-off",
          imgUnhover: "location-off",
          imgHover: "location-off-a",
          imgDisabled: "location-off-d",
          text: "刪除模式",
          clickEvent: "delete"
        },
        {
          img: "exit",
          imgUnhover: "exit",
          imgHover: "exit-a",
          imgDisabled: "exit-d",
          text: "離開",
          clickEvent: "exit"
        }
      ]
    };
  },
  methods: {
    toggleMapActions() {
      this.openedMapActions = !this.openedMapActions
      this.dragMode = false
    },
    back() {
      console.log("back");

    },
    activateHover (i) {
      this.mapActions[i].img = this.mapActions[i].imgHover
    },
    deactivateHover (i) {
      this.mapActions[i].img = this.mapActions[i].imgUnhover
    },
    fire(modifying, functionName) {
      // 關閉draw視窗      
      this.isDraw = false;
      // 控制是不是在編輯中
      this.$emit("update:modifying", modifying);
      // 事件控制
      this.$emit("handleFunctionCall", functionName);
    },
    handleFunctionCall(functionName, index=-1) {       
      let modifying = false;    
      let fire = true;  
      if(this.activedIndex === -1 && index !== -1){        
        // 開始動作
        modifying = true; 
        this.functionName = functionName;                     
        if(functionName === "edit" && this.dragMode === false) {
          // 拖曳模式
          this.dragMode = true
        } else if (functionName === "delete" && this.deleteMode === false) {
          // 刪除模式
          this.deleteMode = true
        } else if (functionName === "upload" || functionName==="exit") {
          // 這兩個不是編輯模式，modifying設為false
          modifying = false;
          index = -1;
        } else if (functionName === "drawMarker" || functionName==="drawLine" || functionName === "drawPolygon") {
          // 要先跳出視窗           
          fire = false;
          this.isDraw = true;
        }        
      } else if(this.activedIndex === index && index !== -1){
        // 相同時代表取消
        this.activedIndex = -1;
        // 如果是拖曳模式時是取消之前畫的        
        this.dragMode = false;
        this.deleteMode = false;                
        this.$emit("handleFunctionCall", "clear");
        fire = false;
        return;
      } else if(this.activedIndex !== index && index !== -1){ 
        // 如果已經在動作，又點其它功能，就什麼都不做
        modifying = true;      
        fire = false;
        return;
      } else {
        // 只剩下index === -1時了，代表是完成或取消
        this.dragMode = false;
        this.deleteMode = false;
      }
      this.activedIndex = index;
      if(fire){
        this.fire(modifying, functionName);        
      }
    }
  }
};
</script>

<style scoped>
  .el-button {
    width: 177px;
  }
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
  .forbidden{
    cursor: not-allowed;
  }

  .action-cont:hover p {
    color: #F2D36E;
  }
  . p {
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
  .delete-mode {
    transform: translateX(250px)
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