<template>
	<div>
		<vs-breadcrumb class="mb-5" :items="[{title: 'Home', url: '/'}, {title: 'Settings', url: '/settings', active: true}]" separator="chevron_right"></vs-breadcrumb>
		<vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8" collapseAction>
			<div class="vx-row p-4">
				Contenu card
			</div>
		</vx-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			pagename : 'ATC Settings'
		}
	}
}
</script>