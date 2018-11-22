<template>
    <div class="main">
        <v-nav></v-nav>
    </div>
</template>

<script>
import VNav from '../vnav'
export default {
    data () {
        return {

        }
    },
    components: {
        VNav
    }
}
</script>

<style>
   .main {
        margin: 30px;
        background-color: bisque;
        min-width: 960px;
        min-height: 500px;
    }
 
</style>
