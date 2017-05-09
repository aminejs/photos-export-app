<template>
<div>
<div class="container">
    <div class="row">
         <div class="col-8">
         <app-header></app-header>
         </div>
    </div>
</div>
<div class="container">
     <div class="row">
        <router-view></router-view>
     </div>
</div> 
   
 
</div> 
</template>

<script>
    import Header from './components/Shared/Header.vue'
    
    export default {
        components: {
            appHeader: Header,
        }
    }
</script>

<style>
</style>
