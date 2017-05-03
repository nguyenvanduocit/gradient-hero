<template>
	<div class="gradient-modal">
		<sweet-modal @close="resetData" overlay-theme="light" modal-theme="light" ref="modal">
			<p v-text="message" v-if="isLoading"></p>
			<div class="graident-form" v-else>
				<div class="field-group">
					<label>Tags</label>
					<input type="text" v-model="gradient.tags" placeholder="sad, winter">
				</div>
				<div class="field-group">
					<label>CSS code</label>
					<textarea rows="3" v-model="gradient.code" placeholder="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"></textarea>
				</div>
				<div class="field-group">
					<label>This website is a community driven website, your commit will affect the community. Please carefully.</label>
				</div>
				<div class="field-group">
					<button class="btn btn-primary" @click.prevent="save">Sure, Submit my gradient</button>
				</div>
			</div>
		</sweet-modal>
	</div>
</template>
<script>
import SweetModal from './sweet-modal.vue'
import pubsub from '../../services/pubsub'
import {db} from '../../services/fire'
import map from 'lodash/map'
import trim from 'lodash/trim'
export default{
  components: {
    SweetModal
  },
  data () {
    return {
      targetGradient: null,
      isLoading: false,
      message: '',
      gradient: {
        tags: '',
        code: ''
      }
    }
  },
  mounted () {
    pubsub.$on('add-new-gradient', this.open)
  },
  destroyed () {
    pubsub.$off('add-new-gradient', this.open)
  },
  methods: {
    open (gradient) {
      if (gradient !== null) {
        this.targetGradient = gradient
      }
      this.$refs.modal.open()
    },
    updateTags (value) {
      this.gradient.tags = value.split(',')
    },
    resetData () {
      this.targetGradient = null
      this.message = ''
      this.gradient.tags = []
      this.gradient.code = ''
      this.isLoading = false
    },
    save () {
      this.isLoading = true
      let newGradientRef = db.ref('gradients').push()
      this.message = 'Loading...'
      try {
        newGradientRef.set({
          code: this.gradient.code,
          tags: this.gradient.tags !== '' ? map(this.gradient.tags.split(','), trim) : [],
          totalUsed: 0
        }).then(() => {
          this.message = 'Your gradient was added! Thank you.'
        })
      } catch (error) {
        this.message = error.message
      }
    }
  }
}
</script>
<style lang="scss" scoped>
	@import "../../styles/utils/mixin";
	.graident-form{
		text-align: left;
		.field-group{
			& + .field-group{
				margin-top: 20px;
			}
			label{
				display: block;
				@include font-size(15);
				margin: {
					bottom: 5px;
				};
			}
		}
	}
</style>
