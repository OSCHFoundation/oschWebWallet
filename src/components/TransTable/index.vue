<template>
  <div class="element">
    <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
      <el-tab-pane label="全部交易记录" name="second">
        <el-table
          :data="wArrPage.slice((currpage - 1) * pagesize, currpage * pagesize)"
          :row-class-name="tableRowClassName"
          style="width: 100%"
        >
          <el-table-column prop="created_at" label="交易时间" width="100"></el-table-column>
          <el-table-column label="交易金额" width="140" id="color1" class="money">
            <template slot-scope="scope">
              <span :class="{transactionMoney1:scope.row.num.slice(0, 1)=='-'}">{{scope.row.num}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="from" label="发款方" width="296" class="from"></el-table-column>
          <el-table-column prop="to" label="收款方" width="296"></el-table-column>
          <el-table-column label="交易号" width="388">
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click.native="transactionInfo">{{scope.row.transaction_hash}}</el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="交易类型" width="130"></el-table-column>
          <el-table-column prop="asset" label="资产" width="100"></el-table-column>
          <el-table-column prop="memo" label="备注"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="收入交易" name="first">
        <el-table
          :data="input.slice((currpage - 1) * pagesize, currpage * pagesize)"
          :row-class-name="tableRowClassName"
          style="width: 100%"
        >
          <el-table-column prop="created_at" label="交易时间" width="100"></el-table-column>
          <el-table-column prop="num" label="交易金额" width="140" class="color1"></el-table-column>
          <el-table-column prop="from" label width="296"></el-table-column>
          <el-table-column prop="to" label="收款方" width="296"></el-table-column>
          <el-table-column label="交易号" width="388">
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click.native="transactionInfo">{{scope.row.transaction_hash}}</el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="交易类型" width="130"></el-table-column>
          <el-table-column prop="asset" label="资产" width="100"></el-table-column>
          <el-table-column prop="memo" label="备注"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="支出交易">
        <el-table
          :data="output.slice((currpage - 1) * pagesize, currpage * pagesize)"
          :row-class-name="tableRowClassName"
          style="width: 100%"
        >
          <el-table-column prop="created_at" label="交易时间" width="100"></el-table-column>
          <el-table-column label="交易金额" width="140">
            <template slot-scope="scope">
              <span style="color:#F55436">{{scope.row.num}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="from" label="发款方" width="296"></el-table-column>
          <el-table-column prop="to" label="收款方" width="296"></el-table-column>
          <el-table-column label="交易号" width="388">
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click.native="transactionInfo">{{scope.row.transaction_hash}}</el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="交易类型" width="130"></el-table-column>
          <el-table-column prop="asset" label="资产" width="100"></el-table-column>
          <el-table-column prop="memo" label="备注"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-pagination
        layout="prev, pager, next, sizes, total, jumper"
        :page-sizes="[5, 10, 15, 20, 25, 30]"
        :page-size="pagesize"
        :total="tab"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: ["wArrPage"],
  data() {
    return {
      tab: 10,
      activeName: "second",
      currpage: 1,
      pagesize: 10,
      input: [],
      output: [],
      osch: [],
      time: [],
      hour: []
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    this.getPage();
    console.log(this.wArrPage);
    this.tab = this.wArrPage.length;
  },
  watch: {
    wArrPage(val) {
      this.tab = val.length;
    }
  },
  methods: {
    getPage: function() {
      for (var i = 0; i < this.wArrPage.length; i++) {
        var num = this.wArrPage[i].num;
        if (num.substr(0, 1) == "+") {
          this.input.push(this.wArrPage[i]);
          // console.log(this.input);
        }
        if (num.substr(0, 1) == "-") {
          this.output.push(this.wArrPage[i]);
        }
      }
      //拿到数据列表然后筛选出翻入各自币种之中
      for (var osc of this.wArrPage) {
        if (osc.asset == "OSCH") {
          this.osch.push(osc);
        } else if (osc.asset == "TIME") {
          this.time.push(osc);
        } else if (osc.asset == "HOUR") {
          this.hour.push(osc);
        }
      }
    },
    handleClick: function(res, event) {
      if (event.target.innerHTML == "全部交易记录") {
        this.tab = this.wArrPage.length;
        this.currpage = 1;
      } else if (event.target.innerHTML == "收入交易") {
        this.currpage = 1;
        this.tab = this.input.length;
      } else if (event.target.innerHTML == "支出交易") {
        this.currpage = 1;
        this.tab = this.output.length;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    //跳转交易详情页
    transactionInfo() {
      window.location.href =
        "http://coast.oschain.io/transactions/" +
        event.target.innerHTML +
        "/operations";
    }
  }
};
</script>
