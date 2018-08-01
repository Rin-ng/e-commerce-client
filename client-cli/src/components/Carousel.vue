<template>
   <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
         <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
         <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
         <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
         <div class="carousel-item active">
            <img class="d-block w-100" src='@/assets/imgs/beverage-book-breakfast-696179.jpg' alt="First slide">
         </div>
         <div class="carousel-item">
            <img class="d-block w-100" src="@/assets/imgs/beverage-black-coffee-breakfast-1008239.jpg" alt="Second slide">
         </div>
         <div class="carousel-item">
            <img class="d-block w-100" src='@/assets/imgs/aroma-blur-breakfast-549222.jpg' alt="Third slide">
         </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
         <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
         <span class="carousel-control-next-icon" aria-hidden="true"></span>
         <span class="sr-only">Next</span>
      </a>
   </div>
</template>

<style scope>

.carousel-control-next-icon, .carousel-control-prev-icon{
   height: 30px;
   width: 30px;
}

.carousel-indicators li{
   background-color: darkgrey;
}

.caraouselHeight{
   max-height: 450px;
}
</style>