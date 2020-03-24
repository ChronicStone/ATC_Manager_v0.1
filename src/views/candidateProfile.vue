<template>
    <div id="page-user-view">
        <vx-card title="Test taker profile" class="mb-base">

            <!-- Avatar -->
            <div class="vx-row">

            <!-- Avatar Col -->
            <div class="vx-col" id="avatar-col">
                <div class="img-container mb-4">
                <img :src="userData.test_taker_photo" class="rounded w-full" />
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
                <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'test-taker-edit', params: { userId: $route.params.id }}">Edit</vs-button>
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

        <vx-card>
            <div class="flex justify-between">
                <div class="flex">
                    <feather-icon svgClasses="w-6 h-6" icon="BookOpenIcon" class="mr-2" />
                    <h4 class="mt-2">Assessments Manager</h4>
                </div>
                <vs-button radius color="success" type="filled" icon-pack="feather" @click.prevent="dispNewAssess()" icon="icon-plus"></vs-button>
            </div>
            <vs-divider/>
            <vs-tabs v-if="this.isMounted === true && userAssessments.length > 0" > 
                <vs-tab v-for="(assess, id) in userAssessments" v-bind:key="id" :label="assess.assessment_name">
                    <div class="tab-text mt-4">
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
                </vs-tab>
            </vs-tabs>
        </vx-card>
        
    </div>
</template>

<script>

import axios from "axios";

export default {
    beforeCreate: function () {
        if(!this.$session.exists()) {
            this.$router.push('/pages/login')
        }
    },
    data() {
        return {
            isMounted:false,
            userData: [],
            userAssessments:[]
        }
    },
    beforeMount() {
        console.log(this.$route.params.id)
        axios.get('https://langaj.chronicstone.online/test-taker/get/index.php?id=' + this.$route.params.id)
             .then(response => (this.userData = response.data.data[0]))

        axios.get('http://localhost/atc/API/phprest/test-assessment/get/index.php?id=' + this.$route.params.id + '&session_id=' + this.$session.get('session_id'))
             .then(response => (this.userAssessments = response.data.data, this.isMounted = true))
    },
    methods: {
        dispNewAssess() { 
            var idAsess = this.userAssessments.length + 1
            var newAssess = {'id' : idAsess, 'name' : 'Assessment' + idAsess, 'content' : 'This is assessment ' + idAsess}
            this.userAssessments.push(newAssess) 
        }
    }
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