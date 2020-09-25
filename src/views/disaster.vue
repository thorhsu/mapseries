<template>
  <div class="disaster-outer">
    <BannerMenu :title="banner.title" :visible="functionMenu.visible" @visible="changeVisible" />
    <div class="function-outer">
      <FunctionMenu v-if="functionMenu.visible" :dataList="functionMenu.data_list" />
      <div class="function-content">
        <div class="shadow" style="border-radius: 10px;">
          <DisasterAdd />
        </div>
        <div>
          789
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerMenu from '@/components/disaster/banner.vue'
import FunctionMenu from '@/components/disaster/functionMenu.vue'
import DisasterAdd from '@/components/disaster/disaster_add.vue'
export default {
  name: "Disaster",
  components: {
    BannerMenu,
    FunctionMenu,
    DisasterAdd
  },
  computed: {},
  data() {
    return {
      banner: {
        title: '災情填報系統'
      },
      functionMenu: {
        visible: true,
        data_list: []
      }
    };
  },
  mounted() {
    this.prepare_DataList();
  },
  methods: {
    prepare_DataList(){
      this.functionMenu.data_list.push("事件列表")
      this.functionMenu.data_list.push("其他表單1")
      this.functionMenu.data_list.push("其他表單2")
    },
    changeVisible(value){
      this.functionMenu.visible = value
    }
  }
};
</script>

<style scoped>
  .disaster-outer{
    background-color: #DFE9F0;
  }
  .function-outer {
    display: flex;
  }
  .function-content {
    width: 100%;
    height: auto;
    padding: 35px;
  }
</style>