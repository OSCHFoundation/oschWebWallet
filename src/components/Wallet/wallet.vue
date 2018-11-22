<template>
    <div>
        <v-header></v-header>
        <w-main></w-main>
        <v-footer></v-footer>
    </div>
</template>

<script>
import VHeader from '../Header'
import WMain from './w-main'
import VFooter from '../footer'
export default {
    data () {
        return {

        }
    },
    components: {
        VHeader,
        WMain,
        VFooter,
    }
}
</script>

<style>
    
 
</style>
