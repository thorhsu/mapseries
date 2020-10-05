<template>
  <div class="container mt-4">
    <div class="map-container border rounded">
      <div class="col-12">
        <ul class="nav row justify-content-center border-bottom">                                 
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{active: $route.params.kmlFile === 'example2' || !$route.params.kmlFile}"
              :to="'/kml/example2'"
            >example2</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{active: $route.params.kmlFile === 'example1' || !$route.params.kmlFile}"
              :to="'/kml/example1'"
            >example1</router-link>
          </li>
        </ul> 
      </div>
      <div class="row">
        <div class="col-12">  
            <Leaflet
              v-if="!isLoading"
              :fullscreenControl="true"
              :zoomControl="true"            
              :geoJsons.sync="geoJsons"
            ></Leaflet>          
        </div>
      </div>     
      
    </div>
    
  </div>
</template>

<script>
import Leaflet from "@/components/kml/Leaflet";
import { kml } from "togeojson";
import utils from '@/assets/js/utils.js';

export default {
  name: "Kml",
  components: {
    Leaflet,
  },
  computed: {   

  },
  data() {
    return {
      isLoading: true, 
      viewResult: false,      
      geoJson: {},   
      geoJsons: [],   
    };
  },
  mounted() {
    const { kmlFile } = this.$route.params;    
    this.getGeoJson(kmlFile, true);
    // this.geoJsons.push(this.geoJson);
  },
  beforeRouteUpdate(to, from, next) {    
    const { kmlFile } = to.params;    
    this.getGeoJson(kmlFile, true);            
    next();
  },
  updated(){    

  },
  methods: {
    async getKmlTxt(kmlFile) {
      let kmlTxt;
      await fetch(`/kml/${kmlFile}.kml`)
        .then(result => result.text())
        .then(text => kmlTxt = text); 
      return kmlTxt;
    },  
    async getGeoJson(file, isKml=true) {
      this.isLoading = true;
      this.geoJson = "";
      if(isKml) {
        var parsedKml = new DOMParser().parseFromString(await this.getKmlTxt(file), "text/xml");
        this.geoJson = {url: file, modified: false, file: file, 
                        isEditing: false, visible: true, 
                        geojson: kml(parsedKml)}; 
        let put = false;
        for(let i = 0 ; i < this.geoJsons.length ; i++) {
          // 如果沒有zIndex就設定zIndex
          if(!this.geoJsons[i].zIndex) {
            this.geoJsons[i]["zIndex"] = 400 + i;
          }
          if(this.geoJsons[i].file === this.geoJson.file) {
            put = true;     
            this.geoJsons[i] = this.geoJson;       
          }
        }
        if(!put) {
          const uuid = utils.uuid();
          this.geoJson["zIndex"] = 400 + this.geoJsons.length + 1;
          for(let feature of this.geoJson.geojson.features){
            feature.properties["uuid"] = uuid;
          }
          this.geoJson["uuid"] = uuid;
          this.geoJsons.push(this.geoJson);
        }        
      } else {
        //fetch remote geojson file method
      }
      this.isLoading = false;      
    },  
  }
};
</script>

<style scoped>
.map-container {
  width: 100%;
  float: left;
}


@media (min-width: 1200px)  {
  .container{
    max-width: 100%;
  }
}

a.active {
  border-bottom: 3px solid #007bff;
}
#left {
  width: 2%;
  float: left;
  height: 640px;
  text-align: center;
}
#left  .fas {
  margin-top: 320px;
  
}
</style>
