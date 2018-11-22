<template>
    <div>
        <v-header></v-header>
        <s-main></s-main>
        <v-footer></v-footer>
    </div>
</template>

<script>
import VHeader from '../Header'
import SMain from './s-main'
import VFooter from '../footer'
export default {
    data () {
        return {

        }
    },
    components: {
        VHeader,
        SMain,
        VFooter,
    }
}
</script>

<style>
    
 
</style>
