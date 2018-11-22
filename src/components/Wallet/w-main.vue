<template>
    <div class="main">
        <v-nav></v-nav>
        <div class="wallet-info">
            <h2 class="title">我的钱包信息</h2>
            <div class="key-pairs">
                <div>
                    <p class="info">我的地址:</p>
                    <!-- <input type="text" :value=publicKey class="w-inp"> -->
                     <p class="balance">{{publicKey}}</p>
                </div>
                <div>
                    <p class="info">我的余额</p>
                    <!-- <input type="text" :value="oschNum" class="w-inp"> -->
                    <p class="balance"><span>{{oschNum}}</span>&nbsp OSCH</p>
                </div>
            </div>
            <div class="key-code">
                    <p class="info">账户地址：</p>
                    <span class="info-id">{{publicKey}}</span>
                    <div class="img"></div>
            </div>
        </div>
        <div>
            <div class="main-left clear">
                <el-row class="tac">
                    <el-col :span="12">
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>所持代币</span>
                    </template>
                    <el-menu-item index="1-1">所持代币：Osch</el-menu-item>
                    <el-menu-item index="1-2">所持代币：Time</el-menu-item>
                    <el-menu-item index="1-4">所持代币：ccc</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">添加代币</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">代币余额</span>
                </el-menu-item>
                </el-menu>
            </el-col>
            </el-row>
            </div>
            <div class="main-right">
                <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName" >
                    <el-tab-pane label="全部交易记录" name="first" >
                         <el-table
                            :data="wArrPage.slice((currpage - 1) * pagesize, currpage * pagesize)"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="time"
                            label="Create_Time"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="num"
                            label="Amount"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="to"
                            label="To"
                            width="230">
                            </el-table-column>
                            <el-table-column
                            prop="transaction"
                            label="Transaction ID">
                            <template slot-scope="scope">
                                <el-button-group>
                                    <el-button>{{scope.row.transaction}}</el-button>
                                </el-button-group>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="activeType"
                            label="ActiveType"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="asset"
                            label="Currency"
                            >
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="收入交易"  name="second" >
                    <el-table
                            :data="wArrPage.slice((currpage - 1) * pagesize, currpage * pagesize)"
                            stripe
                            style="width: 100%"
                            >
                            <el-table-column
                            prop="time"
                            label="Create_Time"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="num"
                            label="Amount"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="to"
                            label="To"
                            width="230">
                            </el-table-column>
                            <el-table-column
                            label="Transaction ID"
                            >
                            <template slot-scope="scope">
                                <el-button-group>
                                    <el-button @click.native="transactionInfo">{{scope.row.transaction}}</el-button>
                                </el-button-group>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="activeType"
                            label="ActiveType"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="asset"
                            label="Currency"
                            >
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="支出交易">
                        <el-table
                            :data="wArrPage.slice((currpage - 1) * pagesize, currpage * pagesize)"
                            stripe
                            style="width: 100%"
                            >
                            <el-table-column
                            prop="time"
                            label="Create_Time"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="num"
                            label="Amount"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="to"
                            label="To"
                            width="230">
                            </el-table-column>
                            <el-table-column
                            label="Transaction ID"
                            >
                            <template slot-scope="scope">
                                <el-button-group @click.native ="transactionInfo">
                                    <el-button >{{scope.row.transaction}}</el-button>
                                </el-button-group>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="activeType"
                            label="ActiveType"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="asset"
                            label="Currency"
                            >
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="数据图">数据图</el-tab-pane>
                    <el-pagination
                    layout="prev, pager, next, sizes, total, jumper"
                    :page-sizes = "[5, 10, 15, 20, 25, 30]"
                    :page-size="pagesize"
                    :total="tableData.length"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange" 
                    >
                </el-pagination>
                <button @click="getPage">next</button>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import VNav from '../vnav'
export default {
    data () {
        return {
             activeName: 'second',
                server: "",
                sercet: this.$route.params.id,
                publicKey: "13212",
                oschNum: "123",
                toPublic: "",
                toOschNum: "",
                account: "",
                tableData: [],
                currpage: 1,
                pagesize: 10,
                activeName: 'second',
                wPage: "",
                wArrPage: []
        }
    },
    methods: {
        // 分页插件
        handleCurrentChange (cpage) {
            this.currpage = cpage
        },
        handleSizeChange (psize) {
            this.pagesize = psize
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        transactionInfo () {
            window.location.href =  'http://coast.oschain.io/transactions/' + event.target.innerHTML
            console.log(event.target.innerHTML)
        },
        incomeTransaction (){

        },
        //点击事件，每次点击获取1page
        getPage: async function(){
            this.wPage = await this.wPage.next();
            console.log(this.wPage.records)
            this.render(this.wPage.records)
            console.log(this.wArrPage)
            this.wArrPage = [...this.wArrPage, ...this.wPage.records]
            // console.log(this.wArrPage);
            this.$forceUpdate()
            // window.location.reload()
        },
        render(page){
            var _this = this
                console.log('hahah')
                for(var i=0; i<page.length; i++){
                    page[i].operations().then(function(res){
                    console.log('hahah')
                        if(res.records[0].from == _this.publicKey){
                            var ob = {
                                time: res.records[0].created_at,
                                operation: res.records[0].transaction_hash, 
                                num: "-"+res.records[0].amount,
                                to: res.records[0].to,
                                asset:res.records[0].asset_type,
                                activeType:res.records[0].type
                            };
                            if(ob.asset == "native") {
                                ob.asset = "Osch"
                            }
                            //账单号缩写
                            let op = ob.transaction
                            let rep1 = op.substr(0,10)    
                            let rep2 = op.substr(op.length-10)
                            ob.transaction = rep1 + "·····" + rep2
                            _this.wArrPage.push(ob)
                            console.log(_this.wArrPage)
                        }else if(res.records[0].type=="create_account"){
                            var ob = {
                                time: res.records[0].created_at,
                                transaction: res.records[0].transaction_hash, 
                                num: "+"+res.records[0].starting_balance,
                                to: res.records[0].to,
                                asset:res.records[0].asset_type,
                                activeType:res.records[0].type
                            };            
                             if(ob.asset == "native") {
                                ob.asset = "Osch"
                            }
                            //账单号缩写
                            let op = ob.transaction
                            let rep1 = op.substr(0,10)    
                            let rep2 = op.substr(op.length-10)
                            ob.transaction = rep1 + "·····" + rep2
                            _this.wArrPage.push(ob)
                            console.log(_this.wArrPage)
                        }else{
                            var ob = {
                                time: res.records[0].created_at,
                                transaction: res.records[0].transaction_hash, 
                                num: "+"+res.records[0].amount,
                                to: res.records[0].to,
                                asset:res.records[0].asset_type,
                                activeType:res.records[0].type
                            };    
                        // 字符串截取        
                            if(ob.asset == "native") {
                                ob.asset = "Osch"
                            }
                            _this.wArrPage.push(ob)
                            console.log(_this.wArrPage)

                        } 
                    })
                }
            }
        // handleClick(res,event) {
        //     console.log(event.target.innerHTML)
        //     var _this = this
        //     if((event.target.innerHTML == "支出交易")||(event.target.innerHTML == "全部交易记录")){
        //     }
        // }
        
    },
    components: {
        VNav
    },
    mounted(){
        var _this = this;
        StellarSdk.Config.setAllowHttp(true);
        StellarSdk.Network.use(new StellarSdk.Network(_this.horizonSecret));
        _this.server = new StellarSdk.Server(_this.horizonUrl);
        // console.log(_this.server)
        
        //init secret tool
        var strkey = StellarSdk.StrKey;
        var arrPrivate = strkey.decodeEd25519SecretSeed(_this.sercet);
        var keypair = new StellarSdk.Keypair({
            type: "ed25519",
            secretKey: arrPrivate 
        });
        console.log(keypair)
        _this.publicKey = strkey.encodeEd25519PublicKey(keypair.rawPublicKey());
        //找到账户信息
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
        // 获取历史交易
        _this.server.transactions()
            .forAccount(this.publicKey)
            .call()
            .then(function(page) {
                _this.wPage = page
                console.log(page.records)
                //拿到第一个page10条数据
                _this.render(_this.wPage.records)
                console.log(_this.wPage)
            })
            
    // console.log(this.account)
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
    .wallet-info {
        padding-bottom: 50px;
        width: 100%;
        background-color: aliceblue;
        margin-bottom: 20px;
    }
    .key-pairs {
        display: inline-block;
        left: 100px;;
        width: 1010px;
        height: 200px;
    }
    .key-code {
        padding-left: 30px;
        display: inline-block;
        height: 200px;
        vertical-align: top;
    }
    .balance {
        margin-left: 100px;
        font-size: 20px;
        font-weight: 700;
    }
    .el-button-group .el-button {
        white-space: pre-wrap;
        /* border: none; */
        /* background: rgba(255, 255, 255, 0) */
    }
    .main-left {
        float: left;
        overflow: hidden;
    }
    .main-right {
        margin-left: 199px;
    }
    .el-col {
        width: 201px;
    }
    .el-tabs__content {
        min-height: 350px;
    }
    .info {
        text-align: left;
        font-size: 16px;
        padding: 15px;
    }
    .info-id {
        font-size: 16px;
        padding-left: 10px;
    }
    .w-inp {
        width: 900px;
        height: 40px;
        margin-left: 100px;
    }
    .title {
        padding-top: 15px;
        text-align: center
    }
    .img {
        margin-top: 30px;
        padding-left: 15px;
        width: 500px;
        height: 500px;
        background-image: url("https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1750833952,2529388352&fm=58&bpow=380&bpoh=380");
        background-repeat: no-repeat;
    }
 
</style>
