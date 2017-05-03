<template>
	<header class="site-header">
		<div class="container">
			<nav class="inner">
				<div class="left">
					<router-link class="site-brand" to="/" exact>Gradient Hero</router-link>
					<filters></filters>
				</div>
				<account-action-bar></account-action-bar>
			</nav>
		</div>
	</header>
</template>
<script>
import Filters from './filters.vue'
import AccountActionBar from './account-action-bar.vue'
export default{
  components: {
    Filters,
    AccountActionBar
  }
}
</script>
<style lang="scss" scoped>
	@import "../../styles/variables/index";
	@import "../../styles/utils/mixin";
	.site-header{
		background: #FFFFFF;
		box-shadow: $shadow-primary;
		.inner{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				display: flex;
				justify-content: center;
			}
			.filters{
				margin-left: 50px;
			}
			.site-brand{
				@include font-size(20);
				font-weight: 500;
				color: $color--primary;
				letter-spacing: 0;
				text-decoration: none;
				text-transform: uppercase;
				padding: 20px 0;
				display: block;
				border: none;
			}
		}
	}
</style>
