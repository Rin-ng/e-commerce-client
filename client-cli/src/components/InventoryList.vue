<template>
   <div class="container">
      <div class="row"> 
         <div class="col-lg-4" v-for="(item, index) in adminInventory" :key="index" >  
            <div class="card" style="width: 18rem; margin-bottom: 20px;">
               <div class="imgWrapper" style="max-height:200px; min-height: 200px">
                  <img class="card-img-top" :src="item.imgUrl" alt="Card image cap" style="max-height:190px">
               </div>
               <div class="card-body">
                  <h5 class="card-title">{{item.name}}</h5>
                  <p class="card-text">
                     Price: {{item.price}} <br>
                     Type: {{item.type}} <br>
                     Stock Qty: {{item.stockQty}} <br>
                  </p>
                  <div class="row">
                    <div class="col-sm-6">
                      <button type="button" class="btn btn-primary" @click="remove(item._id)"> <i class="fa fa-trash"></i> Delete </button>
                    </div>
                    <div class="col-sm-6">
                      <ModalEdit :item="item"></ModalEdit> 
                      <!-- tapi cm bs baca 1st item, ga bs d bind properly? -->
                    </div>
                  </div>
               </div>
            </div>   
         </div>
      </div>
   </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import ModalEdit from '@/components/ModalEdit.vue'
export default{
   name: 'cart',
   components:{
     ModalEdit
   },
   methods:{
      ...mapActions([
         'getAdminInventory', 'deleteItem'
      ]),
      remove(item){
        this.deleteItem(item);
      }
   },
   computed: {
      ...mapState([
         'adminInventory'
      ])
   },
   created(){
      this.getAdminInventory();
   }
}
</script>