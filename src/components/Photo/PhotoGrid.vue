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
              userId: '123456',
              currentAlbum: '',
              albumId: this.$route.params.albumID,
              albums: [{name: "dogs",id: 1,pictures: ['https://cdn.pixabay.com/photo/2016/07/07/15/35/puppy-1502565_960_720.jpg']},
                       {name: "cats",id: 2, pictures: ['https://cdn.pixabay.com/photo/2015/03/23/22/56/cat-686803_960_720.jpg']},
                       {name: "black & white",id: 3, pictures: ['https://cdn.pixabay.com/photo/2016/11/12/07/46/glass-1818417_960_720.jpg']},
                       {name: "coffee",id: 4, pictures: ['https://cdn.pixabay.com/photo/2016/03/05/22/16/aroma-1239226_960_720.jpg']},
                       {name: "horses",id: 5, pictures: ['https://cdn.pixabay.com/photo/2013/10/17/20/59/horse-197199_960_720.jpg']},
                       {name: "backgounds",id: 6, pictures: ['https://cdn.pixabay.com/photo/2015/12/17/08/14/greeting-card-1096981_960_720.jpg']},
                       {name: "nature",id: 7, pictures: ['https://cdn.pixabay.com/photo/2015/10/22/17/45/leaf-1001679_960_720.jpg']},
                       {name: "music",id: 8, pictures: ['https://cdn.pixabay.com/photo/2017/04/11/17/49/guitar-2222350_960_720.jpg','https://cdn.pixabay.com/photo/2017/04/20/08/38/flute-2245041_960_720.jpg','https://cdn.pixabay.com/photo/2014/07/31/23/49/guitarist-407212_960_720.jpg','https://cdn.pixabay.com/photo/2016/01/14/06/09/guitar-1139397_960_720.jpg','https://cdn.pixabay.com/photo/2015/02/19/19/18/drummers-642540_960_720.jpg','https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg','https://cdn.pixabay.com/photo/2015/07/31/15/01/guitar-869217_960_720.jpg','https://cdn.pixabay.com/photo/2015/12/27/05/48/turntable-1109588_960_720.jpg','https://cdn.pixabay.com/photo/2017/02/21/05/16/artist-2084696_960_720.jpg','https://cdn.pixabay.com/photo/2014/07/05/08/15/harp-384557_960_720.jpg','https://cdn.pixabay.com/photo/2016/09/16/15/56/manhattan-1674404_960_720.jpg','https://cdn.pixabay.com/photo/2015/02/06/22/08/microphone-626618_960_720.jpg','https://cdn.pixabay.com/photo/2014/09/14/20/24/guitar-445387_960_720.jpg','https://cdn.pixabay.com/photo/2015/08/29/14/18/bass-913092_960_720.jpg','https://cdn.pixabay.com/photo/2015/06/16/16/48/guitar-811343_960_720.jpg','https://cdn.pixabay.com/photo/2015/03/26/10/22/band-691224_960_720.jpg','https://cdn.pixabay.com/photo/2014/05/21/15/18/musician-349790_960_720.jpg','https://cdn.pixabay.com/photo/2016/02/05/11/18/guitar-1180744_960_720.jpg','https://cdn.pixabay.com/photo/2014/12/30/06/04/mouse-583579_960_720.png','https://cdn.pixabay.com/photo/2016/12/01/07/30/music-1874621_960_720.jpg']},
                       {name: "bikes",id: 9, pictures: ['https://cdn.pixabay.com/photo/2013/03/19/18/23/utah-95032_960_720.jpg']},
                       {name: "ocean",id: 10, pictures: ['https://cdn.pixabay.com/photo/2015/11/06/13/53/sea-1027999_960_720.jpg']},
                       {name: "elephant",id: 11, pictures: ['https://cdn.pixabay.com/photo/2017/04/19/06/49/elephant-2241360_960_720.jpg']},
                       {name: "forest",id: 12, pictures: ['https://cdn.pixabay.com/photo/2015/07/31/06/50/forest-868715_960_720.jpg','https://cdn.pixabay.com/photo/2016/02/24/18/37/fog-1220491_960_720.jpg','https://cdn.pixabay.com/photo/2014/10/10/10/49/forest-483207_960_720.jpg','https://cdn.pixabay.com/photo/2014/11/28/00/07/mushrooms-548360_960_720.jpg','https://cdn.pixabay.com/photo/2016/02/27/18/05/forest-1225983_960_720.jpg','https://cdn.pixabay.com/photo/2015/03/03/21/10/forest-657902_960_720.jpg','https://cdn.pixabay.com/photo/2016/11/01/22/34/rise-1789903_960_720.jpg','https://cdn.pixabay.com/photo/2015/03/03/21/10/forest-657903_960_720.jpg','https://cdn.pixabay.com/photo/2015/02/20/16/59/hirsch-643340_960_720.jpg','https://cdn.pixabay.com/photo/2014/09/20/19/05/mushrooms-454172_960_720.jpg','https://cdn.pixabay.com/photo/2014/02/23/02/56/forest-272595_960_720.jpg','https://cdn.pixabay.com/photo/2014/12/03/13/54/hirsch-555463_960_720.jpg','https://cdn.pixabay.com/photo/2012/11/25/20/05/forest-67286_960_720.jpg','https://cdn.pixabay.com/photo/2015/03/03/21/24/wild-boars-657916_960_720.jpg','https://cdn.pixabay.com/photo/2016/12/17/13/42/fall-foliage-1913485_960_720.jpg','https://cdn.pixabay.com/photo/2016/10/31/19/49/sunset-1786582_960_720.jpg','https://cdn.pixabay.com/photo/2014/08/06/15/34/landscape-411712_960_720.jpg','https://cdn.pixabay.com/photo/2015/11/12/18/02/away-1040726_960_720.jpg']},
                       {name: "snow",id: 13, pictures: ['https://cdn.pixabay.com/photo/2016/06/10/22/25/ortler-1449018_960_720.jpg']},
                       {name: "lions",id: 14, pictures: ['https://cdn.pixabay.com/photo/2014/12/22/10/04/lion-577104_960_720.jpg']},
                       {name: "panda",id: 15, pictures: ['https://cdn.pixabay.com/photo/2015/04/25/16/09/panda-739331_960_720.jpg']},
                       {name: "cars",id: 16, pictures: ['https://cdn.pixabay.com/photo/2015/02/15/23/22/chevrolet-637778_960_720.jpg']},
                       {name: "birds",id: 17, pictures: ['https://cdn.pixabay.com/photo/2015/05/07/21/30/bird-757222_960_720.jpg']},
                       {name: "swan",id: 18, pictures: ['https://cdn.pixabay.com/photo/2017/02/18/13/55/swan-2077219_960_720.jpg']},
                       {name: "new york",id: 19, pictures: ['https://cdn.pixabay.com/photo/2014/07/01/12/35/taxi-cab-381233_960_720.jpg']},
                       {name: "marrakech",id: 20, pictures: ['https://cdn.pixabay.com/photo/2016/02/03/16/15/morocco-1177358_960_720.jpg']},
                       {name: "london",id: 21, pictures: ['https://cdn.pixabay.com/photo/2010/12/13/10/21/architecture-2715_960_720.jpg']},
                       {name: "monkeys",id: 22, pictures: ['https://cdn.pixabay.com/photo/2012/02/27/17/00/animal-17474_960_720.jpg']},
                       {name: "tigers",id: 23, pictures: ['https://cdn.pixabay.com/photo/2013/07/18/20/26/tiger-165039_960_720.jpg']},
                       {name: "rabbits",id: 24, pictures: ['https://cdn.pixabay.com/photo/2017/04/05/23/25/rabbit-2206752_960_720.jpg']}],
              confirmButton: false,
              isSelected: false,
              isUploaded: false,
              albumsPhoto: [],         
              totalPages: 0,
              photosPerPage: [],
              selectedPhotos: [],
              perPage: 9
          }; 
        },
        methods: {
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
          paginationClick(pageNum) {
              this.albumsPerPage = [];
              let arrayEnd = (pageNum * this.perPage);
              this.photosPerPage = this.albumsPhoto.slice((arrayEnd - this.perPage),arrayEnd);            
          },
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
        components: {
            appPhoto: Photo,
            appPhotoSelected: PhotoSelected,
            appPhotoUploaded: PhotoUploaded
        },
        created(){
            for (let i = 0; i < this.albums.length; i++) {
              if (this.albumId == this.albums[i].id) {
                this.currentAlbum = this.albums[i].name;
                this.albumsPhoto = this.albums[i].pictures;
              }
            }
            this.countPage();
        }
    }
</script>

<style scoped>
    .some-top-magin { margin-top:20px; }
    .large-checkbox {width: 20px; height: 20px;}
</style>