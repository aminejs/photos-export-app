<template>
    <div class="progress">
      <div class="progress-bar" role="progressbar" aria-valuenow="0"aria-valuemin="0" aria-valuemax="100"
           :style="{width: (countSelectedPhotos / countTotalPhotos) * 100 + '%'}">
          {{ countSelectedPhotos }} / {{ countTotalPhotos }}  
      </div>
    </div>
</template>

<script>
    //'countTotalPhotos' and 'countSelectedPhotos' are the properties passed from the parent which is 'PhotoGrid' to the child which is 'ProgressBar'
    export default {
        props: ['countTotalPhotos', 'countSelectedPhotos']
    }
</script>