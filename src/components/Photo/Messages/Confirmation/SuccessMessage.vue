<template>
    <div class="row">
        <div class="col-lg-6 col-lg-offset-3 text-center center-vertically">
           
            <div class="alert alert-success">
                <div>
                    <strong>The photos you selected from {{ currentAlbum }} Album were uploaded successfully!</strong>
                </div>
                
                <br/>
                <!--use 'router-link' instead of anchor tag to avoid the default behavior, because anchor tag will always send the request to the server and reload the page. but 'router-link' just load the the component of the currently active route without leaving the app -->
                <router-link to="/">
                    <a class="btn btn-success">
                        <span class="glyphicon glyphicon-home"></span> Take Me Home
                    </a>         
                </router-link>
                    
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data: function(){
          return{
              currentAlbum: '', //holds the name of the current album
              //'albumId' property holds the album id passed in the currently active route
              albumId: this.$route.params.albumID,
              albums: [{name: "dogs",id: 1},{name: "cats",id: 2},{name: "black & white",id: 3},{name: "coffee",id: 4},
                       {name: "horses",id: 5},{name: "backgounds",id: 6},{name: "nature",id: 7},{name: "music",id: 8},
                       {name: "bikes",id: 9},{name: "ocean",id: 10},{name: "elephant",id: 11},{name: "forest",id: 12},
                       {name: "snow",id: 13},{name: "lions",id: 14},{name: "panda",id: 15},{name: "cars",id: 16},
                       {name: "birds",id: 17},{name: "swan",id: 18},{name: "new york",id: 19},{name: "marrakech",id: 20},
                       {name: "london",id: 21},{name: "monkeys",id: 22},{name: "tigers",id: 23},{name: "rabbits",id: 24}]
          }; 
        },
        //code to exexute during the created phase of the component lifecycle
        created(){
            //retrieve the name of the album and store it in the 'currentAlbum' property
            for (let i = 0; i < this.albums.length; i++) {
              if (this.albumId == this.albums[i].id) {
                this.currentAlbum = this.albums[i].name;
              }
            }
        }
    }
</script>

<style scoped>
    .center-vertically{
        padding-top: 300px;
    }
</style>