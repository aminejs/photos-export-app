import AlbumGrid from './components/Album/AlbumGrid.vue'
import PhotoGrid from './components/Photo/PhotoGrid.vue'
import SuccessMessage from './components/Photo/Messages/confirmation/SuccessMessage.vue'

export const routes = [
    {path:'', component: AlbumGrid, name: 'albumGridRoute'},
    {path:'/:albumID', component: PhotoGrid, name: 'photoGridRoute'},
    {path:'/:albumID/success', component: SuccessMessage, name: 'successMsgRoute'} 
];