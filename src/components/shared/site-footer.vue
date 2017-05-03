<template>
	<div class="site-footer">
		<div class="container">
			<div class="inner">
				<p class="copyright">&copy; 2017 Sen Việt. <a href="mailto:nguyenvanduocit@gmail.com">Nguyễn Văn Được</a> | <router-link to="/about">About</router-link></p>
				<div class="links">
					<a href="#"><i class="icon-facebook-square"></i></a>
					<a href="#"><i class="icon-linkedin-square"></i></a>
					<a href="#"><i class="icon-twitter-square"></i></a>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
@import "../../styles/variables/index";
@import "../../styles/utils/mixin";
.site-footer{
	border-top:1px solid $color--border;
	margin-top: 100px;
	p{
		margin: 0;
	}
	.inner{
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 70px;
		.copyright{
		}
		.links{
			a{
				border: none;
				color: $color--primary;
				transition: $transition-primary;
				&:hover{
					color: $color--link;
				}
				i{
					@include font-size(30);
				}
			}
		}
	}
}
</style>
