<template>
    <div class="t-main">
        <!-- 确认交易遮罩层 -->
        <div class="confrimTransaction" v-show="close">
            <div class="transactionMask">
                <h2 class="maskTitle  "> 你即将发送...</h2>
                <div class="maskHeader mBorder ">
                    <div class="maskAccount">当前账户: {{sourceId}}</div>
                    <div class="maskAccount">目标账户: {{toPublic}}</div>
                    <div class="masknum">交易额: {{toOschNum}} Osch</div>
                </div>
                <div class="maskInner mBorder ">
                    <p class="maskInnerList">
                        <span class="maskListLeft"> 当前账户:</span>
                        <span class="maskListRight">{{sourceId}}</span>
                    </p>
                    <p class="maskInnerList">
                        <span class="maskListLeft"> 目标账户:</span>
                        <span class="maskListRight">{{toPublic}}</span>
                    </p>
                    <p class="maskInnerList">
                        <span class="maskListLeft"> 账户余额:</span>
                        <span class="maskListRight">{{oschNum}} Osch</span>
                    </p>
                    <p class="maskInnerList">
                        <span class="maskListLeft"> 交易额:</span>
                        <span class="maskListRight">{{toOschNum}}&nbsp Osch</span>
                    </p>
                    <p class="maskInnerList">
                        <span class="maskListLeft"> 币种:</span>
                        <span class="maskListRight">Osch</span>
                    </p>
                </div>
                <div class="maskFooter mBorder">
                    <h1 class="mskFooterTitle">你已经确定发送&nbsp{{toOschNum}}&nbspOsh 到： </h1>
                    <h2>{{toPublic}}</h2>
                </div>
                <button class="maskBtn cancel" @click="closeMask" >取消交易(关闭遮罩层)</button>
                <button class="maskBtn send" @click="sendClick">确认无误,发送交易(关闭遮罩层)</button>
            </div>
        </div>
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
                   <div class="dis-list">
                        <div class="dis-left">
                        <span>
                    备忘录
                        </span>
                        </div>
                        <div class="dis-right">
                                <input type="text" placeholder=默认为text class="inp">
                        </div>
                    </div>
                </div>
            </div>
            <div class="action-type">
                <div class="type-inner"> 
                    <!-- 转账类型 -->
                    <!-- <div class="choseType"  v-show="false">
                        <div class="dis-list" >
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
                        
                    </div> -->
                    <!-- 激活子账户 -->
                    <!-- <div class="typeShow" v-show="transactionType == '激活子账户'">
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
                    </div> -->

                    <!-- <div class="typeShow" v-show="transactionType == '转账'"> -->
                    <div class="typeShow" v-show="true">
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
                    <input type="button" class="type-btn" value=" 确认" @click="openMask">
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
            oschNum: "0" ,
            toPublic: "", // 目标账户
            toOschNum: "",// 交易数量
            server: "",
            stellarServer: "",
            account: "",
            secret: this.$route.params.id,
            selectType: "",
            transactionType: "",
            activtionAccount: "",
            valid: 1, //判断目的地地址
            close: false
        }
    },
    components: {
        VNav,
        // PayType

    },
    methods: {
        openMask () {
            this.close = true
            var _this = this
            //判断目的地址是否有效
            this.stellarServer
                .loadAccount(_this.toPublic)
                .then(function(account){
                    console.log('hahah')
                    _this.valid = 1
                    console.log(_this.valid)
                })
                .catch( (err) => {
                    console.log(err)
                    //报错则认为输入的目标在账户为激活,或输入错误
                    _this.valid = 2
                    console.log(_this.valid)
                    console.log("未激活")

                    })
        },
        closeMask() {
            this.close = false
        },
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
            console.log("hahah")
            // this.close = true
            var _this = this;
            
            //点击发送交易
            console.log(_this.toPublic)
            console.log(_this.toOschNum )
            console.log(_this.valid)
            console.log(_this.secret)
            console.log(_this.account)
            if (_this.valid == 1 ) { //当valid的值为1是,则进行转账交易
                var transaction = new StellarSdk.TransactionBuilder(_this.account,{
                    fee: "100000000"    
                })
                .addOperation(StellarSdk.Operation.payment({
                    destination: _this.toPublic,
                    asset: StellarSdk.Asset.native(),
                    amount: _this.toOschNum 
                }))
                .build();
                transaction.sign(StellarSdk.Keypair.fromSecret(this.secret)); // sign the transaction
                // 提交交易信息
                _this.stellarServer.submitTransaction(transaction).then(function(res){
                    console.log("发送交易成功")
                    alert("发送成功");
                    location.reload() 
                })
            } else if( _this.valid == 2){  //如果valid 的值为2 则进行激活事件
                console.log(_this.toPublic + "222")
                console.log(_this.sourceId + "111")
                console.log(_this.secret)
                this.stellarServer
                    .loadAccount(_this.sourceId)
                    .then(function(account){
                        console.log(account);
                        var transaction = new StellarSdk.TransactionBuilder(account,{
                                fee: 100000000    
                            })
                            .addOperation(StellarSdk.Operation.createAccount({
                                destination: _this.toPublic, //需要激活的账户
                                startingBalance: _this.toOschNum  //激活账户最低余额 in XLM
                                }))
                            .build();
                        transaction.sign(StellarSdk.Keypair.fromSecret(_this.secret));
                        _this.stellarServer.submitTransaction(transaction).then(function(res){
                            console.log('目标账户初始化成功')
                            alert("目标账户初始化成功");
                            location.reload()
                        })
                        .catch( (e) => {
                            console.log(e)
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
        _this.server
            .loadAccount(this.publicKey)
            .then(function(account){
                _this.account = account;
                for(var i=0;i<account.balances.length; i++){
                    if(account.balances[i].asset_type ==  "credit_alphanum4" || "credit_alphanum12"){
                        _this.oschNum = account.balances[i].balance;
                        // break; 
                    }
                }
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
    .confrimTransaction {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 99999;
    }
    .transactionMask {
        position: relative;
        padding: 0.75rem;
        margin: 30px auto;
        width: 780px;
        height: 800px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .maskTitle {
        margin: 0 0 1rem;
        text-align: center;
        font-size: 1.9rem;
        font-weight: 300
    }
    .mBorder {
        border-top: 1px solid #ccc

    }
    .maskHeader {
        width: 100%;
        height: 115px;
    }
    .maskInner {
        padding: 20px;
        height: 305px;


    }
    .maskFooter {
        padding: 20px;
        text-align: center;
        height: 150px;
    }
    .maskBtn {
        padding: 12px 35px;
        border: 1px;
        font-size: 1.07rem;
        font-weight: 400;
        margin-left:80px; 
    }
    .send {
        background-color: #0e97c0;
        color: #fff
    }
    .maskAccount {
        padding: 10px;
        margin-bottom: 1px;
        display: inline-block;
        font-size: 14px;
        width: 400px;
        white-space: pre-wrap
    }
    .masknum {
        float:right;
        font-size: 14px;
        width: 150px;
        height: 150px;
    }
    .maskInnerList {
        padding: 8px;
        margin-bottom: 20px;

    }
    .maskListLeft {
        margin-right: 10px;
        display: inline-block;
        font-size: 15px;
        width: 100px;
        text-align: right;
    }
    .mskFooterTitle {
        padding-bottom: 10px;
    }
</style>
