<template>
  <div class="container-fluid">
    <h1 class="h3 mb-4 text-gray-800">Tambah Pengajian
        <router-link to="/kajian" class="btn btn-danger float-right">Kembali</router-link>
    </h1>
    <div class="row">
      <div class="col-lg-12">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Tambah jadwal pengajian</h6>
            </div>
            <div class="card-body">
              <form @submit="onSubmit">
                <div class="card">
                  <div class="card-header">
                    <span>Lengkapi data dibawah untuk menambahkan pengajian</span>
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                      <label>Judul*</label>
                      <input required type="text" v-model.trim="kajian.title" class="form-control" placeholder="Materi pengajian atau judul">
                    </div>
                    <div class="form-group">
                      <label>Pemateri*</label>
                      <input required type="text" v-model.trim="kajian.lecturer" class="form-control" placeholder="Nama pemateri atau penceramah">
                    </div>
                    <div class="form-group">
                      <label>Tanggal*</label>
                      <input required type="date" v-model.trim="kajian.date" class="form-control" placeholder="Jadwal tanggal pengajian">
                    </div>
                    <div class="form-group">
                      <label>Waktu*</label>
                      <input required type="text" v-model.trim="kajian.time" class="form-control" placeholder="Spesifik waktu misal bada maghrib-isya">
                    </div>
                    <div class="form-group">
                      <label>Keterangan</label>
                      <vue-editor v-model.trim="kajian.desc"></vue-editor>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="btn-group float-right">
                      <router-link to="/kajian" class="btn btn-danger">Batal</router-link>
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
  name: 'KajianAdd',
  data(){
    return {
      firestore: firebase.firestore().collection('kajian'),
      kajian: {}
    };
  },
  components: {
    VueEditor
  },
  methods: {
    onSubmit(evt){
    evt.preventDefault();
     this.$confirm("Apakah data yang kamu isi sudah benar?").then(() => {
        this.firestore.add(this.kajian).then((docRef) => {
        this.kajian.title = '';
        this.kajian.lecturer = '';
        this.kajian.date = '';
        this.kajian.time = '';
        this.kajian.desc = '';
        router.push({
          name: 'Kajian'
        }).catch((err) => {
          alert(`Error while adding ${err}`);
        });
      });
     });
    }
  }
};
</script>

<style>

</style>