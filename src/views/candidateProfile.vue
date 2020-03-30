<template>
    <div id="page-user-view">
        <vx-card  class="mb-base">
            <div class="flex justify-between mb-5 mt-0">
                <h3>Candidate profile</h3>
                <span v-if="userData.date_update != null" class="mt-1 text-success"><i>Last update : {{userData.date_update|formatDate}}</i></span>
            </div>
            <!-- Avatar -->
            <div class="vx-row">

            <!-- Avatar Col -->
            <div class="vx-col" id="avatar-col">
                <div class="img-container mb-4">
                    <avatar :size="100" class="rounded" :src="userData.test_taker_photo" :username="userData.first_name+' '+userData.last_name"></avatar>
                </div>
            </div>

            <!-- Information - Col 1 -->
            <div class="vx-col flex-1" id="account-info-col-1">
                <table >
                    <tr>
                        <td class="font-semibold pb-3 w-1/2 pt-3">First name</td>
                        <td class="pb-3 pl-20 right w-full">{{ userData.first_name }}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold pb-3 w-1/2">Last name</td>
                        <td class="pb-3 pl-20 w-full">{{ userData.last_name }}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold pb-3 w-1/2">Other name</td>
                        <td v-if="checkDataContent(userData.other_name)" class="pb-3 pl-20"><i>Not specified</i></td>
                        <td v-else class="pb-3 pl-20 w-full">{{ userData.other_name }}</td>
                    </tr>
                </table>
            </div>
            <!-- /Information - Col 1 -->
            <!-- Information - Col 2 -->
            <div class="vx-col flex-1 border border-warning mr-8 pl-12 pt-3" style="border-left:1px solid black" id="account-info-col-2">
                <table>
                <tr>
                    <td class="font-semibold w-1/2 pb-3">Mail address</td>
                    <td v-if="checkDataContent(userData.mail)" class="pb-3 pl-20 w-full"><i>Not specified</i></td>
                    <td v-else class="pb-3 pl-20 w-full">{{userData.mail}}</td>
                <tr>
                    <td class="font-semibold pb-3 w-1/2">Mobile phone</td>
                    <td v-if="checkDataContent(userData.mobile_phone_number)" class="pb-3 pl-20 w-full"><i>Not specified</i></td>
                    <td v-else class="pb-3 pl-20 w-full">{{userData.mobile_phone_number|phone}}</td>  
                <tr>
                    <td class="font-semibold pb-3 w-1/2">Other phone</td>
                    <td v-if="checkDataContent(userData.other_phone_number)" class="pb-3 pl-20 w-full"><i>Not specified</i></td>
                    <td v-else class="pb-3 pl-20 w-full">{{userData.other_phone_number}}</td>
                </tr>
                </table>
            </div>


            <div class="vx-col w-full flex" id="account-manage-buttons">
                <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" @click.prevent="editCandidate()">Edit</vs-button>
                <!--<vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash">Delete</vs-button>-->
            </div>

            </div>

        </vx-card>

        <div class="vx-row">
            <div class="vx-col lg:w-1/2 w-full">
            <vx-card title="Informations" class="mb-base">
                <table>
                <tr>
                    <td class="font-semibold pb-3">Mail address</td>
                    <td v-if="checkDataContent(userData.mail)" class="pb-3 pl-20"><i>Not specified</i></td>
                    <td v-else class="pb-3 pl-20">{{ userData.mail }}</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Mobile phone</td>
                    <td v-if="checkDataContent(userData.mobile_phone_number)" class="pb-3 pl-20"><i>Not specified</i></td>
                    <td v-else class="pb-3 pl-20">{{ userData.mobile_phone_number|phone }}</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Other phone</td>
                    <td v-if="checkDataContent(userData.other_phone_number)" class="pb-3 pl-20"><i>Not specified</i></td>
                    <td class="pb-3 pl-20">{{ userData.other_phone_number }}</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Address</td>
                    <td v-if="checkDataContent(userData.adress)" class="pb-3 pl-20"><i>Not specified</i></td>
                    <td v-else class="pb-3 pl-20">{{ userData.adress}}</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Additionnal address</td>
                    <td v-if="checkDataContent(userData.adress2)" class="pb-3 pl-20"><i>Not specified</i></td>
                    <td v-else class="pb-3 pl-20">{{ userData.adress2 }}</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Zip code</td>
                    <td v-if="checkDataContent(userData.zip_code)" class="pb-3 pl-20"><i>Not specified</i></td>
                    <td class="pb-3 pl-20">{{ userData.zip_code }}</td>
                </tr>                
                <tr>
                    <td class="font-semibold pb-3">City</td>
                    <td v-if="checkDataContent(userData.city)" class="pb-3 pl-20"><i>Not specified</i></td>
                    <td v-else class="pb-3 pl-20">{{ userData.city|uppercase }}</td>
                </tr>                
                <tr>
                    <td class="font-semibold pb-3">Country</td>
                    <td v-if="checkDataContent(userData.country)" class="pb-3 pl-20"><i>Not specified</i></td>
                    <td v-else class="pb-3 pl-20">{{ userData.country }}</td>
                </tr>
                </table>
            </vx-card>
            
            </div>

            <div class="vx-col lg:w-1/4 w-full">
                <vx-card title="Identity" class="mb-base">
                    <table>
                        <tr>
                            <td class="font-semibold pb-3 pt-2 w-full">Birth date</td>
                            <td v-if="checkDataContent(userData.birth_date)" class="pb-3 pl-20 pt-2"><i>Not specified</i></td>
                            <td v-else class="pb-3 pl-16 pt-2 w-full">{{userData.birth_date|formatDate}}</td>
                        </tr>
                        <tr >
                            <td class="font-semibold pb-3 pt-6 w-full">ID Doc. type</td>
                            <td v-if="checkDataContent(userData.birth_date)" class="pb-3 pl-22 w-full pt-6"><i>Not specified</i></td>
                            <td v-else class="pb-3 pt-6 pl-16"><span class="w-full">{{userData.ID_doc_type}}</span></td>
                        </tr>
                        <tr >
                            <td class="font-semibold pb-3 pt-6 w-full">ID Number </td>
                            <td v-if="checkDataContent(userData.ID_doc_number)" class="pb-3 pl-22 w-full pt-6"><i>Not specified</i></td>
                            <td v-else class="pb-3 pt-6 pl-16"><span class="w-full">{{userData.ID_doc_number}}</span></td>
                        </tr>
                    </table>
                    <vs-divider></vs-divider>
                    <table>
                        <tr>
                            <td class="font-semibold pb-3 w-full">File name</td>
                            <td v-if="checkDataContent(userData.id_doc)" class="pb-3 pl-20 w-full"><i>?</i></td>
                            <td v-else class="pb-3 pl-20 w-full">{{userData.id_doc}}</td>
                        </tr>
                        <tr >
                        </tr>
                    </table>
                    <vs-button class="w-full mt-2" disabled>Download file</vs-button>
                </vx-card>
            </div>            
            <div class="vx-col lg:w-1/4 w-full">
                <vx-card title="Affiliation" class="mb-base">
                    <table>
                        <tr>
                            <td class="font-semibold pb-3 pt-2 w-1/2">Organisation</td>
                            <td v-if="checkDataContent(userData.organisation)" class="pb-3 pl-16 pt-2 w-full"><i>Not specified</i></td>
                            <td v-else class="pb-3 pl-16 pt-2 w-full">{{userData.birth_date|formatDate}}</td>
                        </tr>
                        <tr >
                            <td class="font-semibold pb-3 pt-6 w-1/2">Department</td>
                            <td v-if="checkDataContent(userData.organisation)" class="pb-3 pl-16 w-full pt-6"><i>Not specified</i></td>
                            <td v-else class="pb-3 pt-6 pl-16 w-full"><span class="w-full">{{userData.ID_doc_type}}</span></td>
                        </tr>
                        <tr >
                            <td class="font-semibold pb-3 pt-6 w-1/2"></td>
                            <td v-if="checkDataContent(userData.organisation)" class="pb-3 pl-16 w-full pt-6"><i></i></td>
                            <td v-else class="pb-3 pt-6 pl-16"><span class="w-full"></span></td>
                        </tr>
                    </table>
                </vx-card>
            </div>
        </div>

        <vx-card class="overflow-auto" style="overflow:scroll;">
            <div class="flex justify-between">
                <div class="flex">
                    <feather-icon svgClasses="w-6 h-6" icon="BookOpenIcon" class="mr-2" />
                    <h4 class="mt-2">Assessments Manager</h4>
                </div>
                <vs-button radius color="success" type="filled" icon-pack="feather" @click.prevent="dispNewAssess()" icon="icon-plus"></vs-button>
            </div>
            <vs-divider/>
            <vs-tabs :color="tabColor" v-if="this.isMounted === true && userAssessments.length > 0" > 
                <vs-tab v-for="(assess, id) in userAssessments" v-bind:key="id" :label="assess.assessment_name" @click="labelAssess(assess.state)" @onmouseover="labelAssess(assess.state)" >
                    <div class="tab-text mt-4" v-if="assess.state === 'saved'">
                        <span>
                            <ul>
                                <li>
                                    <p class="text-primary">Key token : </p>{{assess.key_token}}
                                </li>                                
                                <li>
                                    <p class="text-primary">Candidate mail : </p>{{assess.email}}
                                </li>
                            </ul>
                        </span>
                    </div>
                    <div class="tab-text mt-4" v-if="assess.state === 'created'">
                        <div class="mt-4 ml-2">
                            <div class="vx-row">
                                <div class="vx-col sm:w-1/3 w-full mb-2">
                                    <label><feather-icon svgClasses="w-4 h-3" icon="ChevronRightIcon" />Test version</label>
                                    <v-select class="mt-2" v-model="selectedTest" placeholder="Select test" :options="optionsTest" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                                </div>
                                <div class="vx-col sm:w-1/3 w-full mb-2">
                                    <label><feather-icon svgClasses="w-4 h-3" icon="ChevronRightIcon" />Expected due date</label>
                                    <datepicker class="mt-2" v-model="selectedDueDate" placeholder="Select Date"></datepicker>
                                </div>
                                <div class="vx-col sm:w-1/3 w-full mb-2">
                                    <label><feather-icon svgClasses="w-4 h-3" icon="ChevronRightIcon" />Batch session</label>
                                    <v-select class="mt-2" v-model="selectedBatch" placeholder="Select batch" :options="optionsBatch" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                                </div>
                            </div>
                            <div class="vx-row">
                                <div class="vx-col sm:w-full w-full ml-auto mt-10">
                                    <vs-button class="mr-3 mb-2" @click.prevent="submitForm(assess.id)">Submit</vs-button>
                                    <vs-button color="warning" type="border" class="mb-2" @click="input1 = input2 = input3 = input4 = input4 = ''; check1 = false;">Reset</vs-button>
                                </div>
                            </div>
                            <vs-alert v-if="errEmptyInput === true" class="mt-4" :active="inputValid" color="danger" icon-pack="feather" icon="icon-info">
                                <span>ERROR : You did not select a due date, test name or batch session</span>
                            </vs-alert>
                        </div>
                    </div>
                </vs-tab>
            </vs-tabs>
        </vx-card>
        
    </div>
</template>

<script>

import axios from "axios";
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker';
import Avatar from 'vue-avatar'



export default {
    components: {
        'v-select': vSelect,
        Datepicker,
        Avatar
    },
    beforeCreate: function () {
        if(!this.$session.exists()) {
            this.$router.push('/pages/login')
        }
    },
    data() {
        return {
            isMounted:false,
            errEmptyInput:false,
            ATCSettings:[],
            userData: [],
            userAssessments:[],
            selectedBatch: '',
            selectedDueDate: '',
            selectedTest: '',
            tabColor:'success',
            optionsTest: [
                {id: 1, label: 'Langaj placement test V2 without Exercise'},
                {id: 2, label: 'Langaj placement test V2 with Exercise'},
            ],
            optionsBatch: [
                {id: 1, label: '#03_2020-12-25_sessionGrp1_salle12'},
                {id: 2, label: '#04_2021-02-13_sessionGrp2_salle18'},
            ],
        }
    },
    beforeMount() {
        axios.get('https://langaj.chronicstone.online/test-taker/get/index.php?id=' + this.$route.params.id)
             .then(response => (this.userData = response.data.data[0]))

        axios.get('https://langaj.chronicstone.online/test-assessment/get/index.php?id=' + this.$route.params.id + '&session_id=' + this.$session.get('session_id'))
             .then(response => (this.userAssessments = response.data.data, this.isMounted = true))
        /*
        axios.get('https://langaj.chronicstone.online/settings/')
             .then(response => (this.ATCSettings = StoreSettings(response.data.settings)))
        */
    },
    methods: {
        dispNewAssess() { 
            var idAsess = this.userAssessments.length + 1
            var newAssess = {'id' : idAsess, 'name' : 'Assessment' + idAsess, 'content' : 'This is assessment ' + idAsess, 'state' : 'created', 'assessment_name' : 'New Assessment'}
            this.userAssessments.push(newAssess) 
        },
        labelAssess(state) {
            if(state === 'created') {
                this.tabColor = "warning"
            }
            else {
                this.tabColor="success"

            }
        },
        StoreSettings() {
        
        },
        submitForm(id_assess) {
            if (this.selectedTest != '' && this.selectedDueDate != '' && this.selectedBatch != '') {
                this.errEmptyInput = false
                var result = []
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var url='https://langaj.chronicstone.online/test-assessment/'
                var headers= {'Accept': 'application/json','Content-Type': 'application/x-www-form-urlencoded'}
                var data = {
                    "request": 1,
	                "session_id": this.$session.get('session_id'),
	                "test_taker_id": this.$route.params.id,
	                "first_name": this.userData.first_name,
	                "last_name": this.userData.last_name,
                    "email": this.userData.mail,
                    "test_name": this.selectedTest.label,
                    "due_date": date,
                    "batch": this.selectedBatch.label,
                    "assessmentName": '#' + String(id_assess) + '_LMAP_ENG_' + String(date),
                    "email": this.userData.mail
                }
                axios.post(url, data, headers)
                    .then(response => {
                        this.$vs.notify({
                            title:'Request success',
                            text:'The assessment has correctly been created',
                            color:'primary'
                        })
                        this.EmptyFields()
                        this.ReloadAPIData()
                    })
                    .catch(error => {
                        this.$vs.notify({
                            title:'Request failed',
                            text:'The assessment has not been created',
                            color:'danger'
                        })
                    });
            } 
            else {
                this.errEmptyInput = true
            }
        },
        ReloadAPIData() {
            axios.get('https://langaj.chronicstone.online/test-assessment/get/index.php?id=' + this.$route.params.id + '&session_id=' + this.$session.get('session_id'))
                .then(response => (this.userAssessments = response.data.data))
        },
        EmptyFields() {
            this.tabColor = 'success'
            this.selectedBatch = ''
            this.selectedDueDate = ''
            this.selectedTest = ''
        },
        editCandidate() {
            this.$router.push(`/editTestTaker/${this.userData.id}`).catch(() => {})
        },
        getProfileTitle() {
            if(this.userData.date_update != '') {
                return 'Last edit : ' + this.userData.date_update
            }
        },
        checkDataContent(obj) {
            if(obj == null || obj == '') {
                return true
            }
        },
    },
    
}
</script>

<style scoped>
.text-grey {
    color:rgb(185, 185, 185);
}

#avatar-col {
	width: 10rem;
}

#page-user-view table {
    border-collapse: collapse; 
}

#page-user-view table td {
	vertical-align: top;
	min-width: 140px;
	padding-bottom: .8rem;
	word-break: break-all;
}
tr {
    top:50px;
}

@media screen and (max-width: 370px) {
	#page-user-view table:not(.permissions-table) td {
		display: block;
	}
}

@media screen and (min-width: 1201px) and (max-width: 1211px), only screen and (min-width: 636px) and (max-width: 991px) {
	#account-info-col-1 {
		width: calc(100% - 12rem) !important;
	}
}
</style>