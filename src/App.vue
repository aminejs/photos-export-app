<template>
<div>
<!--the condition inside 'v-if' is used to display the header only when 'albumGridRoute' and 'photoGridRoute' are the currently active routes-->   
<div class="container" v-if="['albumGridRoute', 'photoGridRoute'].indexOf($route.name) > -1">
    <div class="row">
         <div class="col-8">
         <app-header></app-header>
         </div>
    </div>
</div>
<div class="container">
     <div class="row">
        <router-view></router-view> <!--this is the place where the component of the currently active route should be loaded-->
     </div>
</div> 
   
 
</div> 
</template>

<script>
    import Header from './components/Shared/Header.vue'
    
    //register Header component locally
    export default {
        components: {
            appHeader: Header,
        }
    }
</script>

<style>
</style>
