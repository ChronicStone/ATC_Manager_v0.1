<template>
  <div>
      <vs-chip class=" mt-6 ag-grid-cell-chip" :color="chipColor(params.value)">
        <span><font-awesome-icon size="15px" :icon="selectIcon(params.value)"/></span>
      </vs-chip>
  </div>  
</template>

<script>
export default {
  name: 'CellRendererStatus',
  computed: {
    chipColor () {
      return (value) => {
        if (value === 'male') return 'rgb(126, 183, 236)'
        else return 'rgb(229, 160, 209)'
      }
    },
    selectIcon() {
      return (value) => {
        if (value === 'male') return 'mars'
        else return 'venus'
      }
    }
  }
}
</script>

<style lang="scss" scpoped>
.ag-grid-cell-chip {
  &.vs-chip-success {
    background: rgba(var(--vs-success),.15);
    color: rgba(var(--vs-success),1) !important;
    font-weight: 500;
  }
  &.vs-chip-warning {
    background: rgba(var(--vs-warning),.15);
    color: rgba(var(--vs-warning),1) !important;
    font-weight: 500;
  }
  &.vs-chip-danger {
    background: rgba(var(--vs-danger),.15);
    color: rgba(var(--vs-danger),1) !important;
    font-weight: 500;
  }
}
</style>