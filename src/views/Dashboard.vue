<template>
	<vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8" collapseAction>
      <div class="vx-row p-4">
		  Contenu card
      </div>
    </vx-card>
</template>

<script>
export default {
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/pages/login')
    }
  },
}
</script>