<template>
    <div v-if="this.isMounted === true">
        <vs-breadcrumb class="mb-5" :items="[{title: 'Home', url: '/'}, {title: 'Candidates', url: '/candidates'}, {title: 'New candidate', url: '/AddTestTaker', active: true}]" separator="chevron_right"></vs-breadcrumb>
        <div class="vx-card p-5">
            <h3 class="mb-3 text-primary" v-if="$route.params.id == null">
                Add new Test Taker
            </h3>
            <h3 class="mb-3 text-primary" v-if="$route.params.id != null">
                Edit Test Taker
            </h3>
            <ValidationObserver ref="form">
                <form class="ml-1" @submit.prevent="onSubmit">
                    <h5 class="mb-3 text-muted">
                        # Identity
                    </h5>
                    <div class="vx-row">
                        <div clas="vx-col  w-1/2 mb-2">
                            <ValidationProvider name="Gender" :rules="{ required: true }" v-slot="{ errors }">
                                <ul class="centerx flex justify-center w-full ml-3">
                                    <label>Select gender : </label>
                                    <li class="mr-8 ml-4">
                                        <vs-radio v-model="formInputs.gender" vs-value="male"> <font-awesome-icon icon="male" class="mr-2 txt-male" />Male</vs-radio>
                                    </li>
                                    <li>
                                        <vs-radio v-model="formInputs.gender" vs-value="female"><font-awesome-icon icon="female" class="mr-2 txt-female" />Female</vs-radio>
                                    </li>
                                </ul>
                                <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0 ml-4 mb-2"> 
                                    <span>{{ errors[0] }}</span>
                                </vs-alert>
                            </ValidationProvider>
                        </div> 
                    </div>
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <ValidationProvider name="First name" :rules="{ required: true, alpha: true }" v-slot="{ errors }">
                                <vs-input class="w-full" :color="setInputColor(errors)" label-placeholder="First Name *" v-model="formInputs.first_name" />
                                <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0"> 
                                    <span>{{ errors[0] }}</span>
                                </vs-alert>
                            </ValidationProvider>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <ValidationProvider name="Last name" :rules="{ required: true, alpha: true }" v-slot="{ errors }">
                                <vs-input class="w-full" :color="setInputColor(errors)" label-placeholder="Last Name *" v-model="formInputs.last_name" />
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
                            <ValidationProvider name="Birth date" :rules="{ required: true }" v-slot="{ errors }">
                                <datepicker class="mt-2" v-model="formInputs.birth_date" placeholder="Select Birth Date"></datepicker>
                                <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0"> 
                                    <span>{{ errors[0] }}</span>
                                </vs-alert>
                            </ValidationProvider>
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
                            <button type="submit" class="vs-button bg-success mr-3 mb-2">Submit</button>
                            <button type="reset" class="mb-2 vs-button border bg-warning">Reset</button>
                        </div>
                    </div>
                </form>
            </ValidationObserver>
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
        listCountries:[],        
        listLanguages:[],
        copyUserData:[],
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
            candidate_id: null,
            session_id: null,
            first_name : '',
            last_name : '',
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
            last_update: null,
            created_by: null,
        }
    }),
    beforeCreate: function () {
        if(!this.$session.exists()) {
            this.$router.push('/pages/login')
        }
      },
    mounted() {
        this.formInputs.session_id = Number(this.$session.get('session_id')) 
        axios
            .get('https://restcountries.eu/rest/v2/all?fields=name;')
            .then(response => {
                for(var i = 0; i < response.data.length; i++) {
                    this.listCountries[i] = {'id' : i, 'label' : response.data[i].name}
                }
                if(this.$route.params.id  == null) {
                    this.isMounted = true
                    this.formInputs.created_by = this.$session.get('account_id')
                }
            })
        if(this.$route.params.id != null) {
            this.formInputs.request = 2
            this.formInputs.last_update = this.currentDate()
            axios.get('https://langaj.chronicstone.online/test-taker/get/index.php?id=' + this.$route.params.id)
                 .then(response => {
                     var userData = response.data.data[0]
                     this.copyUserData = userData
                     this.formInputs.candidate_id = userData.id
                     this.formInputs.first_name = userData.first_name
                     this.formInputs.last_name = userData.last_name
                     this.formInputs.mail = userData.mail
                     this.formInputs.birth_date = userData.birth_date
                     this.formInputs.phone_nb_mobile = userData.mobile_phone_number
                     this.formInputs.phone_nb_other = userData.other_phone_number
                     this.formInputs.gender = userData.gender
                     this.formInputs.adress = userData.adress
                     this.formInputs.adress2 = userData.adress2
                     this.formInputs.zip_code = userData.zip_code
                     this.formInputs.city = userData.city
                     this.formInputs.country = userData.country
                     this.formInputs.nationality = userData.nationality
                     this.formInputs.mother_tongue = userData.mother_tongue
                     this.formInputs.lmap_interface_lang = userData.lmap_interface_language
                     this.formInputs.id_doc_type = userData.ID_doc_type
                     this.formInputs.id_doc_number = userData.ID_doc_number
                     this.formInputs.id_doc = userData.ID_doc
                     this.formInputs.user_photo = userData.user_photo
                     this.isMounted = true
                 })
        }
    },
    methods: {
        onSubmit () {
            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                }
                this.setFinalValue() 
                var url='https://langaj.chronicstone.online/test-taker/'
                var headers= {'Accept': 'application/json','Content-Type': 'application/x-www-form-urlencoded'}
                axios.post(url, this.formInputs, headers)
                    .then(response => {
                        if(this.$route.params.id == null) {
                            this.$vs.notify({
                                title:'Success',
                                text:'The candidate has been successfully created',
                                color:'success'
                            })
                            setTimeout( () => this.$router.push({ path: '/candidates'}), 750);
                        }
                        else {
                            this.$vs.notify({
                                title:'Success',
                                text:'The candidate has been successfully updated',
                                color:'success'
                            })
                            setTimeout( () => this.$router.push(`/test-taker/${this.$route.params.id}`).catch(() => {}), 750);
                        }

                    })
                    .catch(function (error) {
                        this.$vs.notify({
                            title:'Error',
                            text:error,
                            color:'danger'
                        })
                    });

                //this.formInputs.first_name = this.formInputs.last_name = this.formInputs.mail = this.formInputs.birth_date = this.formInputs.gender = this.formInputs.phone_nb_mobile = this.formInputs.phone_nb_other = this.formInputs.adress = this.formInputs.adress2 = this.formInputs.zip_code = this.formInputs.city = this.formInputs.country = this.formInputs.id_doc_type = this.formInputs.id_doc_number = this.formInputs.nationality = this.formInputs.mother_tongue = '';
                // Wait until the models are updated in the UI
                this.$nextTick(() => {
                    this.$refs.form.reset();
                });
            });
        },
        submitForm() {
            if (this.formInputs.gender != '' && this.formInputs.first_name != '' && this.formInputs.last_name != '' && this.formInputs.mail != '' && this.formInputs.country != '') {

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
            // Si on est en création de l'user, on réassocie les champs des sélecteurs aux bonnes données
            if(this.$route.params.id == 0) {
                this.formInputs.country = this.formInputs.country.label
                this.formInputs.mother_tongue = this.formInputs.mother_tongue.label
                this.formInputs.nationality = this.formInputs.nationality.label
                this.formInputs.id_doc_type = this.formInputs.id_doc_type.label
            }
            // Si les données des selecteurs sont changées on les update, sinon on laisse tel quel
            else {
                if(this.formInputs.country != this.copyUserData.country) {this.formInputs.country = this.formInputs.country.label}
                if(this.formInputs.mother_tongue != this.copyUserData.mother_tongue) {this.formInputs.mother_tongue = this.formInputs.mother_tongue.label}
                if(this.formInputs.nationality != this.copyUserData.nationality) {this.formInputs.nationality = this.formInputs.nationality.label}
                if(this.formInputs.id_doc_type != this.copyUserData.ID_doc_type) {this.formInputs.id_doc_type = this.formInputs.id_doc_type.label}
            }

            if(this.formInputs.birth_date.toString().length > 10) {
                this.formInputs.birth_date = this.formInputs.birth_date.getFullYear()+'-'+(this.formInputs.birth_date.getMonth()+1)+'-'+this.formInputs.birth_date.getDate();
            }
        },
        currentDate() {
            var crDate = new Date()
            crDate = crDate.getFullYear()+'-'+(crDate.getMonth()+1)+'-'+crDate.getDate();
            return crDate
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