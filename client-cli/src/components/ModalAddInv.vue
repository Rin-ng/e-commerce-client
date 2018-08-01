<template>
   <div style="margin-top: 100px">
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
      Add New Inventory
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">Add New Inventory</h5>
               </div>
                  
               <div class="modal-body">
                  <form>
                     <div class="form-group row">
                        <label for="Name" class="col-sm-2 col-form-label">Name:</label>
                        <div class="col-sm-10">
                           <input type="text" 
                                 class="form-control" 
                                 v-validate="'required'" 
                                 v-model="name"
                                 name="name" 
                                 placeholder="Item Name">
                           <span style="color: red; font-size: 10px">{{ errors.first('name') }}</span>
                        </div>
                     </div>
                     <div class="form-group row">
                        <label for="price" class="col-sm-2 col-form-label">Price:</label>
                        <div class="col-sm-10">
                          <input type="price" 
                                 name="price"
                                 v-validate="'required|min_value:1'" 
                                 class="form-control" 
                                 v-model="price"
                                 placeholder="Enter Price">
                           <span style="color: red; font-size: 10px">{{ errors.first('price') }}</span>
                        </div>
                     </div>
                     <div class="form-group row">
                        <label for="quantity" class="col-sm-2 col-form-label">Stock Quantity:</label>
                        <div class="col-sm-10">
                           <input type="text" 
                                 name="quantity"
                                 v-validate="'required:true|min_value:1'" 
                                 class="form-control" 
                                 v-model="quantity"
                                 placeholder="0">
                           <span style="color: red; font-size: 10px">{{ errors.first('quantity') }}</span>
                        </div>
                     </div>
                     <div class="form-group row">
                        <label for="category" class="col-sm-2 col-form-label">Select Category: </label>
                        <select class="form-control col-sm-6" style="margin-left: 13px" name="category"  v-model="select" v-validate="'required:true'">
                           <option default disabled value="">Please select coffee type: </option>
                           <option value="Dark Roast">Dark Roast</option>
                           <option value="Medium Roast">Medium Roast</option>
                           <option value="Blonde Roast">Blonde Roast</option>
                        </select><br>
                     <span style="color: red; font-size: 10px; margin-left: 10px">{{ errors.first('category') }}</span>
                     </div>
                     <div class="file-field input-field form-group row">
                        <label for="file" class="col-sm-2 col-form-label">Upload Image: </label>
                        <div class="btn">
                           <input v-validate="'required:true'" type="file" name="file" ref="file" v-on:change="handleFileUpload()"> <br><span style="color: red; font-size: 10px;">{{ errors.first('file') }}</span>
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
   $_veeValidate: {
      validator: 'new'
   },
   data: () => ({
      name: '',
      price: '',
      quantity: '',
      select: '',
      file: '',
      dismiss: '',
      dictionary: {
        custom: {
         name:{
            required: "Name of item cannot be empty"
         },
         price: {
            required: "Price cannot be empty",
            min_value: "Price must be at least 1"
          },
          quantity:{
             required: "Stock quantity cannot be empty",
             min_value: "Must have a quantity of 1"
          },
          select:{
             is_not: "Please select category"
          },
          file:{
             required: "Image file cannot be empty"
          }
        }
      }
  }),
  mounted () {
      this.$validator.localize('en', this.dictionary)
    },
   methods: {
     ...mapActions([
       'addInventory'
     ]),
      handleFileUpload(){
         this.file = this.$refs.file.files[0];
      },
      submit () {
      console.log("---", this.select)
        let self = this;
        let formData = new FormData();
         formData.append('file', self.file)
         formData.append('name', self.name)
         formData.append('price', self.price)
         formData.append('stockQty', self.quantity)
         formData.append('type', self.select)
         console.log("!!!!", formData.values());

         this.$validator.validateAll()
         .then(function(result){
           if(result === true){
              self.addInventory(formData)
              self.dismiss = "modal";
              self.clear();
              
           }
         })
         .catch(function(err){
           console.log(err)
         })
         
      },
      clear () {
         this.name = ''
         this.price = ''
         this.quantity = ''
         this.select = ''
         this.file = ''
         this.$validator.reset()
      }
   },
   created(){
     if(!localStorage.getItem('token')){
       this.$router.push('/')
     }
   }
}
</script>
