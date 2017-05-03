<template>
	<div class="home">
		<div v-if="isLoading" class="loading">
			<p>Loading your gradients...</p>
		</div>
		<div v-else class="container">
			<gradient-grid v-show="populatedList.length > 0" icon="🔥" title="Populated gradients" :list="populatedList"></gradient-grid>
			<gradient-grid v-show="gradientList.length > 0" icon="🌋" title="Latest gradients" :list="gradientList"></gradient-grid>
		</div>
		<gradient-modal overlay-theme="dark"></gradient-modal>
		<sweet-modal icon="error" overlay-theme="dark" modal-theme="dark" ref="deleteModal">
			<p>This is a website driven by the community. Your actions will affect the community. Are you sure you want to delete this gradient?</p>
			<a href="#" @click.prevent="deleteGradient" class="btn btn-primary">Delete always, it's too disgusting</a>
		</sweet-modal>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
import GradientGrid from '../shared/gradient-grid.vue'
import GradientModal from '../shared/gradient-modal.vue'
import SweetModal from '../shared/sweet-modal.vue'
import pubsub from '../../services/pubsub'
import {db} from '../../services/fire'
export default {
  components: {
    SweetModal,
    GradientGrid,
    GradientModal
  },
  computed: {
    ...mapGetters({
      gradientList: 'gradient/list',
      populatedList: 'gradient/populated',
      isLoading: 'gradient/isLoading'
    })
  },
  mounted () {
    pubsub.$on('show-delete-modal', this.showDeleteModal)
  },
  destroyed () {
    pubsub.$off('show-delete-modal', this.showDeleteModal)
  },
  methods: {
    showDeleteModal (id) {
      this.$refs.deleteModal.gradientId = id
      this.$refs.deleteModal.open()
    },
    deleteGradient () {
      db.ref('gradients').child(this.$refs.deleteModal.gradientId).remove().then(() => {
        this.$refs.deleteModal.close()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
	.home{
		.loading{
			margin-top: 100px;
			width: 100%;
			height: 100%;
			text-align: center;
			p{
				margin: 0;
			}
		}
	}
</style>
