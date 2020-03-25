<template>
    <div>
        <vs-breadcrumb class="mb-5" :items="[{title: 'Home', url: '/'}, {title: 'Candidates', url: '/candidates'}, {title: 'New candidate', url: '/AddTestTaker', active: true}]" separator="chevron_right"></vs-breadcrumb>
        <div class="vx-card p-5">
            <h3 class="mb-3 text-primary">
                Add new Test Taker
            </h3>
            <form class="ml-1" v-if="this.isMounted === true">
                <h5 class="mb-3 text-muted">
                    # Identity
                </h5>
                <div class="vx-row">
                    <div clas="vx-col  w-1/2 mb-2">
                        <ul class="centerx flex justify-center w-full ml-3">
                            <label>Select gender : </label>
                            <li class="mr-8 ml-4">
                                <vs-radio v-model="formInputs.gender" vs-value="Male"> <font-awesome-icon icon="male" class="mr-2 txt-male" />Male</vs-radio>
                            </li>
                            <li>
                                <vs-radio v-model="formInputs.gender" vs-value="Female"><font-awesome-icon icon="female" class="mr-2 txt-female" />Female</vs-radio>
                            </li>
                        </ul>
                    </div> 
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <ValidationProvider name="First name" :rules="{ required: true, alpha: true }" v-slot="{ errors }">
                            <vs-input class="w-full" :color="setInputColor(errors)" label-placeholder="First Name *" v-model="formInputs.fname" />
                            <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0"> 
                                <span>{{ errors[0] }}</span>
                            </vs-alert>
                        </ValidationProvider>
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <ValidationProvider name="Last name" :rules="{ required: true, alpha: true }" v-slot="{ errors }">
                            <vs-input class="w-full" :color="setInputColor(errors)" label-placeholder="Last Name *" v-model="formInputs.lname" />
                            <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0"> 
                                <span>{{ errors[0] }}</span>
                            </vs-alert>
                        </ValidationProvider>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <ValidationProvider name="Email" :rules="{ required: true, email: true }" v-slot="{ errors }">
                            <vs-input class="w-full" :color="setInputColor(errors)" label-placeholder="Mail address *" v-model="formInputs.mail" autocomplete="nope"/>
                            <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0"> 
                                <span>{{ errors[0] }}</span>
                            </vs-alert>
                        </ValidationProvider>
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mt-3 mb-2">
                        <datepicker class="mt-2" v-model="formInputs.birth_date" placeholder="Select Birth Date"></datepicker>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <ValidationProvider name="Mobile phone" :rules="{ required: false, numeric: true }" v-slot="{ errors }">
                            <vs-input class="w-full" :color="setInputColor(errors)" label-placeholder="Mobile phone" v-model="formInputs.phone_nb_mobile" />
                            <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0"> 
                                <span>{{ errors[0] }}</span>
                            </vs-alert>
                        </ValidationProvider>
                    </div>
                    <div class="vx-col sm:w-1/2 w-full mb-2">
                        <ValidationProvider name="Other phone" :rules="{ required: false, numeric: true }" v-slot="{ errors }">
                            <vs-input type="text" class="w-full" :color="setInputColor(errors)" label-placeholder="Other phone" v-model="formInputs.phone_nb_other" />
                            <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0"> 
                                <span>{{ errors[0] }}</span>
                            </vs-alert>
                        </ValidationProvider>
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col w-1/2 mb-2 mt-4">
                        <v-select class="dropInput" v-model="formInputs.nationality" placeholder="Select nationality" :options="nationality" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                    </div>
                    <div class="vx-col w-1/2 mb-2 mt-4">
                        <v-select class="dropInput" v-model="formInputs.mother_tongue" placeholder="Select mother tongue" :options="nationality" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
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
                    <div class="vx-col sm:w-1/2 w-full mb-2 mt-3">
                        <v-select class="mt-2 dropInput" v-model="formInputs.country" placeholder="Select country *" :options="listCountries" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                    </div>

                </div>
                <vs-divider/>
                <h5 class="mb-3 text-muted">
                    # Personnal records
                </h5>
                <div class="vx-row">
                    <div class="vx-col w-1/2 mb-2 mt-3 ">
                        <v-select class="mt-2 dropInput" v-model="formInputs.id_doc_type" placeholder="Select ID type" :options="idType" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                    </div>
                    <div class="vx-col w-1/2 mb-2">
                        <vs-input class="w-full" label-placeholder="ID number" v-model="formInputs.id_doc_number" /> 
                    </div>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-2">
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

            <vs-alert v-if="errForm === true && (this.formInputs.gender === '' || this.formInputs.fname === '' || this.formInputs.lname === '' || this.formInputs.mail === '' || this.formInputs.country === '')" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0"> 
                <ul class="flex">
                    <span class="mr-4">The following fields need to be filled :</span>
                    <li v-if="formInputs.gender === ''">
                        <b>Gender</b>
                        <span class="ml-4 mr-4">|</span>
                    </li>
                    <li v-if="formInputs.fname === ''">
                        <b>First Name</b>
                        <span class="ml-4 mr-4">|</span>
                    </li>                    
                    <li v-if="formInputs.lname === ''">
                        <b>Last Name</b>
                        <span class="ml-4 mr-4">|</span>

                    </li>                    
                    <li v-if="formInputs.mail === ''">
                        <b>Mail adress</b>
                        <span class="ml-4 mr-4">|</span>

                    </li>                    
                    <li v-if="formInputs.country === ''">
                        <b>Country</b>
                    </li>
                </ul>
            </vs-alert>
        </div>        
    </div>
</template>
<script>

import axios from "axios";
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker';



export default {
    components: {
        'v-select': vSelect,
        Datepicker
    },
    data:()=>({
        isMounted:false,
        errForm:false,
        listCountries:[],        
        listLanguages:[],
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
            {id : 0, label:'French'},
            {id : 1, label:'English'},
            {id : 2, label:'Deutch'},
            {id : 3, label:'Italian'},
            {id : 4, label:'Spanish'},
            {id : 5, label:'Chinese'},
            {id : 6, label:'Japanese'},
            {id : 7, label:'Russian'},
            {id : 8, label:'Canadian'},
        ],           
        idType:[
            {id: 0, label:'Passport'},
            {id: 1, label:'ID Card'},
            {id: 2, label:'Driver Licence'},
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
            gender: '',
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
            this.$router.push('/pages/login')
        }
      },
    mounted() {
        this.formInputs.session_id = Number(this.$session.get('session_id')) /*
        axios
            .get('https://restcountries.eu/rest/v2/all?fields=name;')
            .then(response => {
                for(var i = 0; i < response.data.length; i++) {
                    this.listCountries[i] = {'id' : i, 'label' : response.data[i].name}
                }
            }) */
        var CountriesReq = axios.get('https://restcountries.eu/rest/v2/all?fields=name;')
        var LanguagesReq = axios.get('https://restcountries.eu/rest/v2/all?fields=languages;')
        axios.all([CountriesReq, LanguagesReq])
        .then(axios.spread((...responses) => {
            for(var i = 0; i < responses[0].data.length; i++) {
                this.listCountries[i] = {'id' : i, 'label' : responses[0].data[i].name}
            }
            for(var j = 0; j < responses[1].data.length; j++) {
                if(responses[1].data[j].languages.length > 1) {
                    var indexData = j
                    for(var k = 0; k<responses[1].data[indexData].languages.length; k++) {
                        this.listLanguages[j] = {'id' : j, 'label' : responses[1].data[indexData].languages[k].name}
                        j++
                    }
                }
                else {
                    this.listLanguages[j] = {'id' : j, 'label' : responses[1].data[j].languages[0].name}
                }
            }
            this.isMounted = true

        }))
        .catch(errors => {
            console.log(errors)
        })

    },
    methods: {
        submitForm() {
            if (this.formInputs.gender != '' && this.formInputs.fname != '' && this.formInputs.lname != '' && this.formInputs.mail != '' && this.formInputs.country != '') {
                this.setFinalValue() 
                var url='https://langaj.chronicstone.online/test-taker/'
                var headers= {'Accept': 'application/json','Content-Type': 'application/x-www-form-urlencoded'}
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
                this.errForm = true
            }
        },
        saveDoc() {
            console.log('true')
        },
        handleFileUpload(){
             this.formInputs.user_photo = this.$refs.photoID.files[0]; 
        },
        setInputColor(err) {
            if (err[0] != null) return 'danger'
        },
        setFinalValue() {
            this.formInputs.country = this.formInputs.country.label
            this.formInputs.mother_tongue = this.formInputs.mother_tongue.label
            this.formInputs.nationality = this.formInputs.nationality.label
            this.formInputs.id_doc_type = this.formInputs.id_doc_type.label
            this.formInputs.birth_date = this.formInputs.birth_date.getFullYear()+'-'+(this.formInputs.birth_date.getMonth()+1)+'-'+this.formInputs.birth_date.getDate();

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