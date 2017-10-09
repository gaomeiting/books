<template>
  <div id="app">
  <div class="tab-wrap">
  <tab @selectItem="selectItem" :currentIndex='currentIndex'></tab>
  </div>
 
<keep-alive>
	<router-view></router-view>
</keep-alive>
  </div>
</template>

<script>
import Tab from "components/tab/tab";
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    selectItem(i) {
      if(i==this.currentIndex) return;
      this.currentIndex=i;
      switch(i) {
        case 0:
          this.$router.push('/bookstore');
        break;
        case 1:
          this.$router.push('/bookshelf');
        break;
      }
    }
  },
  components: {
    Tab
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~common/scss/variable";
.tab-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
