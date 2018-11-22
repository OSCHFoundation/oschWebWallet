<template>
    <div>
        <v-header></v-header>
        <t-main></t-main>
        <v-footer></v-footer>
    </div>
</template>

<script>
import VHeader from '../Header'
import TMain from './t-main'
import VFooter from '../footer'
export default {
    data () {
        return {

        }
    },
    components: {
        VHeader,
        TMain,
        VFooter
    }
}
</script>

<style>
    
 
</style>
