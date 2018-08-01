<template>
  <div class="home">
    <Navbar/>
    <ModalAddInv></ModalAddInv>
    <br>
    <InventoryList></InventoryList>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import ModalAddInv from '@/components/ModalAddInv.vue'
import InventoryList from '@/components/InventoryList.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    ModalAddInv,
    InventoryList
    
  },
   created(){
     if(!localStorage.getItem('token')){
       this.$router.push('/')
     }
   }
}
</script>
