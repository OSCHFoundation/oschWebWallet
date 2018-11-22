<template>
    <div class="t-main">
        <v-nav></v-nav>
        <div class="main-inner">
            <div class="action-id">
                <div class="source-id">
                    <div class="dis-list">
                         <div class="dis-left">
                        <span>
                    来源账户：
                        </span>
                    </div>
                    <div class="dis-right">
                        <input type="text" placeholder="例如: GCEXAMPLE5HWNK4AYSTEQ4UWDKHTCKADVS2AHF3UI2ZMO3DPUSM6Q4UG" class="inp" v-model="sourceId">
                    </div>
                    <div class="dis-right">
                         <p class="dis-tips">提示：如果您还没有源账户，可以
                        <router-link to="/">创建账户</router-link>
                        </p>
                    </div>
                    </div>
                   <div class="dis-list">
                        <div class="dis-left">
                        <span>
                    基本费用：
                        </span>
                        </div>
                        <div class="dis-right">
                                <input type="text" placeholder="Amount in stroops (1 lumen = 10,000,000 stroops)" class="inp">
                        </div>
                    </div>
                </div>
            </div>
            <div class="action-type">
                <div class="type-inner">
                    <div class="choseType">
                        <div class="dis-list">
                            <div class="dis-left">
                            <span>
                                请选择交易操作:
                            </span>
                            </div>
                            <div class="dis-right">
                                <select class="selec" v-model="transactionType">
                                    <option>付款</option>
                                    <option>转账</option>  
                                    <option>激活子账户</option>  
                                </select>
                            </div>
                        </div>
                        
                    </div>
                    <div class="typeShow" v-show="transactionType == '激活子账户'">
                        <div class="pay">
                            <div class="distination">
                                <div class="dis-list">
                                    <div class="dis-left">
                                        <span>激活目标账户：</span>
                                    </div>
                                    <div class=" dis-right">
                                        <input type="text" placeholder="例如: GCEXAMPLE5HWNK4AYSTEQ4UWDKHTCKADVS2AHF3UI2ZMO3DPUSM6Q4UG" class="inp" v-model="activtionAccount">
                                    </div>
                                </div>
                                <div class="dis-list">
                                    <div class="dis-left">
                                        <span class="pay-clas">激活数量：</span>
                                    </div>
                                    <div class="dis-right">
                                        <input type="text" class="inp" v-model="activtionNum">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="typeShow" v-show="transactionType == '转账'">
                        <div class="pay">
                            <div class="distination">
                                <div class="dis-list">
                                    <div class="dis-left">
                                        <span>目标账户：</span>
                                    </div>
                                    <div class=" dis-right">
                                        <input type="text" placeholder="例如: GCEXAMPLE5HWNK4AYSTEQ4UWDKHTCKADVS2AHF3UI2ZMO3DPUSM6Q4UG" class="inp" v-model="toPublic">
                                    </div>
                                </div>
                                <div class="dis-list">
                                    <div class="dis-left">
                                        <span class="pay-clas">交易类型：</span>
                                    </div>
                                    <div class="dis-right">
                                        <select v-model="selectType">
                                            <option disabled value="">请选择交易类型</option>
                                            <option>Osch</option>
                                            <option>Time</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="dis-list">
                                    <div class="dis-left">
                                        <span class="pay-clas">交易数量：</span>
                                    </div>
                                    <div class="dis-right">
                                        <input type="text" class="inp" v-model="toOschNum">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="button" class="type-btn" value=" 确认无误" @click="sendClick">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VNav from '../vnav'

export default {
    data () {
        return {
            sourceId: "",
            toPublic: "",
            toOschNum: "",
            server: "",
            account: "",
            secret: this.$route.params.id,
            selectType: "",
            transactionType: "",
            activtionAccount: "",
            activtionNum: "",
            stellarServer: "",
        }
    },
    components: {
        VNav,
        // PayType

    },
    methods: {
        
        asset1 () {
            this.show = 0
        },
        asset2 () {
            this.show = 2
        },
        asset3 () {
            this.show = 3
        },
        sendClick () {
            let _this = this;
            //点击发送交易
            if (this.transactionType == '转账') {
                var transaction = new StellarSdk.TransactionBuilder(this.account,{
                    fee: "100000000"    
                })
                .addOperation(StellarSdk.Operation.payment({
                    destination: this.toPublic,
                    asset: StellarSdk.Asset.native(),
                    amount: this.toOschNum 
                }))
                .build();
                transaction.sign(StellarSdk.Keypair.fromSecret(this.secret)); // sign the transaction
                this.server.submitTransaction(transaction).then(function(res){
                    alert("发送成功");
                    location.reload() 
                })
            } else if (this.transactionType == '激活子账户') {
                //激活子账户事件
                console.log(this.sourceId)
                console.log(this.secret)
                console.log(this.account)
                console.log(this.activtionAccount)
                this.stellarServer
                    .loadAccount(this.sourceId)
                    .then(function(account){
                        console.log(account);
                        var transaction = new StellarSdk.TransactionBuilder(account,{
                                fee: 100000000    
                            })
                            .addOperation(StellarSdk.Operation.createAccount({
                                destination: _this.activtionAccount, //需要激活的账户
                                startingBalance: _this.activtionNum  //激活账户最低余额 in XLM
                                }))
                            .build();
                        transaction.sign(StellarSdk.Keypair.fromSecret(_this.secret));
                        _this.stellarServer.submitTransaction(transaction).then(function(res){
                            alert("账户初始化成功");
                        })
                       
                    })
            }
            
        }
         
    },
    created () {
        //下拉框默认选项
        this.selectType = "Osch"
        this.transactionType = "付款"
        console.log(this.transactionType)
       
        
    },
    mounted(){  
        var _this = this;
        //https://horizon-testnet.stellar.org
        StellarSdk.Config.setAllowHttp(true);
        //StellarSdk.Network.useTestNetwork();
        StellarSdk.Network.use(new StellarSdk.Network(_this.horizonSecret));
        _this.stellarServer = new StellarSdk.Server(_this.horizonUrl);
        _this.server = new StellarSdk.Server(_this.horizonUrl);
        console.log(_this.server)
        
        //init secret tool
        var strkey = StellarSdk.StrKey;
        var arrPrivate = strkey.decodeEd25519SecretSeed(_this.secret);
        
        console.log(arrPrivate)
        var keypair = new StellarSdk.Keypair({
            type: "ed25519",
            secretKey: arrPrivate 
        });
        _this.publicKey = strkey.encodeEd25519PublicKey(keypair.rawPublicKey());
        //找到账户信息
        _this.server
            .loadAccount(this.publicKey)
            .then(function(account){
                _this.account = account;
            })
  }
}
</script>

<style scoped>
   .t-main {
        margin: 30px;
        background-color: bisque;
        min-width: 960px;
        min-height: 500px;
    }
    .action-id,.action-type {   
        color: #fff;
        margin: 20px auto 0;
        width: 95%;
        padding: 20px;
        background: #99f
    }
    .source-id {
        width: 100%
    }
    .source-id,.type-inner {
        font-size: 16px;
        border: 2px solid #666;
        padding: 20px
    }
    .inp {
        margin-top: 25px;
        font-size: 12px;
        width: 500px;
        height: 30px;
    }
    .source-inner {
        margin: 10px auto 30px;
    }
    .type-btn {
        display: block;
        margin: 0 auto;
        border-radius: 3px;
        height: 30px;
        width: 150px;
        background-color: skyblue;
        color: #fff;
        
    }
    .action-type {
        margin-top: 20px;
    }
    .choseType {
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #666;
        width: 90%;
        background-color: salmon
    }
    .selec {
        display: inline-block;
        width: 150px;
        height: 20px
    }
    .dis-left {
        display: inline-block;
        width: 300px;

    }
    .dis-right {
        display: inline-block;
        margin-left: 300px;
    }
    .dis-tips {
        margin-left: 307px;
    }
    .dis-list,.source-id {
         padding: 20px 0;
        width: 90%;
        margin: 0 auto;
    }
    .pay {
        margin: 20px auto;
        padding: 20px;
        width: 90%;
        background-color: #679
    }
    .distination {
        padding: 20px 0;
        /* width: 90%; */
        margin: 0 auto;
    }
    .dis-list {
        margin-bottom: 20px;
    }
    .dis-left {
        display: inline-block;
        width: 300px;

    }
    .dis-right {
        display: inline-block;
        margin-left: 300px;
    }
    .asset-code {
        margin-left: 605px;
        margin-top: 20px;
        
    }
    .active {
        background-color: skyblue;
    }
    .inp {
        font-size: 12px;
        width: 500px;
        height: 30px;
    }
    .pay-clas {
        display: inline-block;
        /* margin-top: 30px; */
    }
    .btn {
        border-radius: 3px;
        height: 30px;
        width: 150px;
        color: #fff
    }
 
</style>
