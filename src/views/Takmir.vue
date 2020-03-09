<template>
  <div class="container-fluid">
      <!-- Page Heading -->
      <h1 class="h3 mb-4 text-gray-800">Takmir</h1>

      <div class="row">
        <div class="col-lg-12">
              <!-- Circle Buttons -->
              <form @submit="onSubmit">
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Pengaturan Takmir Masjid</h6>
                  </div>
                  <div class="card-body">
                    <p>Berikut data takmir masjid</p>
                    <div class="col-lg-12">
                      <div class="row mb-4">
                        <div class="col-lg-3">
                        <div class="card">
                          <div class="card-header">
                              <label>Penasehat</label>
                          </div>
                          <div class="card-body">
                            <div class="form-group">
                              <input type="text" v-model.trim="takmir.penasehat" required class="form-control" placeholder="Nama penasehat">
                            </div>
                          </div>
                        </div>
                        </div>
                        <div class="col-lg-3">
                        <div class="card">
                          <div class="card-header">
                              <label>Ketua</label>
                          </div>
                          <div class="card-body">
                            <div class="form-group">
                              <input type="text" v-model.trim="takmir.ketua" required class="form-control" placeholder="Nama ketua">
                            </div>
                          </div>
                        </div>
                        </div>
                        <div class="col-lg-3">
                        <div class="card">
                          <div class="card-header">
                              <label>Wakil Ketua</label>
                          </div>
                          <div class="card-body">
                              <div class="form-group">
                              <input type="text" v-model.trim="takmir.wakil_ketua" required class="form-control" placeholder="Nama Wakil ketua">
                              </div>
                          </div>
                        </div>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-lg-3">
                        <div class="card">
                          <div class="card-header">
                            <label>Sekretaris</label>
                          </div>
                          <div class="card-body">
                            <div class="form-group">
                              <input type="text" v-model.trim="takmir.sekretaris" required class="form-control" placeholder="Nama sekretaris">
                              </div>
                          </div>
                        </div>
                        </div>
                        <div class="col-lg-3">
                        <div class="card">
                          <div class="card-header">
                            <label>Bendahara</label>
                          </div>
                          <div class="card-body">
                            <div class="form-group">
                              <input type="text" v-model.trim="takmir.bendahara" required class="form-control" placeholder="Nama bendahara">
                              </div>
                          </div>
                        </div>
                        </div>
                        <div class="col-lg-3">
                        <div class="card">
                          <div class="card-body">
                          </div>
                        </div>
                        </div>
                        <div class="col-lg-3">
                        <div class="card">
                          <div class="card-body">
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button type="submit" class="btn btn-primary float-right">Simpan</button>
                  </div>
                </div>
              </form>
        </div>
      </div>
  </div>
</template>

<script>
import IDs from '../static/ids'
import firebase from 'firebase'

export default {
  name: 'Takmir',
  data(){
    return {
      takmir: {},
      firestore: firebase.firestore().collection('takmir')
    }
  },
  created(){
    this.getTakmirMasjid();
  },
  methods: {
    getTakmirMasjid(){
      const ref = this.firestore.doc(IDs.TakmirId);
      ref.get().then((doc) => {
        if(doc.exists){
          this.takmir = {
            key: doc.id,
            penasehat: doc.data().penasehat,
            ketua: doc.data().ketua,
            wakil_ketua: doc.data().wakil_ketua,
            sekretaris: doc.data().sekretaris,
            bendahara: doc.data().bendahara
          };
        }else{
          this.$router.push({name:'Home'})
        }
      });
    },
    onSubmit(evt){
      evt.preventDefault();
      this.$confirm("Apakah kamu yakin akan menyimpan ini?").then(() => {
        const updateRef = this.firestore.doc(IDs.TakmirId);
        updateRef.set(this.takmir).then((docRef) => {
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
        })
      })
    }
  }
};
</script>

<style>

</style>