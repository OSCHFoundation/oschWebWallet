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
    },
    mounted(){
        // this.$axios.get('https://api.btctrade.com/api/ticker?coin=etc').then((res)=> {
        //     console.log(res)
        // })
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
