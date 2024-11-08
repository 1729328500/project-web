<template>
  <div class="logo">
    <img :src="MenuLogo" />
    <span v-if="show" class="logo-title">{{ title }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MenuLogo from '@/assets/MenuLogo.png'
const title = ref('通⽤后台权限系统')
const show = ref(true)
import { useMenuStore } from '@/store/menu'
const store = useMenuStore()
watch(
  () => store.getCollapse,
  (collapsed: boolean) => {
    if (!collapsed) {
      setTimeout(() => {
        show.value = !collapsed
      }, 300)
    } else {
      show.value = !collapsed
    }
  }
)
</script>
<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #2b2f3a;
  text-align: center;
  cursor: pointer;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    margin-right: 5px;
    margin-left: 5px;
  }
  .logo-title {
    color: #fff;
    font-weight: 800;
    line-height: 60px;
    font-size: 22px;
    font-family: FangSong;
  }
}
</style>
