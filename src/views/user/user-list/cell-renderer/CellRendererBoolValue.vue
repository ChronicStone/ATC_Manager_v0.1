<template>
  <div>
    <span v-if="params.value =='' || params.value == null" class="text-warning"><i>No</i></span>
    <span v-else class="text-success"> Yes </span>
  </div>
</template>

<script>
export default {
  name: 'CellRendererBoolValue',
}
</script>
