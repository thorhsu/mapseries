<template>
  <div>
    <div class="data-closed-cont" @click="toggleLayerPanel" v-show="!layerPanelExpanded">
      <img src="../../assets/icons/disaster-map/search-data.png" />
      <span>顯示資料</span>
    </div>

    <div class="data-expanded-cont" v-show="layerPanelExpanded">
      <div class="popup-background"></div>
      <div class="data-box-cont">
        <div class="data-action" @click="toggleLayerPanel" >
          <span>X</span>
          <!-- <img src="../../assets/icons/disaster-map/close.svg" /> -->
        </div>

        <div class="data-box">
          <div class="data-title">
            <p>test 2 2020-09-01~2020-09-02</p>
            <hr>
          </div>
          <form class="data-box-form">
            <div class="data-row">
              <input type="checkbox" id="rain" name="rain" value="rain" v-model="checkedData">
              <label for="rain">雨量</label>
              <hr>
            </div>
            <div class="data-row">
              <input type="checkbox" id="water" name="water" value="water" v-model="checkedData">
              <label for="water">水位</label>
              <hr>
            </div>
            <div class="data-row">
              <input type="checkbox" id="flood" name="flood" value="flood" v-model="checkedData">
              <label for="flood">淹水感測</label>
              <hr>
            </div>
            <div class="data-row">
              <input type="checkbox" id="tide" name="tide" value="tide" v-model="checkedData">
              <label for="tide">潮位</label>
              <hr>
            </div>
            <div class="data-row">
              <input type="checkbox" id="tide-layer" name="tide-layer" value="tide-layer" v-model="checkedData">
              <label for="tide-layer">累積雨量圖層</label>
              <hr>
            </div>
            <div class="data-row">
              <input type="checkbox" id="flood-layer" name="flood-layer" value="flood-layer" v-model="checkedData">
              <label for="flood-layer">淹水圖層</label>
              <hr>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mapLayerPanel",
  props: [],
  components: {},
  computed: {},
  data() {
    return {
      checkedData: [],
      layerPanelExpanded: false
    };
  },
  mounted() {},
  methods: {
    toggleLayerPanel(e) {
      e.preventDefault;
      this.layerPanelExpanded = !this.layerPanelExpanded
    }
  }
};
</script>

<style scoped>
  .data-closed-cont {
    background-color: #247262;
    color: white;
    height: 75px;
    width: 130px;
    border-top-left-radius: 35px;
    border-bottom-left-radius: 35px;
    padding: 10px 10px 10px 20px;
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 50vh;
    cursor: pointer;
  }
  .data-closed-cont img {
    height: 45px;
  }
  .data-closed-cont span {
    padding-left: 15px;
  }

  .data-expanded-cont {
    position: absolute;
    right: 0;
    top: 50vh;
  }
  .data-box-cont {
    display: flex;
  }
  .data-action {
    background-color: #247262;
    color: white;
    height: 75px;
    width: 60px;
    border-top-left-radius: 35px;
    border-bottom-left-radius: 35px;
    padding: 10px 10px 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
  }
  .data-box {
    border: 3px solid #247262;
    background-color: white;
    box-sizing: border-box;
    width: 300px;
  }
  .data-box-form label {
    margin-bottom: 0;
    margin-left: 15px;
  }
  .data-box-form {
    padding: 15px 15px 0 15px;
  }
  .data-title p {
    margin-bottom: 0;
    margin-top: 0;
    padding: 15px;
  }
  .data-title hr {
    margin-bottom: 0;
    margin-top: 0;
  }
  .popup-background {
    display: none;
  }

  @media screen and (max-width: 1280px) {
    .data-expanded-cont {
      top: 5vh;
    }
    .data-closed-cont {
      top: 40vh;
    }
  }

  @media screen and (max-width: 767px) {
    .data-expanded-cont {
      top: 10vh;
      width: 100%;
      /* transform: translate(0, 10vh); */
    }
    .data-box-cont {
      position: relative;
      width: 100%;
    }
    .data-box {
      width: 100%;
    }
    .data-action {
      background-color: transparent;
      color: #247262;
      position: absolute;
      right: 5px;
      top: -10px;
    }
    .popup-background {
      background-color: #080808;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0.7;
      display: block;
    }
  }
</style>
