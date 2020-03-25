<template>
	<vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8" collapseAction>
      <div class="vx-row p-4">
		    <form class="ml-1 w-full">
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
		    </form>

      </div>
    </vx-card>
</template>

<script>
export default {
  data() {
    return {
      file:''
    }
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/pages/login')
    }
  },
  methods: {
    submitForm(){
          let formData = new FormData();
          formData.append('file', this.file);

          this.axios.post('http://localhost:8000/api.php',
              formData,
              {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            }
          ).then(function(data){
            console.log(data.data);
          })
          .catch(function(){
            console.log('FAILURE!!');
          });
    },

    onChangeFileUpload(){
      this.file = this.$refs.file.files[0];
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