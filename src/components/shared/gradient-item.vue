<template>
	<div class="gradient-item" @contextmenu.prevent="showContextOverlay = true" @mouseleave="showContextOverlay = false">
		<div ref="gradient" @copied="gradientCopied" @click.prevent="onGradientClicked" class="gradient clipboard" :data-clipboard-text="'background-image:' + gradient.code + ';'" :style="{'background-image': gradient.code}"></div>
		<div class="overlay message-overlay" v-if="showOverlay">
			<p class="message">
				<span class="icon">👍</span>
				<span class="content">Great job, Copied!</span>
			</p>
		</div>
		<div class="overlay context-overlay" v-if="showContextOverlay && userInfo !== null">
			<a href="#" @click.prevent="showDeleteModal"><i class="icon-remove"></i></a>
		</div>
	</div>
</template>
<script>
import pubsub from '../../services/pubsub'
import {mapGetters} from 'vuex'
export default {
  props: {
    gradient: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfo'
    })
  },
  data () {
    return {
      showOverlay: false,
      showContextOverlay: false
    }
  },
  methods: {
    showDeleteModal () {
      pubsub.$emit('show-delete-modal', this.gradient.id)
    },
    onGradientClicked () {
      pubsub.$emit('gradient-item-clicked', this.gradient)
    },
    gradientCopied () {
      this.showOverlay = true
      setTimeout(() => {
        this.showOverlay = false
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
	@import "../../styles/variables/index";
	@import "../../styles/utils/mixin";
	.gradient-item{
		overflow: hidden;
		background: #FFFFFF;
		box-shadow: 0 10px 20px 0 #DFE6F4;
		margin-top: $gutter-width;
		border-radius: 10px;
		transition: $transition-primary;
		position: relative;
		.overlay{
			position: absolute;
			width: 100%;
			height: 100%;
			top:0;
			left: 0;
			line-height: 15px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-image:linear-gradient(45deg, rgba(147, 165, 207, 0.31) 0%, rgba(228, 239, 233, 0.3) 100%);
		}
		.message-overlay{
			.message{
				@include font-size(16);
				text-align: center;
				span{
					display: block;
				}
				.icon{
					@include font-size(40);
					line-height: 40px;
				}
			}
		}
		.context-overlay{
			display: flex;
			a{
				display: block;
				border: none;
				i{
					@include font-size(40)
				}
				& + a{
					margin-left: 40px;
				}
			}
		}
		.gradient{
			width: 100%;
			height: 100%;
			line-height: 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
