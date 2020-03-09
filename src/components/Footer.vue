<template>
  <!-- Footer -->
    <footer class="sticky-footer bg-white">
      <div class="container my-auto">
        <div class="copyright text-center my-auto">
          <span>Copyright &copy; {{brand}} {{date}}</span>
        </div>
      </div>
    </footer>
  <!-- End of Footer -->
</template>

<script>
export default {
  name: 'Footer',
  data(){
    return {
      date: new Date().getFullYear(),
      brand: 'Al-Anhar'
    }
  }
};
</script>

<style>

</style>