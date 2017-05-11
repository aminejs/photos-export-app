<template>
    <div>
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand"><strong>Photos Export App</strong></a>
            </div>
            <ul class="nav navbar-nav">
              <!--use 'router-link' instead of anchor tag to avoid the default behavior, because anchor tag will always send the request to the server and reload the page. but 'router-link' just load the the component of the currently active route without leaving the app -->
              <li><router-link to="/">Albums</router-link></li>
            </ul>
          </div>
        </nav>
    </div>
</template>
