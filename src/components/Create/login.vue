<template>
    <div>
        <v-header></v-header>
        <div class="main">
            <v-nav></v-nav>
            <h1 class="title">输入私钥查看钱包信息</h1>
            <input type="text" value="请输入您的私钥" class="inp" v-model="secret">
            <input type="submit" value="确认" class="sub" @click="login">
        </div>
        <v-footer></v-footer>
    </div>
    
</template>

<script>
import VHeader from '../Header'
import VFooter from '../footer'
import VNav from '../vnav'
export default {
    data () {
        return {
            secret: '',
        }
    },
    methods : {
        login () {
            if (this.secret === '' ) {
                alert('请输入私钥')
            } else if(this.secret.length >= 50){
            this.$router.push('/wallet/' + this.secret)
            // console.log(this.secret.length)
            }
        }
    },
    components: {
        VNav,
        VHeader,
        VFooter
    },
    mounted () {
        var _this = this;
        StellarSdk.Config.setAllowHttp(true);
        StellarSdk.Network.use(new StellarSdk.Network(_this.horizonSecret))
        this.StellarServer = new StellarSdk.Server(_this.horizonUrl)
    }
}
</script>   

<style>
   .main {
        margin: 30px;
        background-color: bisque;
        min-width: 960px;
        min-height: 500px;
        text-align: center;
    
    }
    .title {
        margin-top: 25px;
    }
    .tips {
        margin-top: 50px;
        font-weight: 700;
    }
    .inp {
        margin-top: 25px;
        width: 500px;
        height: 30px;
    }
    .chose {
        margin-top: 120px;
        vertical-align: top;
    }
    .sub {
        display: block;
        margin: 30px auto 0;
        border-radius: 3px;
        /* border: none; */
        background: skyblue;
        width: 150px;
        height: 30px;
    }
 
</style>
