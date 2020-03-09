<template>
    <div id="wrapper">
      <Sidebar></Sidebar>
      <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
          <!-- Main Content -->
          <div id="content">
            <Navbar></Navbar>
            <router-view />
          </div>
          <Footer></Footer>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Sidebar,
    Navbar,
    Footer
  }
}
</script>
