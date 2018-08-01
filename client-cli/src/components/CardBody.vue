<template>
   <div class="container">
      <div class="row"> 
         <div class="col-lg-4" v-for="(item, index) in inventoryArr" :key="index" >  
            <div class="card" style="width: 18rem; margin-bottom: 20px;">
               <div class="imgWrapper" style="max-height:200px; min-height: 200px">
                  <img class="card-img-top" :src="item.imgUrl" alt="Card image cap" style="max-height:190px">
               </div>
               <div class="card-body">
                  <h5 class="card-title">{{item.name}}</h5>
                  <p class="card-text">${{item.price}}</p>
                  <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#viewCart" @click="addItem(item)">
                  <span class="fa fa-shopping-cart"></span> 
                     Add to Cart
                  </a>
               </div>
            </div>   
         </div>
      </div>
   </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default{
   data(){
      return{
      }
   },
   methods:{
      ...mapActions([
         'getInventory', 'addToCart', 'updateCart', 'getCart', 'findItem'
      ]),
      addItem(item){
         this.findItem(item);
      },

   },
   created(){
      this.getInventory();
      this.getCart();
      console.log(this.shoppingCart)
   },
   computed:{
      ...mapState([
         'inventoryArr', 'shoppingCart'
      ])
   }
}
</script>