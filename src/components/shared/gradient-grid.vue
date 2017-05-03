<template>
	<section class="gradient-grid" :class="$store.getters['filter/shape']">
		<div class="header">
			<h1 class="title">{{icon}} {{title}}</h1>
		</div>
		<div class="body">
			<div class="row">
				<div v-for="gradient in list" :key="gradient.id" :class="itemClasses">
					<gradient-item :gradient="gradient"></gradient-item>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import GradientItem from './../shared/gradient-item.vue'
import {mapGetters} from 'vuex'
export default {
  components: {GradientItem},
  props: {
    icon: {
      type: String,
      default: '🔥'
    },
    title: {
      type: String,
      default: 'Gradients'
    },
    list: {
      type: [Array, Object],
      default: null
    }
  },
  computed: {
    ...mapGetters({
      selectedSize: 'filter/size'
    }),
    itemClasses () {
      if (this.selectedSize === 'small') {
        return 'gr-2 gr-12@xs gr-6@sm gr-4@md'
      } else {
        return 'gr-3 gr-12@xs gr-6@sm gr-4@md'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
	@import "../../styles/variables/index";
	@import "../../styles/utils/mixin";
	.gradient-grid {
		margin-top: 80px;
		& > .header {
			& > .title {
				@include font-size(20);
				font-weight: 500;
				color: $color--primary;
				margin: 0;
			}
		}
	}
</style>
