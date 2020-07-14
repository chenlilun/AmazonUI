<script src="../../../main.js"></script>
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="车间">
        <el-select v-model="p2.workshop" placeholder="请选择车间" style="width: 180px ; float: left">
          <el-option
            v-for="item in siteLists"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">搜索</el-button>
      </el-form-item>
    </el-form>

      <!--    <el-button>默认按钮</el-button>-->

      <!--   <el-button type="success">成功按钮</el-button>
         <el-button type="info">信息按钮</el-button>
         <el-button type="warning">警告按钮</el-button>
         <el-button type="danger">危险按钮</el-button>-->
    <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;" show-summary     height="650"
              :summary-method="getSummaries">

      <el-table-column prop="_id.productName" label="产品" width="80" fixed>
      </el-table-column>
      <el-table-column prop="_id.lineName" label="线别" width="80" fixed>
      </el-table-column>
      <el-table-column prop="_id.batchNo" label=" 批号 " width="120" fixed>
      </el-table-column>
      <el-table-column prop="_id.spec" label="规格" width="120" fixed>
      </el-table-column>
      <el-table-column label="机械毛丝" width="100" style="text-align: center">
        <template slot-scope="scope">
          {{getNum(scope.$index,'机械毛丝')}}
        </template>
      </el-table-column>
      <el-table-column label="人为毛丝" width="100">
        <template slot-scope="scope">
          {{getNum(scope.$index,'人为毛丝')}}
        </template>
      </el-table-column>
      <el-table-column label="绊丝" width="100">
        <template slot-scope="scope">
          {{getNum(scope.$index,'绊丝')}}
        </template>
      </el-table-column>
      <el-table-column label="机械成型" width="100">
        <template slot-scope="scope">
          {{getNum(scope.$index,'机械成型')}}
        </template>
      </el-table-column>
      <el-table-column label="人为成型" width="100">
        <template slot-scope="scope">
          {{getNum(scope.$index,'人为成型')}}
        </template>
      </el-table-column>
      <el-table-column label="机械油污" width="100">
        <template slot-scope="scope">
          {{getNum(scope.$index,'机械油污')}}
        </template>
      </el-table-column>
      <el-table-column label="无油" width="100">
        <template slot-scope="scope">
          {{getNum(scope.$index,'无油')}}
        </template>
      </el-table-column>
      <el-table-column label="撞伤" width="100">
        <template slot-scope="scope">
          {{getNum(scope.$index,'撞伤')}}
        </template>
      </el-table-column>
      <el-table-column label="分错丝" width="120">
        <template slot-scope="scope">
          {{getNum(scope.$index,'分错丝')}}
        </template>
      </el-table-column>
      <el-table-column label="夹丝" width="100">
        <template slot-scope="scope">
          {{getNum(scope.$index,'夹丝')}}
        </template>
      </el-table-column>

      <el-table-column label="纸管破" width="120">
        <template slot-scope="scope">
          {{getNum(scope.$index,'纸管破')}}
        </template>
      </el-table-column>
      <el-table-column label="无网络" width="120">
        <template slot-scope="scope">
          {{getNum(scope.$index,'无网络')}}
        </template>
      </el-table-column>
      <el-table-column label="割伤丝" width="120">
        <template slot-scope="scope">
          {{getNum(scope.$index,'割伤丝')}}
        </template>
      </el-table-column>

      <el-table-column label="少油" width="100">
        <template slot-scope="scope">
          {{getNum(scope.$index,'少油')}}
        </template>
      </el-table-column>
      <el-table-column label="清空丝车" width="100">
        <template slot-scope="scope">
          {{getNum(scope.$index,'清空丝车')}}
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="exCepSum" highlight-current-row v-loading="listLoading" style="width: 100%; text-align: center"
              >

      <el-table-column prop="" label="" width="80" fixed>
      </el-table-column>
      <el-table-column prop="" label="" width="80" fixed>
      </el-table-column>
      <el-table-column prop="" label="" width="120" fixed>
      </el-table-column>
      <el-table-column prop="" label="" width="120" fixed>
        <template slot-scope="scope">
          {{scope.$index==0?'POY合计':'FDY合计'}}
        </template>
      </el-table-column>
      <el-table-column label="机械毛丝" width="100" style="text-align: center">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'机械毛丝')}}
        </template>
      </el-table-column>
      <el-table-column label="人为毛丝" width="100">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'人为毛丝')}}
        </template>
      </el-table-column>
      <el-table-column label="绊丝" width="100">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'绊丝')}}
        </template>
      </el-table-column>
      <el-table-column label="机械成型" width="100">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'机械成型')}}
        </template>
      </el-table-column>
      <el-table-column label="人为成型" width="100">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'人为成型')}}
        </template>
      </el-table-column>
      <el-table-column label="机械油污" width="100">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'机械油污')}}
        </template>
      </el-table-column>
      <el-table-column label="无油" width="100">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'无油')}}
        </template>
      </el-table-column>
      <el-table-column label="撞伤" width="100">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'撞伤')}}
        </template>
      </el-table-column>
      <el-table-column label="分错丝" width="120">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'分错丝')}}
        </template>
      </el-table-column>
      <el-table-column label="夹丝" width="100">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'夹丝')}}
        </template>
      </el-table-column>

      <el-table-column label="纸管破" width="120">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'纸管破')}}
        </template>
      </el-table-column>
      <el-table-column label="无网络" width="120">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'无网络')}}
        </template>
      </el-table-column>
      <el-table-column label="割伤丝" width="120">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'割伤丝')}}
        </template>
      </el-table-column>

      <el-table-column label="少油" width="100">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'少油')}}
        </template>
      </el-table-column>
      <el-table-column label="清空丝车" width="100">
        <template slot-scope="scope">
          {{getNum2(scope.$index,'清空丝车')}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import * as cmsApi from '../api/cms'

    export default {
        data() {
            return {
                formInline:{},

                exCepSum : [0,1],
                sumList : [] ,
                listLoading:false,
                list: [],
                total: 0,
                params: {
                    page: 1,
                    size: 10,
                    siteId: '',
                    pageAliase: ''

                },
                p2: {
                    gteDate: '2020-06-03 00:00:00',
                    letDate: '2020-06-04 00:00:00',
                    workshop: 'C',
                },
                siteLists: [],
                value: '',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value2: [new Date('2020-06-03'),new Date('2020-06-04')]
            }
        },
        filters:{

        },
        methods: {
            query: function () {
                console.log("aaaa" + this.value2)
                if(this.p2){
                    this.p2.gteDate = this.value2[0]&&this.dateToString(this.value2[0]);
                    this.p2.letDate = this.value2[1]&&this.dateToString(this.value2[1]);
                    // console.log("gteDate" + this.p2.gteDate.toString())
                    cmsApi.exception_list(this.p2).then(res => {
                        if(res.code!==11111){
                            this.list = res.queryResult.list
                        }
                    })
                }
            },
            currentChange: function (val) {
                this.params.page = val
                this.query()
                console.log(`当前页: ${val}`);
            },
            del: function (pageId) {
                this.$confirm('你确定要删除吗', '提示', {}).then(() => {
                    cmsApi.item_del(pageId).then((res) => {
                        if (res.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.query();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败'
                            })
                        }
                    })
                })
            },
            edit: function (pageId) {
                this.$router.push({
                    path: '/cms/page/edit/' + pageId,
                    query: {
                        page: this.params.page,
                        siteId: this.params.siteId
                    }
                })
            },
            getNum: function (index, str) {
                let expNums = 0;
               if(this.list.length>0){
                   this.list[index].exceptions.forEach(function (val) {

                       if (val.exceptionname === str) {
                           expNums = val.exceptionSum
                       } else {
                           return expNums;
                       }
                   })
               }
                return expNums;
            },
            getNum2: function (index, str) {
                let expNums = 0;
                if(this.sumList && this.sumList.length>0){
                    this.sumList.filter(a => a.exCepName === str).forEach(function (val) {

                        if (val.exCepName === str && index === 0) {
                            expNums = val.poySum
                        } else if (val.exCepName === str && index === 1)  {
                            expNums = val.fdySum
                        }
                    })
                }
                return expNums;
            },
            generateHtml: function (pageId) {
                window.open("http://localhost:3001/cms/preview/" + pageId)
            },
            dateToString: function (date) {
                const year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hour = date.getHours();
                let minute = date.getMinutes();
                let second = date.getSeconds();
                month = month > 9 ? month : ('0' + month);
                day = day > 9 ? day : ('0' + day);
                hour = hour > 9 ? hour : ('0' + hour);
                minute = minute > 9 ? minute : ('0' + minute);
                second = second > 9 ? second : ('0' + second);
                const dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
                return dateTime;
            },
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                var json = param;

                var poySum = 0;
                var fdySum = 0;
                var sum = 0;
                let arr = []
                var getSomeExcepSum = name => {

                    this.list.filter(value => {
                        return value._id.productName === "FDY"
                    }).forEach(function (bean) {
                        bean.exceptions.filter(excep =>{
                        return     excep.exceptionname === name
                        }).forEach(function (e) {
                            fdySum += e.exceptionSum
                        })
                    })

                    this.list.filter(value => {
                        return value._id.productName === "POY"
                    }).forEach(function (bean) {
                        bean.exceptions.filter(excep =>{
                            return     excep.exceptionname === name
                        }).forEach(function (e) {
                            poySum += e.exceptionSum
                        })
                    }) ;
                    var str =  (fdySum+poySum) ;

                    // var str = 'FDY'+fdySum+'\n'+'POY'+poySum+'\n'+'总计'+(fdySum+poySum)
                    var obj = {
                        "exCepName" : name ,
                        "poySum" : poySum ,
                        "fdySum" : fdySum ,

                    } ;


                    arr.push(obj) ;

                    console.log('多少次了') ;
                    fdySum =  0  ;
                    poySum =  0  ;

                    return str;
                }

                // console.log("aa=="+  json)
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总计';
                        return;
                    }
                    if (index >= 4) {
                        sums[index] =  getSomeExcepSum(json.columns[index].label);
                        return;
                    }

                    // const values = data.map(item => Number(item[column.property]));
                    // if (!values.every(value => isNaN(value))) {
                    //     sums[index] = values.reduce((prev, curr) => {
                    //         const value = Number(curr);
                    //         if (!isNaN(value)) {
                    //             return prev + curr;
                    //         } else {
                    //             return prev;
                    //         }
                    //     }, 0);
                    //     sums[index] += ' 元';
                    // } else {
                    //     sums[index] = 'N/A';
                    // }
                });
                this.sumList = arr
                return sums;
            }
        },
        created() {
            this.params.page = Number.parseInt(this.$route.query.page || 1)
            this.params.siteId = this.$route.query.siteId || ''
            this.siteLists = [{siteId: 'A', siteName: 'A车间'}, {siteId: 'B', siteName: 'B车间'}, {
                siteId: 'C',
                siteName: 'C车间'
            }, {siteId: 'D', siteName: 'D车间'}]
            this.query()
            //取出路由中参数 赋值给自己得参数
        },
        mounted() {
        }

    }
</script>

<style>



</style>
