<template>
  <div id="app">
    <site-header></site-header>
    <router-view class="main"></router-view>
    <site-footer></site-footer>
  </div>
</template>

<script>
import SiteHeader from './components/shared/site-header.vue'
import SiteFooter from './components/shared/site-footer.vue'
export default {
  name: 'app',
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>
<style lang="scss">
  #app{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .site-header{
      position: fixed;
      top:0;
      left: 0;
      right: 0;
      z-index: 1001;
    }
    .site-header, .site-footer{
      flex-shrink: 0;
      flex-grow: 0;
    }
    .main{
      margin-top: 65px;
      flex-grow: 1;
    }
  }
</style>
