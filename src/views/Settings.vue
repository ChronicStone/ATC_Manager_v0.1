<template>
	<div>
		 <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

			<!-- GENERAL -->
			<vs-tab icon-pack="feather" icon="icon-list" :label="!isSmallerScreen ? 'Batch' : ''">
				<div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
					<BatchList></BatchList>
				</div>
			</vs-tab>
			<vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Organisation' : ''">
				<div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
				</div>
			</vs-tab>
			<vs-tab icon-pack="feather" icon="icon-info" :label="!isSmallerScreen ? 'Department' : ''">
				<div class="tab-info md:ml-4 md:mt-0 mt-4 ml-0">
				</div>
			</vs-tab>
		</vs-tabs>
	</div>
</template>

<script>

import axios from "axios";
import BatchList from './settings/batch/data-list/list-view/DataListListView.vue'

export default {
	components: {
		BatchList
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
			}
		},
	methods: {
		setInputColor(err) {
            //if (err[0] != null) return 'danger'
        },
	}
}
</script>