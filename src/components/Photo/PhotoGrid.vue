<template>
  <div>
      <div class="row">
        <div class="col-md-8"><h1>{{ currentAlbum }} Album </h1></div>
        <div class="col-md-4 text-center some-top-magin">
            <button class="btn btn-success" @click="confirmPhoto" :disabled="confirmButton">Confirm</button>
           <app-photo-selected v-if="isSelected"></app-photo-selected>
           <app-photo-uploaded v-if="isUploaded"></app-photo-uploaded>
        </div>
      </div>
      <hr>
      <form>
          <app-photo v-for="(photo, index) in photosPerPage" :key="index"> 
              <div class="container">
                <img :src="photo" :alt="photo" class="img-rounded img-thumbnail">               
                <input type="checkbox" class="large-checkbox" :value="photo" v-model="selectedPhotos"> 
              </div>            
          </app-photo>
      </form>
               
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
    import Photo from './Photo.vue'
    import PhotoSelected from './Messages/PhotoSelected.vue'
    import PhotoUploaded from './Messages/PhotoUploaded.vue'
    
    export default {
        data: function(){
          return{
              userId: '123456', //user id i suppose to get from facebook graph api. i created if myself
              currentAlbum: '', //holds the name of the current album
              //'albumId' property holds the album id passed in the currently active route
              albumId: this.$route.params.albumID,
              //'albums' is the array i suppose to get from facebook. i created it myself
              albums: [{name: "dogs",id: 1,pictures: ['https://cdn.pixabay.com/photo/2016/07/07/15/35/puppy-                    1502565_960_720.jpg','https://cdn.pixabay.com/photo/2016/02/20/17/05/dog-1212400_960_720.jpg','https://cdn.pixabay.com/photo/2016/05/02/14/13/dog-1367297_960_720.jpg','https://cdn.pixabay.com/photo/2013/11/23/02/17/dog-216282_960_720.jpg','https://cdn.pixabay.com/photo/2016/02/26/16/32/dog-1224267_960_720.jpg','https://cdn.pixabay.com/photo/2015/04/10/00/47/dog-715545_960_720.jpg','https://cdn.pixabay.com/photo/2015/02/05/12/35/dog-624951_960_720.jpg','https://cdn.pixabay.com/photo/2015/11/03/12/58/dog-1020790_960_720.jpg','https://cdn.pixabay.com/photo/2014/03/05/19/23/dog-280332_960_720.jpg','https://cdn.pixabay.com/photo/2014/02/25/11/25/papillon-274183_960_720.jpg','https://cdn.pixabay.com/photo/2016/11/26/23/45/dog-1861839_960_720.jpg','https://cdn.pixabay.com/photo/2016/05/09/10/42/weimaraner-1381186_960_720.jpg','https://cdn.pixabay.com/photo/2014/08/21/14/51/pet-423398_960_720.jpg','https://cdn.pixabay.com/photo/2013/09/18/01/24/dog-183288_960_720.jpg','https://cdn.pixabay.com/photo/2013/08/16/07/24/pet-173005_960_720.jpg','https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg','https://cdn.pixabay.com/photo/2014/05/19/22/20/retriever-348572_960_720.jpg','https://cdn.pixabay.com/photo/2010/12/13/10/20/beagle-puppy-2681_960_720.jpg','https://cdn.pixabay.com/photo/2016/11/01/10/29/animal-1787835_960_720.jpg','https://cdn.pixabay.com/photo/2015/08/31/21/27/dog-916099_960_720.jpg','https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559_960_720.jpg','https://cdn.pixabay.com/photo/2015/02/05/12/35/dog-624952_960_720.jpg','https://cdn.pixabay.com/photo/2016/01/11/22/35/dog-1134492_960_720.jpg']},
                       {name: "cats",id: 2, pictures: ['https://cdn.pixabay.com/photo/2015/03/23/22/56/cat-686803_960_720.jpg','https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg','https://cdn.pixabay.com/photo/2015/02/25/17/56/cat-649164_960_720.jpg','https://cdn.pixabay.com/photo/2015/02/14/10/16/cat-636172_960_720.jpg','https://cdn.pixabay.com/photo/2015/04/17/09/36/domestic-cat-726989_960_720.jpg','https://cdn.pixabay.com/photo/2015/03/29/11/05/cat-697113_960_720.jpg','https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_960_720.jpg','https://cdn.pixabay.com/photo/2016/07/10/21/47/cat-1508613_960_720.jpg','https://cdn.pixabay.com/photo/2013/09/29/12/38/cat-188088_960_720.jpg','https://cdn.pixabay.com/photo/2014/09/18/20/17/cat-451377_960_720.jpg','https://cdn.pixabay.com/photo/2016/08/31/18/55/cat-1634369_960_720.jpg','https://cdn.pixabay.com/photo/2012/11/26/13/58/cat-67345_960_720.jpg','https://cdn.pixabay.com/photo/2013/01/25/13/03/cat-76116_960_720.jpg','https://cdn.pixabay.com/photo/2015/04/16/15/21/cat-725793_960_720.jpg','https://cdn.pixabay.com/photo/2016/06/14/00/14/cat-1455468_960_720.jpg','https://cdn.pixabay.com/photo/2013/09/12/08/06/cat-181608_960_720.jpg','https://cdn.pixabay.com/photo/2014/05/23/12/06/cat-351926_960_720.jpg','https://cdn.pixabay.com/photo/2014/07/24/18/40/cat-401124_960_720.jpg','https://cdn.pixabay.com/photo/2015/11/15/20/21/cat-1044750_960_720.jpg','https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_960_720.png','https://cdn.pixabay.com/photo/2013/05/17/15/54/cat-111793_960_720.jpg']},
                       {name: "black & white",id: 3, pictures: ['https://cdn.pixabay.com/photo/2016/11/12/07/46/glass-1818417_960_720.jpg','https://cdn.pixabay.com/photo/2015/04/27/04/42/people-741431_960_720.jpg','https://cdn.pixabay.com/photo/2016/06/02/20/24/dandelion-1432019_960_720.jpg','https://cdn.pixabay.com/photo/2013/12/27/21/43/rose-234483_960_720.jpg','https://cdn.pixabay.com/photo/2013/06/20/17/09/chess-140340_960_720.jpg','https://cdn.pixabay.com/photo/2014/10/06/06/55/tattoo-476096_960_720.jpg','https://cdn.pixabay.com/photo/2017/03/15/15/26/person-2146508_960_720.jpg','https://cdn.pixabay.com/photo/2015/10/31/10/53/water-lily-1015215_960_720.jpg','https://cdn.pixabay.com/photo/2015/02/04/20/35/girl-624223_960_720.jpg','https://cdn.pixabay.com/photo/2017/04/05/17/45/girl-2205813_960_720.jpg','https://cdn.pixabay.com/photo/2015/10/22/17/28/tea-party-1001654_960_720.jpg']},
                       {name: "coffee",id: 4, pictures: ['https://cdn.pixabay.com/photo/2016/03/05/22/16/aroma-1239226_960_720.jpg','https://cdn.pixabay.com/photo/2013/11/05/23/55/coffee-206142_960_720.jpg','https://cdn.pixabay.com/photo/2016/08/07/16/23/coffee-1576537_960_720.jpg','https://cdn.pixabay.com/photo/2014/12/11/02/56/coffee-563797_960_720.jpg','https://cdn.pixabay.com/photo/2014/07/22/15/08/a-cup-of-coffee-399478_960_720.jpg','https://cdn.pixabay.com/photo/2014/10/04/17/32/coffee-473765_960_720.jpg','https://cdn.pixabay.com/photo/2013/08/11/19/46/coffee-171653_960_720.jpg','https://cdn.pixabay.com/photo/2014/07/22/15/05/coffee-beans-399466_960_720.jpg','https://cdn.pixabay.com/photo/2014/08/22/21/25/coffee-424758_960_720.jpg','https://cdn.pixabay.com/photo/2016/12/02/22/16/winter-1878713_960_720.jpg','https://cdn.pixabay.com/photo/2015/03/05/13/53/coffee-660394_960_720.jpg','https://cdn.pixabay.com/photo/2014/07/08/12/58/coffee-386878_960_720.jpg']},
                       {name: "horses",id: 5, pictures: ['https://cdn.pixabay.com/photo/2013/10/17/20/59/horse-197199_960_720.jpg']},
                       {name: "backgounds",id: 6, pictures: ['https://cdn.pixabay.com/photo/2015/12/17/08/14/greeting-card-1096981_960_720.jpg','https://cdn.pixabay.com/photo/2016/12/17/17/44/presents-1913987_960_720.jpg','https://cdn.pixabay.com/photo/2014/03/22/22/05/sunbeam-292987_960_720.jpg','https://cdn.pixabay.com/photo/2012/12/27/19/40/sunset-72864_960_720.jpg','https://cdn.pixabay.com/photo/2016/12/09/08/09/texture-1893788_960_720.jpg','https://cdn.pixabay.com/photo/2012/03/04/01/04/drops-22223_960_720.jpg','https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_960_720.jpg','https://cdn.pixabay.com/photo/2016/12/15/20/21/background-1909992_960_720.jpg','https://cdn.pixabay.com/photo/2014/09/24/16/28/bricks-459299_960_720.jpg']},
                       {name: "nature",id: 7, pictures: ['https://cdn.pixabay.com/photo/2015/10/22/17/45/leaf-1001679_960_720.jpg']},
                       {name: "music",id: 8, pictures: ['https://cdn.pixabay.com/photo/2017/04/11/17/49/guitar-2222350_960_720.jpg','https://cdn.pixabay.com/photo/2017/04/20/08/38/flute-2245041_960_720.jpg','https://cdn.pixabay.com/photo/2014/07/31/23/49/guitarist-407212_960_720.jpg','https://cdn.pixabay.com/photo/2016/01/14/06/09/guitar-1139397_960_720.jpg','https://cdn.pixabay.com/photo/2015/02/19/19/18/drummers-642540_960_720.jpg','https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg','https://cdn.pixabay.com/photo/2015/07/31/15/01/guitar-869217_960_720.jpg','https://cdn.pixabay.com/photo/2015/12/27/05/48/turntable-1109588_960_720.jpg','https://cdn.pixabay.com/photo/2017/02/21/05/16/artist-2084696_960_720.jpg','https://cdn.pixabay.com/photo/2014/07/05/08/15/harp-384557_960_720.jpg','https://cdn.pixabay.com/photo/2016/09/16/15/56/manhattan-1674404_960_720.jpg','https://cdn.pixabay.com/photo/2015/02/06/22/08/microphone-626618_960_720.jpg','https://cdn.pixabay.com/photo/2014/09/14/20/24/guitar-445387_960_720.jpg','https://cdn.pixabay.com/photo/2015/08/29/14/18/bass-913092_960_720.jpg','https://cdn.pixabay.com/photo/2015/06/16/16/48/guitar-811343_960_720.jpg','https://cdn.pixabay.com/photo/2015/03/26/10/22/band-691224_960_720.jpg','https://cdn.pixabay.com/photo/2014/05/21/15/18/musician-349790_960_720.jpg','https://cdn.pixabay.com/photo/2016/02/05/11/18/guitar-1180744_960_720.jpg','https://cdn.pixabay.com/photo/2014/12/30/06/04/mouse-583579_960_720.png','https://cdn.pixabay.com/photo/2016/12/01/07/30/music-1874621_960_720.jpg']},
                       {name: "bikes",id: 9, pictures: ['https://cdn.pixabay.com/photo/2013/03/19/18/23/utah-95032_960_720.jpg','https://cdn.pixabay.com/photo/2013/10/03/23/19/bike-190483_960_720.jpg','https://cdn.pixabay.com/photo/2015/01/09/11/26/road-bike-594164_960_720.jpg','https://cdn.pixabay.com/photo/2014/04/23/20/34/dirt-bike-330815_960_720.jpg','https://cdn.pixabay.com/photo/2013/11/12/16/36/dirt-bike-209489_960_720.jpg','https://cdn.pixabay.com/photo/2016/02/17/16/04/bikes-1205279_960_720.jpg']},
                       {name: "ocean",id: 10, pictures: ['https://cdn.pixabay.com/photo/2015/11/06/13/53/sea-1027999_960_720.jpg']},
                       {name: "elephant",id: 11, pictures: ['https://cdn.pixabay.com/photo/2017/04/19/06/49/elephant-2241360_960_720.jpg']},
                       {name: "forest",id: 12, pictures: ['https://cdn.pixabay.com/photo/2015/07/31/06/50/forest-868715_960_720.jpg','https://cdn.pixabay.com/photo/2016/02/24/18/37/fog-1220491_960_720.jpg','https://cdn.pixabay.com/photo/2014/10/10/10/49/forest-483207_960_720.jpg','https://cdn.pixabay.com/photo/2014/11/28/00/07/mushrooms-548360_960_720.jpg','https://cdn.pixabay.com/photo/2016/02/27/18/05/forest-1225983_960_720.jpg','https://cdn.pixabay.com/photo/2015/03/03/21/10/forest-657902_960_720.jpg','https://cdn.pixabay.com/photo/2016/11/01/22/34/rise-1789903_960_720.jpg','https://cdn.pixabay.com/photo/2015/03/03/21/10/forest-657903_960_720.jpg','https://cdn.pixabay.com/photo/2015/02/20/16/59/hirsch-643340_960_720.jpg','https://cdn.pixabay.com/photo/2014/09/20/19/05/mushrooms-454172_960_720.jpg','https://cdn.pixabay.com/photo/2014/02/23/02/56/forest-272595_960_720.jpg','https://cdn.pixabay.com/photo/2014/12/03/13/54/hirsch-555463_960_720.jpg','https://cdn.pixabay.com/photo/2012/11/25/20/05/forest-67286_960_720.jpg','https://cdn.pixabay.com/photo/2015/03/03/21/24/wild-boars-657916_960_720.jpg','https://cdn.pixabay.com/photo/2016/12/17/13/42/fall-foliage-1913485_960_720.jpg','https://cdn.pixabay.com/photo/2016/10/31/19/49/sunset-1786582_960_720.jpg','https://cdn.pixabay.com/photo/2014/08/06/15/34/landscape-411712_960_720.jpg','https://cdn.pixabay.com/photo/2015/11/12/18/02/away-1040726_960_720.jpg']},
                       {name: "snow",id: 13, pictures: ['https://cdn.pixabay.com/photo/2016/06/10/22/25/ortler-1449018_960_720.jpg']},
                       {name: "lions",id: 14, pictures: ['https://cdn.pixabay.com/photo/2014/12/22/10/04/lion-577104_960_720.jpg']},
                       {name: "panda",id: 15, pictures: ['https://cdn.pixabay.com/photo/2015/04/25/16/09/panda-739331_960_720.jpg']},
                       {name: "cars",id: 16, pictures: ['https://cdn.pixabay.com/photo/2015/02/15/23/22/chevrolet-637778_960_720.jpg']},
                       {name: "birds",id: 17, pictures: ['https://cdn.pixabay.com/photo/2015/05/07/21/30/bird-757222_960_720.jpg','https://cdn.pixabay.com/photo/2014/11/30/20/28/merle-552070_960_720.jpg','https://cdn.pixabay.com/photo/2015/06/22/23/04/bullfinch-818188_960_720.jpg','https://cdn.pixabay.com/photo/2014/03/04/19/12/seagull-279645_960_720.jpg','https://cdn.pixabay.com/photo/2011/09/27/18/52/sparrow-9950_960_720.jpg','https://cdn.pixabay.com/photo/2015/06/22/22/41/robin-818126_960_720.jpg','https://cdn.pixabay.com/photo/2013/01/02/07/48/sparrow-73307_960_720.jpg','https://cdn.pixabay.com/photo/2015/06/22/23/02/greenfinch-818185_960_720.jpg','https://cdn.pixabay.com/photo/2013/09/14/08/28/common-redstart-182136_960_720.jpg','https://cdn.pixabay.com/photo/2013/07/15/19/39/bird-162843_960_720.jpg','https://cdn.pixabay.com/photo/2014/05/31/09/18/hornbill-358785_960_720.jpg']},
                       {name: "swan",id: 18, pictures: ['https://cdn.pixabay.com/photo/2017/02/18/13/55/swan-2077219_960_720.jpg']},
                       {name: "new york",id: 19, pictures: ['https://cdn.pixabay.com/photo/2014/07/01/12/35/taxi-cab-381233_960_720.jpg']},
                       {name: "marrakech",id: 20, pictures: ['https://cdn.pixabay.com/photo/2016/02/03/16/15/morocco-1177358_960_720.jpg']},
                       {name: "london",id: 21, pictures: ['https://cdn.pixabay.com/photo/2010/12/13/10/21/architecture-2715_960_720.jpg']},
                       {name: "monkeys",id: 22, pictures: ['https://cdn.pixabay.com/photo/2012/02/27/17/00/animal-17474_960_720.jpg']},
                       {name: "tigers",id: 23, pictures: ['https://cdn.pixabay.com/photo/2013/07/18/20/26/tiger-165039_960_720.jpg']},
                       {name: "rabbits",id: 24, pictures: ['https://cdn.pixabay.com/photo/2017/04/05/23/25/rabbit-2206752_960_720.jpg']}],
              confirmButton: false, //used to disable or enable the confirm button
              isSelected: false, //used to attach or detach 'PhotoSelected' component to the DOM
              isUploaded: false, //used to attach or detach 'PhotoUploaded' component to the DOM
              albumsPhoto: [], //holds the photos of the current album        
              totalPages: 0, //holds the total pages
              photosPerPage: [], //filled with the elements to display depending on the page number of the pagination
              selectedPhotos: [], //holds the selected photos to send to firebase
              perPage: 9 //the number of photos you want to display per page
          }; 
        },
        methods: {
          //calculate the number of pages that will be diplayed in the pagination component. and fill the 'photosPerPage' array with the appropriate elements  
          countPage(){
              let pageNumber = this.albumsPhoto.length/this.perPage;
              this.totalPages = pageNumber;
              
              if((pageNumber % 1) !== 0){
                  pageNumber = Math.trunc(pageNumber) + 1;
              }
              if(pageNumber === 1){
                 this.photosPerPage = this.albumsPhoto;
              }else{
                  this.photosPerPage = this.albumsPhoto.slice(0,this.perPage);
              }
              
              this.totalPages = pageNumber;
              
          },
          //'paginationClick' function executes when any page of the pagination gets clicked, and retrieve the right elements from 'albumsPhoto' array and store them in the 'photosPerPage' array     
          paginationClick(pageNum) {
              this.albumsPerPage = [];
              let arrayEnd = (pageNum * this.perPage);
              this.photosPerPage = this.albumsPhoto.slice((arrayEnd - this.perPage),arrayEnd);            
          },
          //executes when the confirm button is clicked. handles errors and sends selected photos to firebase database    
          confirmPhoto(){
             if(this.selectedPhotos.length === 0){
                 this.isSelected = true;
             }else{
                 this.confirmButton = true;
                 this.isSelected = false;
                 this.isUploaded = false;
                 let dataToSend = {
                                    userID: this.userId,
                                    photo: this.selectedPhotos
                                  };
                 
                 this.$http.post('', dataToSend)
                           .then(response => {
                                if(response.status === 200){
                                    this.confirmButton = false;
                                    this.$router.push(`/${this.albumId}/success`);
                                }else{
                                    this.isUploaded = true;
                                }
                            }, error => {
                                this.isUploaded = true;
                                this.confirmButton = false;
                            });
             }
             
         }    
        },
        //register 'Photo','PhotoSelected' and 'PhotoUploaded' components locally
        components: {
            appPhoto: Photo,
            appPhotoSelected: PhotoSelected,
            appPhotoUploaded: PhotoUploaded
        },
        //code to exexute during the created phase of the component lifecycle
        created(){
            for (let i = 0; i < this.albums.length; i++) {
              if (this.albumId == this.albums[i].id) {
                this.currentAlbum = this.albums[i].name; //retrieve the name of the album and store it in the 'currentAlbum' property
                this.albumsPhoto = this.albums[i].pictures; //fill the 'albumsPhoto' array with the photos of the current album
              }
            }
            this.countPage(); //call the 'countPage' function
        }
    }
</script>

<style scoped>
    .some-top-magin { margin-top:20px; }
    .large-checkbox {width: 20px; height: 20px;}
</style>