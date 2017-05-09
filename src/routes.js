import AlbumGrid from './components/Album/AlbumGrid.vue'
import PhotoGrid from './components/Photo/PhotoGrid.vue'

export const routes = [
    {path:'', component: AlbumGrid, name: 'albumGridRoute'},
    {path:'/:albumID', component: PhotoGrid, name: 'photoGridRoute'}
];