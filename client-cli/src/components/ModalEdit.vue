<template>
   <div>
      <!-- Button trigger modal -->
      
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalEdit">
         <span class="fa fa-pencil-square-o"></span> Edit 
      </button>

      <!-- Modal -->
      <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">Edit {{item.name}}</h5>
               </div>
                  
               <div class="modal-body">
                  <p> Simply fill out the field you want changed and ignore the rest :)</p><br>
                  <!-- ga ganti?? -->
                  <form>
                     <div class="form-group row">
                        <label for="Name" class="col-sm-2 col-form-label">Name:</label>
                        <div class="col-sm-10">
                           <input type="text" 
                                 class="form-control" 
                                 v-model="name"
                                 name="name" 
                                 placeholder="Item Name">
                        </div>
                     </div>
                     <div class="form-group row">
                        <label for="price" class="col-sm-2 col-form-label">Price:</label>
                        <div class="col-sm-10">
                          <input type="price" 
                                 name="price"
                                 class="form-control" 
                                 v-model="price"
                                 placeholder="Enter Price">
                        </div>
                     </div>
                     <div class="form-group row">
                        <label for="stockQty" class="col-sm-2 col-form-label">Stock Quantity:</label>
                        <div class="col-sm-10">
                           <input type="text" 
                                 name="stockQty"
                                 class="form-control" 
                                 v-model="stockQty"
                                 placeholder="0">
                        </div>
                     </div>
                     <div class="form-group row">
                        <label for="category" class="col-sm-2 col-form-label">Select Category: </label>
                        <select class="form-control col-sm-6" style="margin-left: 13px" name="category"  v-model="select">
                           <option default disabled value="">Please select coffee type: </option>
                           <option value="Dark Roast">Dark Roast</option>
                           <option value="Medium Roast">Medium Roast</option>
                           <option value="Blonde Roast">Blonde Roast</option>
                        </select><br>
                  </div>
                     <div class="file-field input-field form-group row">
                        <label for="file" class="col-sm-2 col-form-label">Upload Image: </label>
                        <div class="btn">
                           <input type="file" name="file" ref="file" v-on:change="handleFileUpload()"> <br><span style="color: red; font-size: 10px;">{{ errors.first('file') }}</span>
                        </div>
                        
                     </div>                  
                  </form>
               </div>
               <div class="modal-footer">
                  <button class="btn btn-secondary" style="margin-right: 15px" data-dismiss="modal" @click="clear()">Cancel</button>
                  <button class="btn btn-primary" :data-dismiss="dismiss" @click="submit()">Submit</button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
 import {mapActions} from 'vuex'
  export default {
   props:['item'],
   $_veeValidate: {
      validator: 'new'
   },
   data() {
      return{
         name: '', 
         price: '',
         stockQty: '',
         select: '',
         file: '',
         dismiss: '',
      }
   },
   mounted () {
         this.$validator.localize('en', this.dictionary)
      },
   methods: {
   ...mapActions([
      'editInventory',
   ]),
      handleFileUpload(){
         this.file = this.$refs.file.files[0];
      },
      submit () {
         console.log("---", this.select)
         let self = this;
         console.log("id nich: " , this.item._id)

         let formData = new FormData();
         if(self.file){
            formData.append('file', self.file)
         }
         if(self.select){
            formData.append('type', self.select)
         }
         if(self.name){
            formData.append('name', self.name)
         }
         if(self.price){ 
            formData.append('price', self.price)
         }
         if(self.stockQty){
            formData.append('stockQty', self.stockQty)
         }
         formData.append('itemid', self.item._id)
         console.log("!!!!", formData.values());

         this.$validator.validateAll()
         .then(function(result){
            if(result === true){
               self.editInventory(formData)
               self.dismiss = "modal";
               self.clear();
            }
         })
         .catch(function(err){
            console.log(err)
         })
         
      },
      clear () {
         this.stockQty = '';
         this.name = '';
         this.price = '';
         this.select = ''
         this.file = ''
         this.$validator.reset();
      }
   },
   created(){
      if(!localStorage.getItem('token')){
         this.$router.push('/')
      }

      //   this.stockQty = this.item.stockQty;
      //   this.name = this.item.name;
      //   this.price = this.item.price;
      //   console.log("created: ", this.name)
   }
}
</script>
