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
                    <div class="img" id="qrcode"></div>
            </div>
        </div>
        <div>
            <div class="main-left clear">
            <div class="leftMenu">
                <div>
                <h4 class="menu" @click="changtab">所持代币</h4>
                <p class="menuBranch" v-for="(item,index) of select" :key="index">{{item.desc}}</p>
            </div>
            <div class="menu" @click="changtab">添加代币</div>
            <div class="menu" @click="changtab">代币余额</div>
            </div>
            
            </div>
            <div class="main-right">
                <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName" v-show="show==1">
                    <el-tab-pane label="全部交易记录"  name="second" >
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
                    <el-tab-pane label="收入交易" name="first" >
                         <el-table
                            :data="input.slice((currpage - 1) * pagesize, currpage * pagesize)" 
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
                    <el-tab-pane label="支出交易">
                        <el-table
                            :data="output.slice((currpage - 1) * pagesize, currpage * pagesize)"
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
                    :total= "tab"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange" 
                    >
                    </el-pagination>
                    <button @click="getPage">next</button>
                </el-tabs>
                <div class="addCoin" v-show="show == 2">
                    <h1>添加代币</h1>
                    <el-transfer v-model="value1" :data="data2"></el-transfer>
                </div>
                <div class="otherBalance" v-show="show==3">
                    <div class="balanceBlock">
                        <h2>Osch</h2>
                        <p>余额为：{{oschNum}} Osch</p>
                    </div>
                    <div class="balanceBlock">
                        <h2>Time</h2>
                        <p>余额为：XXXXX</p>
                    </div>
                    <div class="balanceBlock">
                        <h2>Ccc</h2>
                        <p>余额为：XXXXX</p>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VNav from '../vnav'
//引入rqcode 动态生成二维码
import QRCode from 'qrcodejs2'
export default {
    data () {
        const generateData = _ => {
        const data1 = [];
        for (let i = 1; i <= 15; i++) {
          data1.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data1;
      };
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
            wArrPage: [],
            input: [],
            output: [],
            tab: 10,
            show: 1,
            select:[{desc:'Osch'}, {desc:'Time'}, {desc:'Ccc'}],
            //element 穿梭框
            data2: generateData(),
            value1: [1, 4]
            // value5: [{desc:'Osch'}, {desc:'Time'}, {desc:'Ccc'}]
        }
    },
    methods: {
        qrcode() {
            let qrcode = new QRCode('qrcode', {
                width:150,
                height:150,
                text: this.publicKey,
                colorDark: '#000',
                colorLiht: '#fff'
            })
        },
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
        //跳转交易详情页
        transactionInfo () {
            window.location.href =  'http://coast.oschain.io/transactions/' + event.target.innerHTML
            console.log(event.target.innerHTML)
        },
        //点击事件，每次点击获取1page
        getPage: async function(){
            //next（） 是stellar中的一个方法，每次只能获取10条数据
            console.log(this.wPage)
            // for(let i=0; i<=5; i++){
                console.log(i)
                this.wPage = await this.wPage.next();
                // console.log(this.wPage.records)
                this.render(this.wPage.records)
                // console.log(this.wArrPage)
                // console.log(this.wArrPage.length)
                // this.wArrPage = [...this.wArrPage, ...this.wPage.records]
                // this.wArrPage.concat(this.wPage.records)
            // }
            //  for循环，拿到wArrPage中num的首位为“+”的添加到input数组中，首位为“-”的添加到output中
                for(var i=0;i<this.wArrPage.length;i++){
                    var num = this.wArrPage[i].num
                    if(num.substr(0,1) == "+"){
                        this.input.push(this.wArrPage[i])
                    }
                    if(num.substr(0,1) == "-"){
                        this.output.push(this.wArrPage[i])
                    }
                }
                // console.log(this.input)
                // console.log(this.output)
           
        },

        // 循环遍历数组，并抽取6个参数，然后放入wArrPage
        render(page){
            var _this = this
                console.log('hahah')
                for(var i=0; i<page.length; i++){
                    page[i].operations().then(function(res){
                    console.log('hahah')
                        if(res.records[0].from == _this.publicKey){
                            var ob = {
                                time: res.records[0].created_at,
                                transaction: res.records[0].transaction_hash, 
                                num: "-"+res.records[0].amount,
                                to: res.records[0].to,
                                asset:res.records[0].asset_type,
                                activeType:res.records[0].type
                            };
                            if(ob.asset == "native") {
                                ob.asset = "Osch"
                            }
                            //账单号缩写
                            // let op = ob.transaction
                            // let rep1 = op.substr(0,10)    
                            // let rep2 = op.substr(op.length-10)
                            // ob.transaction = rep1 + "·····" + rep2
                            return _this.wArrPage.push(ob)
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
                            // let op = ob.transaction
                            // let rep1 = op.substr(0,10)    
                            // let rep2 = op.substr(op.length-10)
                            // ob.transaction = rep1 + "·····" + rep2
                            return _this.wArrPage.push(ob)
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
                            return _this.wArrPage.push(ob)
                            console.log(ob)
                            console.log(_this.wArrPage)

                        } 
                    })
                }
                return page
            },
        handleClick(res,event) {
            // console.log(event.target.innerHTML)
            if(event.target.innerHTML == "全部交易记录"){
                this.tab = this.wArrPage.length
                console.log(this.tab)
            }else if(event.target.innerHTML == "收入交易"){
                this.tab = this.input.length
                console.log(this.tab)
            }else if(event.target.innerHTML == "支出交易"){
                this.tab = this.output.length
                console.log(this.tab)
            }
        },
        //切换状态栏
        changtab(event) {
            if(event.target.innerHTML == "所持代币"){
                this.show = 1
            } else if (event.target.innerHTML == "添加代币") {
                this.show = 2
            } else if (event.target.innerHTML == "代币余额") {
                this.show = 3
            }
        },
        //初始化
        init: async function(){
            console.log(this.wArrPage)
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
            // console.log(keypair)
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
           await  _this.server.transactions()
                .forAccount(this.publicKey)
                .call()
                //每次回调只会返回10条数据
                .then(function(page) {
                    console.log(page)
                    console.log(page.records.length)
                    //拿到回调函数中的返回值即10条数据，并赋值给wPage
                    _this.wPage = page  
                    //调用render方法wPage传入进去，然后拿到筛选过后的10条数据
                    _this.render(_this.wPage.records)
                    // console.log(_this.wPage.records)
                })
             _this.getPage()
             console.log(this.wPage)
        }
    },
    components: {   
        VNav
    },
    created(){
    },
    mounted () {
        this.init()
        this.qrcode()
        console.log(this.select)
        console.log(this.data2)
        console.log(this.value1)
    }
}
</script>

<style>
   .main {
        margin: 30px;
        background-color: bisque;
        min-width: 960px;
        min-height: 700px;
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
        /* width: 500px; */
        /* height: 500px; */
        /* background-image: url("https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1750833952,2529388352&fm=58&bpow=380&bpoh=380"); */
        /* background-repeat: no-repeat; */
    }
    .otherBalance {
        padding: 30px;
        background-color: #888;
        min-height: 600px;
        text-align: center;
    }
    .balanceBlock {
        margin: 30px;
    }
    .leftMenu {
        padding: 20px;
        background: #000;

    }
    .menu {
        margin:20px 10px;
        width: 138px;
        text-align: center;
        color: aliceblue;
        font-weight: 700;
        font-size: 16px;
    }
    .menu:hover {
        background-color: #888;
    }
    .menuBranch {
        margin-top: 10px;
        font-weight: 200;
        text-align: center;
        color: aliceblue;
        font-size: 15px
    }
    .menuBranch:hover {
        background: #888
    }
    .addCoin {
        padding: 30px;
        background: #888;
        min-height: 600px;
        text-align: center; 
    }
 
</style>
