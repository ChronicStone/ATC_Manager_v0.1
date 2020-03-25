<template lang="html">
  <div>
    <vs-breadcrumb class="mb-5":items="[{title: 'Home', url: ''}, {title: 'Test Assessments Manager', url: '', active: true}]" separator="chevron_right">
    </vs-breadcrumb>
      <vs-table
        class=""
        ref="table"
        multiple
        v-model="selected"
        pagination
        :max-items="nbItems"
        :data=  "testQueries">
        <template slot="header">
          <!-- ITEMS PER PAGE -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * nbItems - (nbItems - 1) }} - {{ queries.length - currentPage * nbItems > 0 ? currentPage * nbItems : queries.length }} of {{ queriedItems }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>

              <vs-dropdown-item @click="nbItems=5">
                <span>5</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="nbItems=20">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="nbItems=50">
                <span>50</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="nbItems=queries.length">
                <span>All</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </template>

        <template slot="thead">
          <vs-th sort-key="last_name">
            Name
          </vs-th>
          <vs-th sort-key="expected_due_date">
            Due date
          </vs-th>
          <vs-th sort-key="status">
            Status
          </vs-th>
          <vs-th sort-key="gl">
            CEFR Level
          </vs-th>
          <vs-th>
            Report
          </vs-th>
          <vs-th>
            Actions
          </vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
            <vs-td :data="data[indextr].last" style="width:15%;">
              {{data[indextr].first_name}}
              {{data[indextr].last_name}}
            </vs-td>

            <vs-td :data="data[indextr].expected_due_date">
              {{data[indextr].expected_due_date}}
            </vs-td>

            <vs-td :data="data[indextr].test_status">
              <vs-chip :color="getOrderStatusColor(data[indextr].status)" class="product-order-status">{{data[indextr].test_status}}</vs-chip>
            </vs-td>

            <vs-td :data="data[indextr].global_level">
              <div v-if="data[indextr].global_level === null">
                Not available yet
              </div>
              <div v-else>
                {{data[indextr].global_level}}
              </div>
            </vs-td>

            <vs-td style="width:15%;":data="data[indextr].id">
              <div class="pdfdownload">
                <div><vs-icon color="#EB5C52" size="25px" icon="picture_as_pdf"></vs-icon> SR</div>
                <div style="margin-left:35px;"><vs-icon color="#EB5C52" size="25px" icon="picture_as_pdf"></vs-icon> OC</div>
              </div>
            </vs-td>          

            <vs-td style="width:20%;">
              <div class="flex justify-center">
                <vs-button radius  color="primary" class="mr-8" type="filled" icon="edit" @click="RedirectUser(data[indextr].test_taker_id)"></vs-button>
                <vs-button radius  color="danger" type="filled"  icon="delete"></vs-button>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
  </div>
</template>

<script >

  import axios from "axios";
import VxBreadcrumb from "@/layouts/components/VxBreadcrumb";


export default {
  components: {
    VxBreadcrumb
  },
  data: () => ({
    isMounted: false,
    popupAddTestTaker: false,
    show: false,
    nbItems: 5,
    nbRowList: [
      { text: '5', value: 5 },
      { text: '20', value: 20 },
      { text: '50', value: 50 },
      { text: '100', value: 100 },
	],
    selected: [],
    testQueries: []
  }),
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/pages/login')
    }
  },
  mounted() {
    axios
      .get('https://langaj.chronicstone.online/test-assessment/get/index.php?session_id=' + this.$session.get('session_id'))
      .then(response => (this.testQueries = response.data.data))
    this.isMounted = true
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    queries() {
      return this.testQueries
    },
    queriedItems() {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.testQueries.length
    }
  },
  methods: {
    addTestTaker() {
      this.$router.push('/addTestTaker')
    },
    getOrderStatusColor(status) {
      if (status === 'Started') return '#5BB7EB'
      if (status === 'Created') return '#FF7D6B'
      if (status === 'Assigned') return '#EBBD38'
      if (status === 'Done') return 'success'
      if (status === 'Pending') return '#BCC4C4'
      return 'danger'
    },
    RedirectUser(id) {
      this.$router.push(`/test-taker/${id}`).catch(() => {})
    }
  }
}
</script>

<
style scoped >
  .pdfdownload {
    display: flex;
    justify - content: space - around;
    float: left;
  }

  .bg - custom {
    background - color: rgb(38, 44, 71);
  }
</style>
