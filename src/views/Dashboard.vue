<template>
	<vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8" collapseAction>
      <div class="vx-row p-4">
		    <!-- <form class="ml-1 w-full">
          <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <input type="file" name="photoID" ref="photoID" id="file" v-on:change="handleFileUpload()"/>
                <label for="file" class="btn-1 mt-3 w-full text-center">UPLOAD ID PHOTO</label>                    
            </div>
          </div>

          <div class="vx-row mt-5">
            <div class="vx-col w-full">
                <vs-button @click.prevent="submitForm()" class="mr-3 mb-2">Submit</vs-button>
                <vs-button color="warning" type="border" class="mb-2" @click="form.input=''">Reset</vs-button>
            </div>
          </div>
		    </form> -->
        <div id="app">
          

        <vs-button @click="popupActive=true" color="primary" type="border">Open Default popup</vs-button>

        <vs-popup class="holamundo" title="Image sizing" :active.sync="popupActive">
          <vue-avatar
            :width="width"
            :height="height"
            :rotation="rotation"
            :scale="scale"
            ref="vueavatar"
            class="flex justify-center"
            @vue-avatar-editor:image-ready="onImageReady">
          </vue-avatar>
          <br/>

          <div class="w-full mt-4 flex justify-center">
            <label ckass="w-1/2 pt-4">Set scale</label>
            <vs-slider class="w-1/2 ml-8 bg-success rounded" color="success" v-model="scale"/>
          </div>
          <br/>
          <div class="w-full mt-4 flex justify-center">
            <label ckass="w-1/2 pt-4">Set rotation</label>
            <vs-slider class="w-1/2 ml-8 bg-success rounded" color="success" v-model="rotation"/>
          </div>
          <br>
          <vs-button class="w-1/2" style="margin-left:25%;" v-on:click="saveClicked">Resize and save</vs-button>
        </vs-popup>

        <vs-button @click="popupActive2=true" color="primary" type="border">Open Default popup</vs-button>
        <vs-popup class="holamundo" title="Image sizing" :active.sync="popupActive2">
          <vue-avatar
            :width="width"
            :height="height"
            :rotation="rotation"
            :scale="scale"
            ref="vueavatar"
            class="flex justify-center"
            @vue-avatar-editor:image-ready="onImageReady">
          </vue-avatar>
          <br/>

          <div class="w-full mt-4 flex justify-center">
            <label ckass="w-1/2 pt-4">Set scale</label>
            <vs-slider class="w-1/2 ml-8 bg-success rounded" color="success" v-model="scale"/>
          </div>
          <br/>
          <div class="w-full mt-4 flex justify-center">
            <label ckass="w-1/2 pt-4">Set rotation</label>
            <vs-slider class="w-1/2 ml-8 bg-success rounded" color="success" v-model="rotation"/>
          </div>
          <br>
          <vs-button class="w-1/2" style="margin-left:25%;" v-on:click="saveClicked">Resize and save</vs-button>
        </vs-popup>

        <br/>
        <avatar size="100" class="mt-8 rounded" :username="name+' '+name2"></avatar>

        </div>
      </div>
    </vx-card>
</template>

<script>

import {VueAvatar, VueAvatarScale} from 'vue-avatar-editor-improved'
import Avatar from 'vue-avatar'

export default {
  components: {
    VueAvatarScale,
    VueAvatar,
    Avatar
  },
  data() {
    return {
      file1:'',
      width:200,
      height:200,
      rotation: 0,
      scale: 1,
      borderRadius: 0,
      popupActive:false,
      popupActive2:false,
      name: "cyp",
      name2: "thao"
    }
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/pages/login')
    }
  },
  methods: {
    saveClicked: function saveClicked() {
      if(this.$refs.vueavatar.getImageScaled() != null) {
        var img = this.$refs.vueavatar.getImageScaled();
        this.file1 = img.toDataURL()
        this.$refs.image.src = img.toDataURL()
      }
    },
    onImageReady: function onImageReady() {
        this.scale = 1;
        this.rotation = 0;
    }
  }
}
</script>


<style scoped>
[type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

[type="file"] + label {
  background: rgb(57, 151, 192);
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: 'Poppins', sans-serif;
  font-size: inherit;
  font-weight: 600;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 50px;
  position: relative;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  vertical-align: middle;
}
[type="file"] + label:hover {
  background-color: #d3460d;
}
[type="file"] + label.btn-1 {
  background-color: rgb(57, 151, 192);
  box-shadow: 0 6px rgb(21, 83, 109);
  -webkit-transition: none;
  transition: none;
}
[type="file"] + label.btn-1:hover {
  box-shadow: 0 4px rgb(21, 83, 109);
  top: 2px;
}
</style>