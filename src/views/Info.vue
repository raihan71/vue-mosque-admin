<template>
  <div class="container-fluid">
      <!-- Page Heading -->
      <h1 class="h3 mb-4 text-gray-800">Pengumuman
        <router-link to="/info/add" class="btn btn-secondary float-right">Tambah Pengumuman</router-link>
      </h1>

      <div class="row">
        <div class="col-lg-12">
              <!-- Circle Buttons -->
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">List Pengumuman</h6>
                </div>
                <div class="card-body">
                  <p v-if="news <= 0">Data masih kosong</p>
                  <div class="col-lg-12">
                    <div class="row">
                      <div v-for="info in news" :key="info.key" class="col-lg-4">
                        <div class="card">
                          <div class="card-header">
                            <span>{{info.title}}</span>
                          </div>
                          <div class="card-body">
                            {{info.desc | truncate(100)}}
                          </div>
                          <div class="card-footer">
                            <div class="btn-group float-right">
                              <button @click="deleteInfo(info.key)" class="btn btn-danger">Hapus</button>
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
  name: 'Info',
  data(){
    return {
      news: [],
      firestore: firebase.firestore().collection('news')
    }
  },
  created(){
    this.firestore.onSnapshot((querySnapshot) => {
      this.news = [];
      querySnapshot.forEach((doc) => {
        this.news.push({
          key: doc.id,
          title: doc.data().title,
          desc: doc.data().desc.replace(/<[^>]+>/g,'')
        })
      })
    })
  },
  methods: {
    deleteInfo(id){
      this.$confirm("Apakah kamu ingin menghapus data ini?").then(() => {
        firebase.firestore().collection('news').doc(id).delete().then(() => {
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