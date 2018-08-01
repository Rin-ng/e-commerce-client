import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
/* eslint-disable */

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inventoryArr: '',
    shoppingCart: '',
    adminInventory: ''
  },
  mutations: {
    inventoryArr(state, payload){
      state.inventoryArr = payload
    },
    shoppingCart(state,payload){
      state.shoppingCart = payload;
    },
    adminInventory(state, payload){
      state.adminInventory = payload;
    }
  },
  actions: {
    signIn({commit}, userData){
      
      axios.post('http://localhost:3000/users/signIn', {
        email: userData.email,
        password: userData.password
      })
      .then(function({data}){
        console.log("response: ", data)
        swal({
          title: "You have successfully logged in!",
          text: `Welcome Back, ${data.user.name}!`, 
          icon: "success"
        });
          localStorage.setItem("token", data.token);
          router.push('/inventory')
      })
      .catch(function(err){
        swal({
          title: "Oops! Something went wrong",
          text: `Please try again: ${err}`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      })
    },
    addInventory({commit,dispatch}, formData){
      let token = localStorage.getItem('token');
      let self = this;
      axios.post("http://localhost:3000/inventory/addItem", formData, 
      {
        headers: {
          token: token,
        }
      })
      .then(function(response){
          console.log(response);
          swal("You have successfuly added a new item!", {
            icon: "success",
          });
          self.dispatch('getAdminInventory')
      })
      .catch(function(err){
          console.log(err);
      })
    },
    deleteItem({commit, displatch}, id){
      let self = this;
      swal({
        title: "Are you sure?",
        text: "Deleted item cannot be recovered!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willConfirm) => {
        if (willConfirm) {
          
          axios.delete('http://localhost:3000/inventory/deleteItem',{
            headers:{
              token: localStorage.getItem('token'),
              id: id
            }
          })
          .then(function({data}){
            console.log(data);
            swal("You have successfuly deleted task", {
              icon: "success",
            });
            self.dispatch('getAdminInventory')
          })
          .catch(function(err){
            console.log(err)
          })
        } 
        else {
          swal("Your task is saved :)");
        }
      });
    },
    getInventory({commit}){
      axios.get('http://localhost:3000/inventory/')
      .then(function({data}){
        commit('inventoryArr', data)
      })
      .catch(function(err){
        console.log(err)
      })
    },
    getAdminInventory({commit}){
      axios.get('http://localhost:3000/inventory/')
      .then(function({data}){
        commit('adminInventory', data)
      })
      .catch(function(err){
        console.log(err)
      })
    },
    searchCategory({commit}, type){
      axios.post('http://localhost:3000/inventory/searchType', {
        type: type
      })
      .then(function({data}){
        console.log(data);
        commit('inventoryArr', data)
      })
      .catch(function(err){
        console.log(err)
      })
    },
    editInventory({commit, dispatch}, newItem){
      console.log("edit ", newItem);
      let self = this;
      axios.put('http://localhost:3000/inventory/updateItem', newItem,{
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(function({data}){
        console.log(data)
        self.dispatch('getAdminInventory')
      })
      .catch(function(err){
        console.log(err)
      })
    },
    //SHOPPING CART
    getCart({commit}){
      axios.get('http://localhost:3000/cart/')
      .then(function({data}){
        console.log("dari getcart: " ,data)
        commit('shoppingCart', data)
      })
      .catch(function(err){
        console.log(err)
      })
    },
    addToCart({commit,dispatch}, item){
      let self = this;
      console.log("di store: ", item);
      item['qty'] = 1
      item['itemid'] = item._id;
      console.log("abis masukin qty & id field: ", item)
      axios.post("http://localhost:3000/cart/addItem", item)
      .then(function(response){
          console.log(response);
          self.dispatch('getCart')
      })
      .catch(function(err){
          console.log(err);
      })
    },
    updateCart({commit, dispatch}, newItem){
      let self = this;
      axios.put("http://localhost:3000/cart/updateItem", {itemid: newItem._id, qty: newItem.qty})
      .then(function(response){
        console.log(response)
        self.dispatch('getCart')
      })
      .catch(function(err){
        console.log(err)
      })
    },
    deleteItemCart({commit, dispatch}, item){
      let self = this;
      axios.delete("http://localhost:3000/cart/deleteItem", {
        headers:{
          id : item._id
        }
      })
      .then(function(response){
        console.log(response);
        self.dispatch('getCart')
      })
      .catch(function(err){
        console.log(err)
      })
    },
    findItem({commit, dispatch}, item){
      console.log(item);
      let self = this;
      axios.post("http://localhost:3000/cart/findItem", {id: item._id})
      .then(function({data}){
        console.log("dari find item: " , data)
        if(data.message === "found"){
          console.log('old qty: ', data.item[0].qty);
          data.item[0].qty++;
          let newItem = data.item[0];
          self.dispatch('updateCart', newItem)
        }
        else{
          self.dispatch('addToCart', item )
        }
      })
      .catch(function(err){
        console.log("dari find: " , err)
      })
    }
  }
})
