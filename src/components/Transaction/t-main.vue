<template>
    <div class="t-main">
        <!-- 确认交易遮罩层 -->
        <div class="confrimTransaction" v-show="close">
            <div class="transactionMask">
                <h2 class="maskTitle  "> 你即将发送...</h2>
                <div class="maskHeader mBorder ">
                    <div class="maskAccount">当前地址: {{sourceId}}</div>
                    <div class="maskAccount">目标地址: {{toPublic}}</div>
                    <div class="masknum">交易额: {{toOschNum}} Osch</div>
                </div>
                <div class="maskInner mBorder ">
                    <p class="maskInnerList">
                        <span class="maskListLeft"> 当前地址:</span>
                        <span class="maskListRight">{{sourceId}}</span>
                    </p>
                    <p class="maskInnerList">
                        <span class="maskListLeft"> 目标地址:</span>
                        <span class="maskListRight">{{toPublic}}</span>
                    </p>
                    <p class="maskInnerList" v-show="memo">
                        <span class="maskListLeft"> 备忘录:</span>
                        <span class="maskListRight">{{memo}}</span>
                    </p>
                    <p class="maskInnerList">
                        <span class="maskListLeft"> 地址余额:</span>
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
                    来源地址：
                        </span>
                    </div>
                    <div class="dis-right">
                        <input type="text" placeholder="例如: GCEXAMPLE5HWNK4AYSTEQ4UWDKHTCKADVS2AHF3UI2ZMO3DPUSM6Q4UG" class="inp" v-model="sourceId">
                    </div>
                    <div class="dis-right">
                         <p class="dis-tips">提示：如果您还没有源钱包，可以
                        <router-link to="/">创建钱包</router-link>
                        </p>
                    </div>
                    </div>
                   <div class="dis-list">
                        <div class="dis-left">
                        <span>
                    基本费用 (可选项)
                        </span>
                        </div>
                        <div class="dis-right">
                                <input type="text" placeholder="Amount in stroops (1 lumen = 10,000,000 stroops)" class="inp" v-model="baseFee">
                        </div>
                        <div class="dis-right">
                            <p class="dis-tips">1本币 = 10,000,000 strops，默认最低交易费用为100本币
                            </p>
                        </div>
                    </div>
                   <div class="dis-list">
                        <div class="dis-left">
                        <span>
                    备忘录 (可选项)
                        </span>
                        </div>
                        <div class="dis-right">
                                <input type="text" placeholder=默认为text class="inp" v-model="memo">
                        </div>
                    </div>
                   <div class="dis-list">
                        <div class="dis-left">
                        <span>
                    交易时间 (可选项)
                        </span>
                        </div>
                        <div class="dis-right">
                                <input type="text" placeholder=lowerTime(事务有效范围是unix时间戳值) class="timeBounds" v-model="minTime">
                                <input type="text" placeholder=upTime(事务有效范围是unix时间戳值) class="timeBounds" v-model="maxTime">
                        </div>
                        <div class="dis-right">
                            <p class="dis-tips">当此事务有效时，输入时间范围
                            <a href="https://www.epochconverter.com/">unix</a>
                            时间戳值。
                            </p>
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
                                        <span>目标地址：</span>
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
            sourceId: "",//公钥地址
            oschNum: "0" ,//剩余Osch数量
            toPublic: "", // 目标账户
            toOschNum: "",// 交易数量
            server: "",//Stellar
            stellarServer: "",  //Stellar
            account: "",//每次请求stellar返回的账户详情
            secret: this.$route.params.id,//私钥
            selectType: "",//下拉框类型
            transactionType: "",//交易类型
            valid: 1, //判断目的地地址
            memo: "",//备忘录
            close: false,//遮罩层
            baseFee: 100, //愿意在此交易中按操作支付的最高费用
            // timebounds: [],//事务有效性的时间范围。
             timebounds: {
                minTime: '',
                maxTime: ''
            },
            minTime: '',//lowerTime 需放入timebounds
            maxTime: ''//upTime 需放入timebounds

        }
    },
    components: {
        VNav,
        // PayType

    },
    methods: {
        //打开遮罩层
        openMask () {
            this.close = true
            var _this = this
            //做判断基础交易费用
            if(_this.baseFee>=100){
                _this.baseFee = _this.baseFee
            }else if(_this.baseFee<100) {
                alert('基础费用不可小于100Stroops')
                _this.close = false
            }
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
        //关闭遮罩层
        closeMask() {
            this.close = false
        },
        //点击发送交易
        sendClick () {
            // this.close = true
            var _this = this;
            // 操作交易时间的键值对不为空的情况下
            if((_this.minTime!== "")||(_this.maxTime!== "")){
                _this.timebounds = {
                    minTime: _this.minTime, //lowerTime
                    maxTime: _this.maxTime //upTime
                }
            }
            //创建bulid变量，里面存储着创建交易的operation键值对操作
            let bulid = {
                fee: _this.baseFee*10000000, 
                timebounds: _this.timebounds 
            }
            
            //做判断如果时间交易两项中的任意一项没有填写，则创建交易的时候只发送默认的基本费用
            if((_this.minTime == "")||(_this.maxTime == "")) {
                bulid = {
                    fee: _this.baseFee, 
                }
            }
            //当valid的值为1是,则进行转账交易
            if (_this.valid == 1 ) { 
                var transaction = new StellarSdk.TransactionBuilder(_this.account,bulid)
                .addOperation(StellarSdk.Operation.payment({
                    destination: _this.toPublic,
                    asset: StellarSdk.Asset.native(),
                    amount: _this.toOschNum 
                }))
                .addMemo(StellarSdk.Memo.text(_this.memo))
                .build();
                transaction.sign(StellarSdk.Keypair.fromSecret(this.secret)); // sign the transaction
                // 提交交易信息
                _this.stellarServer.submitTransaction(transaction).then(function(res){
                    console.log("发送交易成功")
                    alert("发送成功");
                    location.reload() 
                })
                //如果valid 的值为2 则进行激活事件
            } else if( _this.valid == 2){  
                this.stellarServer
                    .loadAccount(_this.sourceId)
                    .then(function(account){
                        console.log(account);
                        var transaction = new StellarSdk.TransactionBuilder(account,{
                                fee: _this.baseFee, 
                            })
                            .addOperation(StellarSdk.Operation.createAccount({
                                destination: _this.toPublic, //需要激活的账户
                                startingBalance: _this.toOschNum  //激活账户最低余额 in XLM
                                }))
                            .addMemo(StellarSdk.Memo.text(_this.memo)) // 添加备忘录
                            .build();
                        transaction.sign(StellarSdk.Keypair.fromSecret(_this.secret));
                        _this.stellarServer.submitTransaction(transaction).then(function(res){
                            console.log('目标地址初始化成功')
                            alert("目地址初始化成功");
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
        this.stellarServer = new StellarSdk.Server(_this.horizonUrl);
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
    .timeBounds {
        width: 245px;
        height: 27px;
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
    .maskInnerList:hover {
        background: #ccc;
        color: #fff
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
