<template>
	<div>
		 <vs-tabs :position="isSmallerScreen ? 'top' : 'top'" class="" id="profile-tabs" :key="isSmallerScreen">

			<!-- GENERAL -->
			<vs-tab icon-pack="feather" icon="icon-settings" :label="!isSmallerScreen ? 'Test center settings' : ''">
				<div class="w-full">
					<vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="mt-2" id="profile-tabs" :key="isSmallerScreen" color="warning">

						<!-- GENERAL -->
						<vs-tab icon-pack="feather" icon="icon-list" :label="!isSmallerScreen ? 'Batch' : ''">
							<div class="w-full">
								<batch-list></batch-list>
							</div>
						</vs-tab>
						<vs-tab icon-pack="feather" icon="icon-globe" :label="!isSmallerScreen ? 'Organisation' : ''">
							<div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
								<organisation-list></organisation-list>
							</div>
						</vs-tab>
						<vs-tab icon-pack="feather" icon="icon-folder" :label="!isSmallerScreen ? 'Department' : ''">
							<div class="tab-info md:ml-4 md:mt-0 mt-4 ml-0">
								<department-list></department-list>
							</div>
						</vs-tab>
			      	</vs-tabs>
				</div>
			</vs-tab>
			<vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Other tab' : ''">
				<div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
				</div>
			</vs-tab>
			<vs-tab icon-pack="feather" icon="icon-info" :label="!isSmallerScreen ? 'Another tab' : ''">
				<div class="tab-info md:ml-4 md:mt-0 mt-4 ml-0">
				</div>
			</vs-tab>
		</vs-tabs>
	</div>
</template>

<script>

import axios from "axios";
import BatchList from './settings/batch/data-list/list-view/DataListListView.vue';
import OrganisationList from './settings/organisation/data-list/list-view/DataListListView.vue'
import DepartmentList from './settings/department/data-list/list-view/DataListListView.vue'

export default {
	components: {
		BatchList,
		OrganisationList,
		DepartmentList
	},
	data() {
		return {
			selectedBatch:[],
			pagename : 'ATC Settings',
			batchlist:[],
			department:[],
			organisation:[],
			testVersion:[],
			nbItems: 5
		}
	},
	beforeMount() {
		axios.get('https://langaj.chronicstone.online/settings/')
			 .then(response => {
				 this.batchlist = response.data.settings.batch
				 this.department = response.data.settings.department
				 this.organisation = response.data.settings.organisation
			 })
	},
	computed: {
		currentPage() {
			if (this.isMounted) {
				return this.$refs.table.currentx
			}
			return 0
			},
			queries() {
				return this.batchlist
			},
			queriedItems() {
				return this.$refs.table ? this.$refs.table.queriedResults.length : this.batchlist.length
			},
			isSmallerScreen () {
				return this.$store.state.windowWidth < 768
			}
		},
	methods: {
		setInputColor(err) {
            //if (err[0] != null) return 'danger'
        },
	}
}
</script>