<template>
  <div class="outer">
    <div class="popup-background" @click="closePopup" />
    <div class="form-cont-edit">
      <img src="@/assets/icons/close.svg" class="close-icon" @click="closePopup"/>
      <FaxDisasterAdd @addFaxDisaster="addFaxDisaster" />
    </div>
  </div>
</template>

<script>
import FaxDisasterAdd from '@/components/disaster/fax_disaster/add.vue'
const axios = require('axios');
export default {
  name: "disaster_popup",
  props: ['editData'],
  components: {
    FaxDisasterAdd
  },
  computed: {},
  data() {
    return {
      title: '傳真通報',
      form_info: [
        '雲林縣政府水利署',
        '地址：雲林縣斗六市雲林路二段 515 號',
        '電話：05-5522309，5522310',
        '傳真：05-5340546'
      ],
      form_data: {
        num: '',
        recipient: '',
        cc: '',
        sender: '',
        time: '',
        content: '',
        toGroup: '',
        toName: '',
        toDate: ''
      }
    };
  },
  mounted() {},
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    async addFaxDisaster(){

    },
  }
};
</script>

<style scoped>
  .outer{
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
  }
  /* Edit Popup */
  .popup-background {
    background-color: #080808;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.7;
  }
  .form-cont-edit {
    background-color: white;
    padding: 0;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    margin: 2vw;
    width: calc(100% - 4vw);
  }
  .close-icon {
    height: 20px;
    width: 20px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  @media (min-width: 768px) and (max-width: 1280px){}
  @media (max-width: 767px){}
</style>