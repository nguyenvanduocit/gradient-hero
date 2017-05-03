<template>
	<div class="filters">
		<!-- div class="item tag-filter">
			<label>Tags:</label><input placeholder="dark, sad, ..." type="text" :value="tagString" @input="updateTags" class="tags">
		</div>
		<div class="divider"></div -->
		<div class="item shape-filter type-filter">
			<label>Shape:</label>
			<div @click.prevent="setShapeFilter('rectangle')" :class="{'active': selectedShape === 'rectangle'}" class="type rectangle"><i class="icon-close"></i></div>
			<div @click.prevent="setShapeFilter('square')" :class="{'active': selectedShape === 'square'}" class="type square"><i class="icon-close"></i></div>
			<div @click.prevent="setShapeFilter('circle')" :class="{'active': selectedShape === 'circle'}"class="type circle"><i class="icon-close"></i></div>
		</div>
		<div class="divider"></div>
		<div class="item size-filter type-filter">
			<label>Size:</label>
			<div @click.prevent="setShapeSizeFilter('large')" :class="{'active': selectedSize === 'large'}"class="type large"><i class="icon-close"></i></div>
			<div @click.prevent="setShapeSizeFilter('small')" :class="{'active': selectedSize === 'small'}"class="type small"><i class="icon-close"></i></div>
		</div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      selectedType: 'filter/type',
      selectedTags: 'filter/tags',
      selectedShape: 'filter/shape',
      selectedSize: 'filter/size'
    }),
    tagString () {
      return this.selectedTags.join(',')
    }
  },
  methods: {
    updateTags (event) {
      this.$store.commit('filter/SET_TAGS', event.target.value.split(','))
    },
    setTypeFilter (type) {
      this.$store.commit('filter/TOGGLE_TYPE', type)
    },
    setShapeFilter (type) {
      this.$store.commit('filter/TOGGLE_SHAPE', type)
    },
    setShapeSizeFilter (type) {
      this.$store.commit('filter/TOGGLE_SIZE', type)
    }
  }
}
</script>
<style lang="scss" scoped>
	@import "../../styles/variables/index";
	@import "../../styles/utils/mixin";
	.filters{
		display: flex;
		justify-content: center;
		align-items: center;
		label{
			@include font-size(14);
			margin-right: 10px;
		}
		.item{
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			flex-shrink: 0;
		}
		.divider{
			height: 15px;
			width: 1px;
			margin-left: 15px;
			margin-right: 15px;
			background: #E6E9EE;
		}
		.tag-filter{
			display: flex;
			justify-content: center;
			align-items: center;
			input[type="text"]{
				max-width: 300px;
				text-transform: uppercase;
				position: relative;
				display: block;
				transition: $transition-primary;
			}
		}
		.type-filter{
			line-height: 0;
			display: flex;
			justify-content: center;
			.type{
				width: 35px;
				height: 35px;
				border-radius: 3px;
				cursor: pointer;
				opacity: .5;
				transition: $transition-primary;
				display: flex;
				justify-content: center;
				align-items: center;
				i{
					transition: $transition-primary;
					opacity: 0;
					color: #ffffff;
					@include font-size(14);
					line-height: 11px;
				}
				&:hover, &.active{
					opacity: 1;
					background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
				}
				&.active{
					i{
						opacity: 1;
					}
				}
				&.linear{
					background-image: linear-gradient(-225deg, #F3DCFB 0%, #679FE4 100%);
				}
				&.radial{
					margin-left: 15px;
					background-image: radial-gradient(50% 0%, #F3DCFB 50%, #679FE4 100%);
				}
				&.rectangle{
					height: 25px;
					background-image: radial-gradient(50% 0%, #F3DCFB 50%, #679FE4 100%);
				}
				&.circle{
					border-radius: 50%;
					margin-left: 15px;
					background-image: radial-gradient(50% 0%, #F3DCFB 50%, #679FE4 100%);
				}
				&.square{
					margin-left: 15px;
					background-image: radial-gradient(50% 0%, #F3DCFB 50%, #679FE4 100%);
				}
				&.small{
					height: 25px;
					width: 25px;
					border-radius: 50%;
					margin-left: 15px;
					background-image: radial-gradient(50% 0%, #F3DCFB 50%, #679FE4 100%);
				}
				&.large{
					border-radius: 50%;
					background-image: radial-gradient(50% 0%, #F3DCFB 50%, #679FE4 100%);
				}
			}
		}
		@include media-breakpoint-down('md'){
			.size-filter, .shape-filter{
				display: none;
			}
		}
	}
</style>
