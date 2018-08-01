<template>
  <div class="home">
    <Navbar/>
    <Carousel></Carousel>
    <Featured/>
    <CardBody></CardBody>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Featured from '@/components/Featured.vue'
import Carousel from '@/components/Carousel.vue'
import CardBody from '@/components/CardBody.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    CardBody,
    Featured,
    Carousel
    
  }
}
</script>
