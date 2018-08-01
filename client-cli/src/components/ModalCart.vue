<template>
   <div class="modal fade" id="viewCart" tabindex="-1" role="dialog" aria-labelledby="viewCartLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="viewCartLabel">Shopping Cart</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <div class="row" v-for="(cartItems,index) in shoppingCart" :key=index>
                  <div class="col-3" style="padding:20px 5px; margin-left: 10px">
                     <div class="imgWrapper">
                        <img class="card-img-top" :src="cartItems.imgUrl" alt="Card image cap" style="width:100%; border-bottom: 1px solid lightgrey;">
                     </div>
                  </div>
                  <div class="col-6" style="text-align: center;">
                     <p class="card-text" style=" padding: 20px 0px; border-bottom: 1px solid lightgrey;">
                        {{cartItems.name}}<br>
                        {{cartItems.price}}<br>
                        <button @click="reduce(cartItems)" class=" btn btn-primary minusButton">-</button><input class="qtyInput" type="text" v-bind:value="cartItems.qty" style="max-width:60px; max-height:40px; text-align:center"><button @click="add(cartItems)" class=" btn btn-primary addButton">+</button>
                     </p>
                  </div>
                  <div class="col"  style="margin:20px 0px">
                     <button type="button" @click="erase(cartItems)" class="btn btn-secondary btn-close" >x</button>
                  </div>
               </div>
            </div>
            <div class="modal-footer">
                  <span class="form-control-static text-left" style="font-weight:600">Total Price: ${{getTotal}}</span>
                  <button type="button" class="btn btn-secondary footer-btn" data-dismiss="modal" style="margin-right: 15px"><span class="footer-text">Close</span></button>
                  <button type="button" class="btn btn-primary footer-btn"><span class="footer-text" @click="checkout()"> Checkout </span></button>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default{
   data(){
      return{
         qty: '',
         localCart: '',
      }
   },
   methods:{
      ...mapActions([
         'getCart', 'updateCart', 'deleteItemCart'
      ]),
      erase(item){
         this.deleteItemCart(item);
      },
      reduce(item){
         let self = this;
         let currentQty = item.qty;
         if(currentQty > 0){
            currentQty--;

            console.log("original: ", item.qty)
            item['qty'] = currentQty;
            console.log("abis d kurang: ", item.qty)
            this.updateCart(item)
            if(currentQty === 0){
               this.erase(item);
            }
         }
      },
      add(item){
         let self = this;
         let currentQty = item.qty;

         console.log("ini currentQty: ", currentQty)
         currentQty+=1;
         console.log("ini dah nambah: ", currentQty)
         item['qty'] = currentQty;
         console.log("ini abis d daftar baru: ", item.qty)
         this.updateCart(item)
      },
      checkout(){
         let self = this;
         swal({
            title: "Are you ready to checkout?",
            text: "Your shopping cart will reset after checking out",
            icon: "warning",
            buttons: true,
            dangerMode: true,
         })
         .then((checkout) => {
            if (checkout) {
               for(let i = 0; i < self.shoppingCart.length; i++ ){
                  self.deleteItemCart(self.shoppingCart[i]);
               }
               swal("Thank you for your purchase!", {
                  icon: "success",
               });
               
            } else {
               swal("You cancelled your purchase :( ");
            }
         });
      }
   },
   computed:{
      ...mapState([
         'shoppingCart'
      ]),
      getTotal (){
         let self = this;
         let qty = 0;
         let price = [];
         let totalPrice = 0;

         for(let i = 0; i < this.shoppingCart.length; i++){
            qty += self.shoppingCart[i].qty 
            price.push(qty * self.shoppingCart[i].price);
            qty = 0;
         }
         for(let k = 0; k < price.length;k++){
            totalPrice += price[k];
         }
        
         return Number(totalPrice).toFixed(2);
      },
   },
   created(){
      this.getCart();
   }
}
</script>
<style>
.modal-backdrop{
   z-index: 0;
}
</style>

<style>
.minusButton, .addButton{
   border-radius: 200px;
   padding: 0px 10px;
   color: white;
}

.qtyInput{
   border-radius:10px;
   box-shadow: none;
}

.modal-footer {
   display: flex;
   width: 100%;
}
.form-control-static,
.pull-left {
   display: flex;
   width: 50%;
   justify-content: flex-start;
}
.footer-btn {
   display: flex;
   width: 25%;
   justify-content: flex-end;
}
.footer-text {
   width: 100%;
   margin: 0px;
   display: flex;
   justify-content: center;
   align-items: center;
}

.btn-close{
   border-radius: 100%;
   padding: 0px 8px;
   padding-bottom: 1.5px;
   background-color: white;
   color: darkred;
   border:2px solid darkred;
   font-weight: 700;
}
</style>