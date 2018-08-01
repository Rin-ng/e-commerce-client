<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <a class="navbar-brand" @click="home()" style="font-weight:800; color: white; border: solid 1px white;"> <span style="margin:3px 10px">Procaffeination</span> </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
         <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item" :class="{ active: isActiveAll }">
            <a class="nav-link" @click="home()">All Categories </a>
            </li>
            <li class="nav-item" :class="{active: isActiveDark}">
            <a class="nav-link" @click="darkRoast()">Dark Roast</a>
            </li>
            <li class="nav-item" :class="{active: isActiveMedium}">
            <a class="nav-link" @click="mediumRoast()">Medium Roast</a>
            </li>
            <li class="nav-item" :class="{active: isActiveBlonde}">
            <a class="nav-link" @click="blondeRoast()">Blonde Roast</a>
            </li>
           
         </ul>
         <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model="searchQuery">
            <button class="btn btn-outline-light my-2 my-sm-0"  @click="search()" style="margin-right: 20px">Search</button>
         </form>
          <button type="button" style="margin-right:15px" class="btn btn-outline-light" data-toggle="modal" data-target="#viewCart" >
              <span class="fa fa-shopping-cart"></span>
              <span style="font-size:1rem; margin-left: 5px">View Cart</span>
              <span v-if="qty !== 0" style="margin-left: 5px" class="badge badge-pill badge-danger">{{qty}}</span>
          </button>
          <ModalCart></ModalCart>
          <button v-if="loginStatus === true" class="btn btn-outline-light my-2 my-sm-0"  @click="logOut()"> 
            Log Out
          </button>
          <button v-if="loginStatus === false" class="btn btn-outline-light my-2 my-sm-0"  @click="logIn()"> 
            Log In
          </button>
      </div>
   </nav>
</template>

<script>
import ModalCart from '@/components/ModalCart.vue'
import {mapState, mapActions} from 'vuex'
export default{
   name: 'cart',
   components:{
     ModalCart
   },
   data(){
      return{
        qty: 0,
        searchQuery: '',
        loginStatus: '',
        isActiveAll: true,
        isActiveDark: false,
        isActiveMedium: false,
        isActiveBlonde: false,
      }
   },
   methods:{
      ...mapActions([
         'getCart', 'searchCategory', 'getInventory'
      ]),
      logOut(){
        localStorage.clear();
        this.$router.push('/');
        this.loginStatus = false;
      },
      logIn(){
        this.$router.push('/login')
      },
      darkRoast(){
        this.searchCategory('Dark Roast')
        this.isActiveAll= false;
        this.isActiveDark= true;
        this.isActiveMedium= false;
        this.isActiveBlonde= false;
      },
      mediumRoast(){
        this.searchCategory('Medium Roast')
        this.isActiveAll= false;
        this.isActiveDark= false;
        this.isActiveMedium= true;
        this.isActiveBlonde= false;
      },
      blondeRoast(){
        this.searchCategory('Blonde Roast')
        this.isActiveAll= false;
        this.isActiveDark= false;
        this.isActiveMedium= false;
        this.isActiveBlonde= true;
      },
      search(){

      },
      home(){
        this.getInventory();
        this.$router.push('/');
        this.isActiveAll= true;
        this.isActiveDark= false;
        this.isActiveMedium= false;
        this.isActiveBlonde= false;
      }
   },
   created(){
    let self = this;
    if(!localStorage.getItem('token')){
      self.loginStatus = false
    }
    else{
      self.loginStatus = true;
    }
    this.getCart();
  },
  computed:{
      ...mapState([
         'shoppingCart'
      ])
   },
   watch:{
    shoppingCart(){
      let self = this;
      let temp = 0;
      for(let i = 0; i < this.shoppingCart.length; i++){
        temp += self.shoppingCart[i].qty
      }
      this.qty = temp;
    }
  },
}
</script>
<style>
.fa-stack{
   line-height: 0;
   display: inline;
   vertical-align: baseline;
   left: 96%;
   bottom: 3%;

}
.fa-5x{
   font-size: 2em;
}
.fa-stack[data-count]:after{
   position:absolute;
   right:3%;
   top:2%;
   content: attr(data-count);
   font-size:15%;
   padding:.6em;
   border-radius:999px;
   line-height:.75em;
   color: white;
   background:rgba(255,0,0,.85);
   text-align:center;
   font-weight:bold;
}
</style>