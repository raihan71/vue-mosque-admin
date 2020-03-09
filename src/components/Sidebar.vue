<template>
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" :class="{toggled:isToggled}" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Admin Masjid</div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        Pengaturan
      </div>

      <li class="nav-item">
        <router-link to="/donasi" class="nav-link">
          <i class="fas fa-hand-holding-usd"></i>
          <span>Donasi</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/gallery" class="nav-link">
          <i class="fas fa-photo-video"></i>
          <span>Galeri</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/info" class="nav-link">
          <i class="fas fa-bullhorn"></i>
          <span>Pengumuman</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/kajian" class="nav-link">
          <i class="fas fa-praying-hands"></i>
          <span>Kajian</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/takmir" class="nav-link">
          <i class="fas fa-users"></i>
          <span>Takmir</span>
        </router-link>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block">

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button @click="sidebarToggle" class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>
    <!-- End of Sidebar -->
</template>

<script>
export default {
  name: 'Sidebar',
  data(){
    return {
      isToggled: false
    }
  },
  methods: {
    sidebarToggle(){
      this.isToggled = !this.isToggled
    }
  }
};
</script>

<style>

</style>