import AlbumGrid from './components/Album/AlbumGrid.vue'
import PhotoGrid from './components/Photo/PhotoGrid.vue'
import SuccessMessage from './components/Photo/Messages/confirmation/SuccessMessage.vue'

//configure the routes and their components to load when each route is called 
export const routes = [
    {path: '', component: AlbumGrid, name: 'albumGridRoute'},
    {path: '/:albumID', component: PhotoGrid, name: 'photoGridRoute'}, //':albumID' is to pass the album id dynamically
    {path: '/:albumID/success', component: SuccessMessage, name: 'successMsgRoute'}
];