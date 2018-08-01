<template>
   <div class="container" style="margin-top: 150px">
      <div class="row">
         <div class="col align-self-center">
            <div class="card" >
            <h5 class="card-header" style="font-weight:600; font-size: 25px">Admin Log In</h5>
            <div class="card-body">
               <p style="font-weight: 500"> This is an area for admin only. <br>
               If you're a customer, please go back to browse our goods </p>
               <br><br>
                <form>
                  <div class="form-group row">
                     <label for="email" class="col-sm-2 col-form-label" style="font-weight: 600">Email:</label>
                     <div class="col-sm-10">
                        <input  type="email" 
                              class="form-control" 
                              v-validate="'required|email'" 
                              v-model="email"
                              name="email"
                              aria-describedby="emailHelp" 
                              placeholder="Enter email">
                        <span style="color: red">{{ errors.first('email') }}</span>
                     </div>
                  </div>
                  <br>
                  <div class="form-group row">
                     <label for="password" class="col-sm-2 col-form-label" style="font-weight: 600">Password:</label>
                     <div class="col-sm-10">
                        <input type="password" 
                               name="password"
                               v-validate="'required: true, regex: /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/, min: 6'" 
                               class="form-control" 
                               v-model="password"
                               placeholder="Password">
                        <span style="color: red">{{ errors.first('password') }}</span>
                     </div>
                  </div>
                  <br><br>
                  <button class="btn btn-secondary" style="margin-right: 15px" @click="clear()">Clear</button>
                  <button class="btn btn-primary" @click.prevent="submit()">Submit</button>
               </form>
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
      email: '',
      password: '',
      dictionary: {
         attributes: {
          email: 'E-mail Address'
        },
        custom: {
          password: {
            required: 'Password cannot be empty',
            min: 'Password must contain at least 6 characters',
            regex:'Password must contain at least 1 number'
            // custom messages
          },
          email: {
            required: "E-mail cannot be empty"
          }
        }
      }
  }),
  mounted () {
      this.$validator.localize('en', this.dictionary)
    },
   methods: {
     ...mapActions([
       'signIn'
     ]),
      submit () {

        //Harap d tunggu, upload and reloadnya rada lama
        let self = this;
        let inputEmail = this.email;
        inputEmail = inputEmail.toLowerCase();
        console.log("input email: ", inputEmail)
         let userData = {
           email: inputEmail,
           password: self.password
         }

         this.$validator.validateAll()
         .then(function(result){
           if(result === true){
              self.signIn(userData)
              self.clear();
           }
         })
         .catch(function(err){
           console.log(err)
         })
         
      },
      clear () {
         this.email = ''
         this.password = ''
         this.$validator.reset()
      }
   },
}
</script>
