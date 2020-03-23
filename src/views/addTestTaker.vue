<template>
    <div>
        <vs-breadcrumb class="mb-5" :items="[{title: 'Home', url: ''}, {title: 'Test Assessments Manager', url: '/'}, {title: 'Add Test Taker', active: true}]" separator="chevron_right">
        </vs-breadcrumb>
        <div class="vx-card p-5">
            <h3 class="mb-3 text-primary">
                Add new Test Taker
            </h3>
            <form class="ml-1">
                <h5 class="mb-3 text-muted">
                    # Identity
                </h5>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-input class="w-full" label-placeholder="First Name" v-model="formInputs.fname" />
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-input class="w-full" label-placeholder="Last Name" v-model="formInputs.lname" />
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-input class="w-full" label-placeholder="Mail" v-model="formInputs.mail" />
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-input onblur="this.type='text'" onfocus="this.type='date'" class="w-full" label-placeholder="Birth Date" v-model="formInputs.birth_date" />
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-input class="w-full" label-placeholder="Mobile phone" v-model="formInputs.phone_nb_mobile" />
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-input type="text" class="w-full" label-placeholder="Other phone" v-model="formInputs.phone_nb_other" />
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-1/2 mb-2 mt-4">
                        <vs-select class="w-full" placeholder="Select nationality" v-model="formInputs.nationality">
                            <vs-select-item :value="item.value" :text="item.text" v-for="(item,index) in nationality" :key="index" />
                        </vs-select>
                    </div>
                    <div class="vx-col w-1/2 mb-2 mt-4">
                        <vs-select class="w-full" placeholder="Select mother tongue" v-model="formInputs.mother_tongue">
                            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in nationality" />
                        </vs-select>
                    </div>
                </div>

                <vs-divider/>
                <h5 class="mb-3 text-muted">
                    # Adress
                </h5>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-input class="w-full" label-placeholder="Adress" v-model="formInputs.adress" />
                    </div>
                    <div class="vx-col sm:w-1/2 w-full">
                        <vs-input type="text" class="w-full" label-placeholder="Adress complement" v-model="formInputs.adress2" />
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-input class="w-full" label-placeholder="ZIP Code" v-model="formInputs.zip_code" />
                    </div>
                    <div class="vx-col sm:w-1/2 w-full">
                        <vs-input class="w-full" label-placeholder="City" v-model="formInputs.city" />
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2 mt-4">
                        <vs-select class="w-full" placeholder="Select country" v-model="formInputs.country">
                            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in country" />
                        </vs-select>
                    </div>

                </div>
                <vs-divider/>
                <h5 class="mb-3 text-muted">
                    # Personnal records
                </h5>
                <div class="vx-row">
                    <div class="vx-col w-1/2 mb-2 mt-4">
                        <vs-select class="w-full" placeholder="Select document type" v-model="formInputs.id_doc_type">
                            <vs-select-item :value="item.value" :text="item.text" v-for="(item,index) in idType" :key="index" />
                        </vs-select>
                    </div>
                    <div class="vx-col w-1/2 mb-2 mt-4">
                        <vs-select class="w-full" placeholder="Select country" v-model="formInputs.country">
                            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in country" />
                        </vs-select>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-input class="w-full" label-placeholder="ID number" v-model="formInputs.id_doc_number" /> 
                    </div>
                </div>
                <!--
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <input type="file" name="photoID" ref="photoID" id="file" v-on:change="handleFileUpload()"/>
                        <label for="file" class="btn-1 mt-3 w-full text-center">UPLOAD ID PHOTO</label>                    
                    </div>
                    <div class="vx-col sm:w-1/2 w-full">
                        <input type="file" name="photoID" ref="photoID" id="file" v-on:change="handleFileUpload('photoID')"/>
                        <label for="file" class="btn-1 mt-3 w-full text-center">UPLOAD ID DOCUMENT</label>                      
                    </div> 
                </div>
                -->

                
                <div class="vx-row mt-5">
                    <div class="vx-col w-full">
                        <vs-button @click.prevent="submitForm()" class="mr-3 mb-2">Submit</vs-button>
                        <vs-button color="warning" type="border" class="mb-2" @click="form.input=''">Reset</vs-button>
                    </div>
                </div>
            </form>
        </div>        
    </div>
</template>
<script>

import axios from "axios";
import { ValidationProvider } from 'vee-validate';

export default {
    components: {
        ValidationProvider
    },
    data:()=>({
        country:[
            {text:'France',value:'France'},
            {text:'United Kingdom',value:'United Kingdom'},
            {text:'United States of America',value:'United States of America'},
            {text:'Poland',value:'Poland'},
            {text:'China',value:'China'},
            {text:'Italy',value:'Italy'},
            {text:'Netherland',value:'Netherland'},
            {text:'Russia',value:'Russia'},
            {text:'Japan',value:'Japan'},
        ],
        nationality:[
            {text:'French',value:'french'},
            {text:'English',value:'english'},
            {text:'Deutch',value:'deutch'},
            {text:'Italian',value:'Italian'},
            {text:'Spanish',value:'Spanish'},
            {text:'Chinese',value:'Chinese'},
            {text:'Japanese',value:'Japanese'},
            {text:'Russian',value:'Russian'},
            {text:'Canadian',value:'Canadian'},
        ],           
        idType:[
            {text:'Passport',value:'passport'},
            {text:'ID Card',value:'id_card'},
            {text:'Driver Licence',value:'driver_licence'},
	    ],
        formInputs:{
            request: 1,
            session_id: null,
            fname : '',
            lname : '',
            mail : '',
            birth_date : '',
            phone_nb_mobile : '',
            phone_nb_other : '',
            adress : '',
            adress2 : '',
            zip_code : '',
            city : '',
            country : '',
            nationality : '',
            mother_tongue : '',
            lmap_interface_lang : '',
            id_doc_type : '',
            id_doc_number : '',
            id_doc : '',
            user_photo : '',
        }
    }),
    beforeCreate: function () {
        if(!this.$session.exists()) {
            this.$router.push('/')
        }
      },
    mounted() {
        this.formInputs.session_id = Number(this.$session.get('session_id'))
    },
    methods: {
        submitForm() {
                if (this.formInputs.fname != '' && this.formInputs.lname != '' && this.formInputs.mail != '' && this.formInputs.birth_date != '' && this.formInputs.phone_nb_mobile != '' && this.formInputs.adress != '' && this.formInputs.zip_code != '' && this.formInputs.city != '' && this.formInputs.country != '' && this.formInputs.nationality != '' && this.formInputs.mother_tongue != '' && this.formInputs.id_doc_type != '' && this.formInputs.id_doc_number != '') {
                    var url='https://langaj.chronicstone.online/test-taker/'
                    var headers= {'Accept': 'application/json','Content-Type': 'application/x-www-form-urlencoded'}
                    console.log(this.formInputs)
                    axios.post(url, this.formInputs, headers)
                        .then(function (response) {
                            alert("Request success");
                        })
                        .catch(function (error) {
                            console.log(error);
                            alert("Request failed");
                        });
                } 
                else {
                    alert("Veuillez remplir les champs obligatoires");
                }
        },
        saveDoc() {
            console.log('true')
        },
        handleFileUpload(){
            console.log(this.$refs.photoID.files[0])
             this.formInputs.user_photo = this.$refs.photoID.files[0]; 
        },
        
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