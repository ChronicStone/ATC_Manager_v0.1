<template>
    <div class="mt-2" :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 mr-4 cursor-pointer" @click="viewRecord" />
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 text-primary cursor-pointer" @click="editRecord" />
      <!--<feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 text-danger cursor-pointer" @click="confirmDeleteRecord" /> -->
    </div>
</template>

<script>
export default {
  name: 'CellRendererActions',
  methods: {
    viewRecord () {
      this.$router.push(`/test-taker/${this.params.data.id}`).catch(() => {})
    },    
    editRecord () {
      this.$router.push(`/editTestTaker/${this.params.data.id}`).catch(() => {})
    },
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.params.data.username}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
      //   .then(()   => { this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    }
  }
}
</script>
