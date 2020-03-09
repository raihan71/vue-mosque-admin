<template>
  <div class="container-fluid">
      <!-- Page Heading -->
      <h1 class="h3 mb-4 text-gray-800">Kajian
        <router-link to="/kajian/add" class="btn btn-secondary float-right">Tambah pengajian</router-link>
      </h1>

      <div class="row">
        <div class="col-lg-12">
              <!-- Circle Buttons -->
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">List Kajian</h6>
                </div>
                <div class="card-body">
                  <p v-if="kajian <= 0">Data masih kosong</p>
                  <div class="col-lg-12">
                    <div class="row">
                      <div v-for="ngaji in kajian" :key="ngaji.key" class="col-lg-4">
                        <div class="card">
                          <div class="card-header">
                            <span class="cut-text">{{ngaji.title}}</span>
                          </div>
                          <div v-html="ngaji.desc" class="card-body cut-text">
                          </div>
                          <div class="card-footer">
                            <div class="btn-group float-right">
                              <button @click="deleteKajian(ngaji.key)" class="btn btn-danger">Hapus</button>
                            </div>
                          </div>
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
import firebase from 'firebase'

export default {
  name: 'Kajian',
  data(){
    return{
      kajian: [],
      firestore: firebase.firestore().collection('kajian')
    }
  },
  created(){
    this.firestore.onSnapshot((querySnapshot) => {
      this.kajian = [];
      querySnapshot.forEach((doc) => {
        this.kajian.push({
          key: doc.id,
          title: doc.data().title,
          desc: doc.data().desc
        });
      })
    })
  },
  methods: {
    deleteKajian(id){
      this.$confirm("Apakah kamu ingin upload file ini?").then(() => {
        firebase.firestore().collection('kajian').doc(id).delete().then(() => {
          this.$fire({
            title: "Berhasil",
            text: "Data berhasil dihapus",
            type: "success",
            timer: 3000
          })
        }).catch((err) => {
          alert(`Error while removing.. ${err}`)
        });
      });
    }
  }
};
</script>

<style>

</style>