<template>
	<div class="account-action-bar">
		<a href="#" @click.prevent="login('google')" v-if="userInfo === null">Login with Google</a>
		<template v-if="userInfo !== null">
			<a href="#" @click.prevent="addNewGradient" class="add-new">Add Gradient</a>
		</template>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
import pubsub from '../../services/pubsub'
export default {
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfo'
    })
  },
  methods: {
    login (providerName) {
      this.$store.dispatch('user/login', providerName)
    },
    signOut () {
      this.$store.dispatch('user/logout')
    },
    addNewGradient () {
      pubsub.$emit('add-new-gradient')
    }
  }
}
</script>
<style lang="scss" scoped="">
	@import "../../styles/utils/mixin";
	.account-action-bar{
		@include font-size(14)
		a{
			border: none;
		}
	}
</style>
