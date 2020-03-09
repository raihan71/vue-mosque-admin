<template>
  <div class="container-fluid">
      <!-- Page Heading -->
      <h1 class="h3 mb-4 text-gray-800">Galeri</h1>

      <div class="row">
        <div class="col-lg-12">
              <!-- Circle Buttons -->
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Pengaturan Galeri</h6>
                </div>
                <div class="card">
                  <div class="card-header">
                    List Galeri
                  </div>
                  <div class="card-body">
                    <img class="rounded" v-for="img in images" v-bind:key="img.id" :src="img.url">
                  </div>
                </div>
                <div class="card-body">
                  <div class="card">
                    <div class="card-header">
                      <span>Upload dokumentasi/media kegiatan masjid</span>
                    </div>
                    <div class="card-body">
                      <div class="form-group">
                        <label>Foto</label>
                        <input required type="file" class="form-control" @change="previewImage" accept="image/*" placeholder="Pilih foto">
                      </div>
                    </div>
                    <div class="card-footer">
                      <button @click="onUpload" class="btn btn-primary float-right">
                        Upload
                      </button>
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
  name: 'Gallery',
  data(){
    return{
      imageData: null,
      picture: null,
      uploadValue: 0,
      images: [],
	  }
  },
  methods:{
    previewImage(event){
      uploadValue: 0
      this.picture=null;
      this.imageData = event.target.files[0];
    },
    onUpload(){
      this.$confirm("Apakah kamu yakin untuk upload file ini?").then(() => {
        this.picture=null;
        const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot => {
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error => { console.log(error.message) }, () => {
          this.uploadValue=100;
          this.$fire({
            title: "Berhasil",
            text: "file berhasil diupload",
            type: "success",
            timer: 3000
          });
          this.$router.push({
            name: 'Gallery'
          })
        }      
      );
      })
    },
    getImages(){
      let i = 0;
      const storage = firebase.storage();
      const storageRef = storage.ref();
      storageRef.child('/').listAll().then((resp => {
        resp.items.forEach((imgRef) => {
          i++;
          this.displayImages(i,imgRef);
        });
      }));
    },
    displayImages(row,images){
      images.getDownloadURL().then((url) => {
        this.images.push({
          id: row,
          url: url
        });
      });
    }
  },
  created(){
    this.getImages();
  }
};
</script>

<style scoped>
img {
    width: 200px;
    height: 200px;
}
</style>