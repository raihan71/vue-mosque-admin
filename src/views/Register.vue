<template>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Admin Masjid</h1>
                  </div>
                  <div class="user">
                    <form @submit="signUp">
                      <div class="form-group">
                        <input type="email" v-model="email" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." required>
                      </div>
                      <div class="form-group">
                        <input type="password" v-model="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" required>
                      </div>
                      <div class="form-group">
                        <input type="password" class="form-control form-control-user" placeholder="Konfirmasi Password" required>
                      </div>
                      <button type="submit" class="btn btn-primary btn-user btn-block">
                        Daftar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import router from '../router'

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function(evt) {
      evt.preventDefault();
      this.$confirm("Apakah data sudah benar?").then(() => {
        firebase.auth().createUserWithEmailAndPassword(
          this.email,
          this.password
        ).then(() => {
          this.$fire({
              title: "Berhasil",
              text: "Data berhasil dibuat",
              type: "success",
              timer: 3000
            }),
          this.$router.push({name:'Home'})
        }).catch((err) => {
          this.$fire({
            title: "Gagal",
            text: `Oopss.. terjadi kesalahan ${err}`,
            type: "error",
            timer: 3000
          })
        })
      })
    }
  }
};
</script>

<style>

</style>