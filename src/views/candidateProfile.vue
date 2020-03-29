<template>
    <div id="page-user-view">
        <vx-card  class="mb-base">
            <div class="flex justify-between mb-5 mt-0">
                <h3>Candidate profile</h3>
                <span v-if="userData.date_update != null" class="mt-1 text-success"><i>Last update : {{userData.date_update}}</i></span>
            </div>
            <!-- Avatar -->
            <div class="vx-row">

            <!-- Avatar Col -->
            <div class="vx-col" id="avatar-col">
                <div class="img-container mb-4">
                    <img :src="userData.test_taker_photo" class="rounded w-full h-auto" />
                </div>
            </div>

            <!-- Information - Col 1 -->
            <div class="vx-col flex-1" id="account-info-col-1">
                <table >
                    <tr>
                        <td class="font-semibold pb-3">First name</td>
                        <td class="pb-3 pl-16">{{ userData.first_name }}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold pb-3">Last name</td>
                        <td class="pb-3 pl-16">{{ userData.last_name }}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold pb-3">Email</td>
                        <td class="pb-3 pl-16">{{ userData.mail }}</td>
                    </tr>
                </table>
            </div>
            <!-- /Information - Col 1 -->

            <!-- Information - Col 2 -->
            <div class="vx-col flex-1" id="account-info-col-2">
                <table>
                <tr>
                    <td class="font-semibold  pb-3">Status</td>
                    <td class="pb-3 pl-16">{</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Role</td>
                    <td class="pb-3 pl-16"></td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Company</td>
                    <td class="pb-3 pl-16"></td>
                </tr>
                </table>
            </div>


            <div class="vx-col w-full flex" id="account-manage-buttons">
                <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" @click.prevent="editCandidate()">Edit</vs-button>
                <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash">Delete</vs-button>
            </div>

            </div>

        </vx-card>

        <div class="vx-row">
            <div class="vx-col lg:w-1/2 w-full">
            <vx-card title="Information" class="mb-base">
                <table>
                <tr>
                    <td class="font-semibold pb-3">Birth Date</td>
                    <td class="pb-3 pl-16">{{ userData.birth_date }}</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Mobile</td>
                    <td class="pb-3 pl-16">{{ userData.mobile_phone_number }}</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Website</td>
                    <td class="pb-3 pl-16">{{ userData.mobile_phone_number }}</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Languages</td>
                    <td class="pb-3 pl-16">{{ userData.mother_tongue}}</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Gender</td>
                    <td class="pb-3 pl-16">{{ userData.gender }}</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Contact</td>
                    <td class="pb-3 pl-16">{{ userData.mail }}</td>
                </tr>
                </table>
            </vx-card>
            </div>

            <div class="vx-col lg:w-1/2 w-full">
            <vx-card title="Social Links" class="mb-base">
                <table>
                <tr>
                    <td class="font-semibold pb-3">Twitter</td>
                    <td class="pb-3 pl-16">XXXXXXX</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Facebook</td>
                    <td class="pb-3 pl-16">XXXXXXX</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Instagram</td>
                    <td class="pb-3 pl-16">XXXXXXX</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Github</td>
                    <td class="pb-3 pl-16">XXXXXXX</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">CodePen</td>
                    <td class="pb-3 pl-16">XXXXXXX</td>
                </tr>
                <tr>
                    <td class="font-semibold pb-3">Slack</td>
                    <td class="pb-3 pl-16">XXXXXXX</td>
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


export default {
    components: {
        'v-select': vSelect,
        Datepicker
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
        }
    },
    
}
</script>

<style scoped>
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