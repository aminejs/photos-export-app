<template>
  <div>
      <h1>Your Albums</h1>
      <hr>
          <app-album v-for="album in albumsPerPage" :key="album.id">
              <!--use 'router-link' instead of anchor tag to avoid the default behavior, because anchor tag will always send the request to the server and reload the page. but 'router-link' just load the the component of the currently active route without leaving the app -->
              <router-link :to="{path: '/'+album.id}"> <!--pass the album id dynamically-->
                  <div class="col-lg-12 col-lg-offset-2">
                      <img :src="album.firstPic" :alt="album.name" class="img-rounded" height="300" width="300">
                  </div>          
                  <div class="col-lg-12 text-center">
                      <p class="album-name-font">{{ album.name }}</p>
                  </div>  
              </router-link>
          </app-album>  
      <footer>
            <div class="row">
                <div class="col-lg-12 text-center">
                <!--pagination-->
                      <paginate
                        :page-count="totalPages"
                        :click-handler="paginationClick"
                        :prev-text="'Prev'"
                        :next-text="'Next'"
                        :container-class="'pagination'">
                      </paginate>
                </div>
            </div>
      </footer>    
 </div>
</template>

<script>
    import Album from './Album.vue'
    
    export default {
        data: function(){
          return{
              //'albums' is the array i suppose to get from facebook. i created it myself
              albums: [{name: "dogs",id: 1,firstPic: 'https://cdn.pixabay.com/photo/2016/06/12/04/01/bonjour-xiufeng-downtown-            1451408_960_720.jpg'},
                       {name: "cats",id: 2, firstPic: 'https://cdn.pixabay.com/photo/2015/03/23/22/56/cat-686803_960_720.jpg'},
                       {name: "black & white",id: 3, firstPic: 'https://cdn.pixabay.com/photo/2016/11/12/07/46/glass-1818417_960_720.jpg'},
                       {name: "coffee",id: 4, firstPic: 'https://cdn.pixabay.com/photo/2016/03/05/22/16/aroma-1239226_960_720.jpg'},
                       {name: "horses",id: 5, firstPic: 'https://cdn.pixabay.com/photo/2013/10/17/20/59/horse-197199_960_720.jpg'},
                       {name: "backgounds",id: 6, firstPic: 'https://cdn.pixabay.com/photo/2015/12/17/08/14/greeting-card-1096981_960_720.jpg'},
                       {name: "nature",id: 7, firstPic: 'https://cdn.pixabay.com/photo/2015/10/22/17/45/leaf-1001679_960_720.jpg'},
                       {name: "music",id: 8, firstPic: 'https://cdn.pixabay.com/photo/2017/04/11/17/49/guitar-2222350_960_720.jpg'},
                       {name: "bikes",id: 9, firstPic: 'https://cdn.pixabay.com/photo/2013/03/19/18/23/utah-95032_960_720.jpg'},
                       {name: "ocean",id: 10, firstPic: 'https://cdn.pixabay.com/photo/2015/11/06/13/53/sea-1027999_960_720.jpg'},
                       {name: "elephant",id: 11, firstPic: 'https://cdn.pixabay.com/photo/2017/04/19/06/49/elephant-2241360_960_720.jpg'},
                       {name: "forest",id: 12, firstPic: 'https://cdn.pixabay.com/photo/2015/07/31/06/50/forest-868715_960_720.jpg'},
                       {name: "snow",id: 13, firstPic: 'https://cdn.pixabay.com/photo/2016/06/10/22/25/ortler-1449018_960_720.jpg'},
                       {name: "lions",id: 14, firstPic: 'https://cdn.pixabay.com/photo/2014/12/22/10/04/lion-577104_960_720.jpg'},
                       {name: "panda",id: 15, firstPic: 'https://cdn.pixabay.com/photo/2015/04/25/16/09/panda-739331_960_720.jpg'},
                       {name: "cars",id: 16, firstPic: 'https://cdn.pixabay.com/photo/2015/02/15/23/22/chevrolet-637778_960_720.jpg'},
                       {name: "birds",id: 17, firstPic: 'https://cdn.pixabay.com/photo/2015/05/07/21/30/bird-757222_960_720.jpg'},
                       {name: "swan",id: 18, firstPic: 'https://cdn.pixabay.com/photo/2017/02/18/13/55/swan-2077219_960_720.jpg'},
                       {name: "new york",id: 19, firstPic: 'https://cdn.pixabay.com/photo/2014/07/01/12/35/taxi-cab-381233_960_720.jpg'},
                       {name: "marrakech",id: 20, firstPic: 'https://cdn.pixabay.com/photo/2016/02/03/16/15/morocco-1177358_960_720.jpg'},
                       {name: "london",id: 21, firstPic: 'https://cdn.pixabay.com/photo/2010/12/13/10/21/architecture-2715_960_720.jpg'},
                       {name: "monkeys",id: 22, firstPic: 'https://cdn.pixabay.com/photo/2012/02/27/17/00/animal-17474_960_720.jpg'},
                       {name: "tigers",id: 23, firstPic: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/tiger-165039_960_720.jpg'},
                       {name: "rabbits",id: 24, firstPic: 'https://cdn.pixabay.com/photo/2017/04/05/23/25/rabbit-2206752_960_720.jpg'}],
              totalPages: 0, //holds the total pages
              albumsPerPage: [], //filled with the elements to display depending on the page number of the pagination
              perPage: 6 //the number of albums you want to display per page
          }; 
        },
        methods: {
          //calculate the number of pages that will be diplayed in the pagination component. and fill the 'albumsPerPage' array with the appropriate elements    
          countPage(){
              let pageNumber = this.albums.length/this.perPage;
              this.totalPages = pageNumber;
              
              if((pageNumber % 1) !== 0){
                  pageNumber = Math.trunc(pageNumber) + 1;
              }
              if(pageNumber === 1){
                 this.albumsPerPage = this.albums;
              }else{
                  this.albumsPerPage = this.albums.slice(0,this.perPage);
              }
              
              this.totalPages = pageNumber;
              
          },
          //'paginationClick' function executes when any page of the pagination gets clicked, and retrieve the right elements from 'albums' array and store them in the 'albumsPerPage' array    
          paginationClick (pageNum) {
              this.albumsPerPage = [];
              let arrayEnd = (pageNum * this.perPage);
              this.albumsPerPage = this.albums.slice((arrayEnd - this.perPage),arrayEnd);            
          }  
        },
        //register 'Album' component locally
        components: {
            appAlbum: Album
        },
        //code to exexute during the created phase of the component lifecycle
        created(){
            function compare(a,b) {
              if (a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
              if (a.name.toLowerCase() > b.name.toLowerCase())
                return 1;
              return 0;
            }
            this.albums.sort(compare); //sort the albums array by name
            this.countPage();//call the 'coutpage' function
        }
    }
</script>

<style scoped>
    .album-name-font {font-family: lobster, monospace; font-size: 30px;}
    img {box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);}
    img:hover{box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19); opacity: 0.9;}
</style>