<template>
  <div class="container-fluid">
      <!-- Page Heading -->
      <h1 class="h3 mb-4 text-gray-800">Donasi</h1>

      <div class="row">
        <div class="col-lg-12">
              <!-- Circle Buttons -->
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Pengaturan donasi</h6>
                </div>
                <div class="card-body">
                  <form @submit="onSubmit">
                    <div class="card">
                      <div class="card-header">
                        <span>Atur rekening untuk informasi donasi</span>
                      </div>
                      <div class="card-body">
                          <div class="form-group">
                            <label>Nomor rekening</label>
                            <input type="number" required v-model.trim="donate.norek" class="form-control" placeholder="Masukan rekening masjid">
                          </div>
                          <div class="form-group">
                            <label>Nama Bank</label>
                            <select class="form-control" required v-model.trim="donate.bank">
                              <option selected>Pilih bank</option>
                              <option v-for="bank in banks" :key="bank.value" v-bind:value="bank.value">{{bank.text}}</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label>Atas Nama</label>
                            <input type="text" required class="form-control" placeholder="Nama pemilik rekening" v-model.trim="donate.an">
                          </div>
                      </div>
                      <div class="card-footer">
                        <button type="submit" class="btn btn-primary float-right">
                          Simpan
                        </button>
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
import BankID from '../static/banks'
import IDs from '../static/ids'
import firebase from 'firebase'

export default {
  name: 'Donasi',
  data(){
    return{
      banks: [],
      donate: {},
      firestore: firebase.firestore().collection('donate')
    }
  },
  created(){
    this.banks = BankID;
    this.getDonateDetail();
  },
  methods: {
    getDonateDetail(){
      const ref = this.firestore.doc(IDs.DonateId);
      ref.get().then((doc) => {
        if(doc.exists){
          this.donate = {
            key: doc.id,
            bank: doc.data().bank,
            norek: doc.data().norek,
            an: doc.data().an
          };
        }else{
          this.$router.push({name:'Home'});
        }
      });
    },
    onSubmit(evt){
      evt.preventDefault();
      this.$confirm("Apakah kamu yakin akan menyimpan ini?").then(() => {
        const updateRef = this.firestore.doc(IDs.DonateId);
        updateRef.set(this.donate).then((docRef) => {
            this.$fire({
              title: "Berhasil",
              text: "Data berhasil disimpan",
              type: "success",
              timer: 3000
            });
            this.$router.push({name:'Donasi'})
        }).catch((err) => {
            this.$fire({
              title: "Gagal",
              text: `Oops.. gagal ${err}`,
              type: "error",
              timer: 3000
            });
        })
      })
    }
  }
}
</script>

<style>

</style>