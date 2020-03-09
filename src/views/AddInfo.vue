<template>
  <div class="container-fluid">
    <h1 class="h3 mb-4 text-gray-800">Tambah Pengumuman
        <router-link to="/info" class="btn btn-danger float-right">Kembali</router-link>
    </h1>
    <div class="row">
      <div class="col-lg-12">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Tambah Pengumuman</h6>
            </div>
            <div class="card-body">
              <form @submit="onSubmit">
                <div class="card">
                  <div class="card-header">
                    <span>Lengkapi data dibawah untuk menambahkan pengumuman</span>
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                      <label>Judul</label>
                      <input type="text" required class="form-control" v-model.trim="info.title" placeholder="Judul pengumuman">
                    </div>
                    <div class="form-group">
                      <label>Keterangan</label>
                      <vue-editor v-model.trim="info.desc"></vue-editor>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="btn-group float-right">
                      <router-link to="/info" class="btn btn-danger">Batal</router-link>
                      <button type="submit" class="btn btn-primary">Simpan</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import router from '../router'
import { VueEditor } from "vue2-editor";
export default {
  name: 'InfoAdd',
  data(){
    return {
      firestore: firebase.firestore().collection('news'),
      info: {}
    };
  },
  components: {
    VueEditor
  },
  methods: {
    onSubmit(evt){
      evt.preventDefault()
      this.$confirm("Apakah kamu yakin data yang diisi sudah benar?").then(() => {
        this.firestore.add(this.info).then((docRef) => {
          this.info.title = '';
          this.info.desc = '';
          router.push({name:'Info'});
          this.$fire({
            title: "Berhasil",
            text: "Data berhasil disimpan",
            type: "success",
            timer: 3000
          });
        }).catch((err) => {
          this.$fire({
              title: "Gagal",
              text: `Oopss.. terjadi kesalahan ${err}`,
              type: "error",
              timer: 3000
          });
        });
      }).catch();
    }
  }
};
</script>

<style>

</style>