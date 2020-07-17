<script src="../../../main.js"></script>
<template>
  <div @click="handleFullScreen($refs.fullScreen)" ref="fullScreen" :class="['board_fullscreen',fullscreen?'isFullscreen':'']">
    <el-form  @click.native.stop :inline="true" :model="formInline" class="board_search">
      <el-form-item label="车间">
        <el-select v-model="p2.workshop" placeholder="请选择车间" style="width: 180px ; float: left" @change="change()">
          <el-option
            v-for="item in siteLists"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产线">
        <el-select v-model="p2.line" placeholder="请选择产线" style="width: 180px ; float: left">
          <el-option
            v-for="item in lineLists"
            :key="item.lineName"
            :label="item.lineName"
            :value="item.lineName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click.stop type="primary" @click="query">搜索</el-button>
      </el-form-item>
    </el-form>

    <!--    <el-button>默认按钮</el-button>-->

    <!--   <el-button type="success">成功按钮</el-button>
       <el-button type="info">信息按钮</el-button>
       <el-button type="warning">警告按钮</el-button>
       <el-button type="danger">危险按钮</el-button>-->
    <el-table :data="list"  v-loading="listLoading" style="width: 100%;" height="950"   :row-class-name="tableRowClassName"
    >
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-table-column label="纺位"  style="text-align: center">
              <template slot-scope="scope">
                {{getNum(scope.$index)}}
              </template>
            </el-table-column>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">

            <el-table-column label="落次" style="text-align: center" >
              <template slot-scope="scope">
                {{getDoffNums(scope.$index)}}
              </template>
            </el-table-column>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">

            <el-table-column prop="_id.name" label=" 异常 ">
            </el-table-column>
          </div>
        </el-col>


        <el-col :span="12">
          <div class="grid-content bg-purple-light">

            <el-table-column prop="_id.name" label="时间" >
              <template slot-scope="scope">
                {{getTime(scope.$index)}}
              </template>
            </el-table-column>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">

            <el-table-column prop="exCepSum" label="出现次数" >
            </el-table-column>
          </div>
        </el-col>
      </el-row>





    </el-table>
  </div>
</template>

<script>
    import * as cmsApi from '../api/cms'
    import moment from 'moment'


    export default {
        data() {
            return {
                fullscreen:false,
                formInline: {},

                exCepSum: [0, 1],
                sumList: [],
                listLoading: false,
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
                    line: 'C1',
                },
                siteLists: [],
                lineLists: [],
                value: '',
            }
        },
        filters: {},
        methods: {
            query: function () {

                if (this.p2&&this.p2.workshop&&this.p2.line) {

                    // console.log("gteDate" + this.p2.gteDate.toString())
                    cmsApi.board_list(this.p2.workshop, this.p2.line).then(res => {
                        if (res.code != 11000) {
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
            getNum: function (index) {
                let expNums = '';
                if (this.list.length > 0) {
                    expNums = this.list[index].lineName + '-' + this.list[index]._id.spindle + '/' + this.list[index]._id.item
                }
                return expNums;
            },
            getDoffNums: function (index) {
                let doffNums = '';
                this.list[index].doffs.forEach((a) => {
                    doffNums = doffNums + a.doffingNum + ","
                })
                return doffNums
            },
            getTime: function (index) {
                return moment(new Date(this.list[index].times[0].time)).format('YYYY-MM-DD HH:mm:ss')
            },
            getNum2: function (index, str) {
                let expNums = 0;
                if (this.sumList && this.sumList.length > 0) {
                    this.sumList.filter(a => a.exCepName === str).forEach(function (val) {

                        if (val.exCepName === str && index === 0) {
                            expNums = val.poySum
                        } else if (val.exCepName === str && index === 1) {
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
                        bean.exceptions.filter(excep => {
                            return excep.exceptionname === name
                        }).forEach(function (e) {
                            fdySum += e.exceptionSum
                        })
                    })

                    this.list.filter(value => {
                        return value._id.productName === "POY"
                    }).forEach(function (bean) {
                        bean.exceptions.filter(excep => {
                            return excep.exceptionname === name
                        }).forEach(function (e) {
                            poySum += e.exceptionSum
                        })
                    });
                    var str = (fdySum + poySum);

                    // var str = 'FDY'+fdySum+'\n'+'POY'+poySum+'\n'+'总计'+(fdySum+poySum)
                    var obj = {
                        "exCepName": name,
                        "poySum": poySum,
                        "fdySum": fdySum,

                    };


                    arr.push(obj);

                    fdySum = 0;
                    poySum = 0;

                    return str;
                }

                // console.log("aa=="+  json)
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总计';
                        return;
                    }
                    if (index >= 4) {
                        sums[index] = getSomeExcepSum(json.columns[index].label);
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
            },
            handleFullScreen(element) {
                // let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            change: function () {
                // this.lineLists =
                let iteratorObject = {
                    * [Symbol.iterator]() {
                        yield 1;
                        yield 2;
                        yield 3;
                        yield 4;
                        yield 5;
                        yield 6;
                    }
                };
                let array = Array.from(iteratorObject, (item) => {
                    if (this.p2.workshop === 'B' && item <= 2) {
                        return this.p2.workshop + item.toString()
                    }
                    return this.p2.workshop + item.toString()
                });
                let arr2 = [];
                array.forEach(function (value) {
                    var obj = {'lineName': value}
                    arr2.push(obj)
                })
                this.lineLists = arr2;
                this.p2.line = ''
                console.log(array[0]); //2
                console.log(array[1]); //3
                console.log(array[2]); //4
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex <= 5) {
                    return 'warning-row';
                }else {
                    return 'commom-row';
                }
            } ,
        },
        created() {
            console.log(this.$route,'params')
            this.params.page = Number.parseInt(this.$route.query.page || 1)
            this.params.siteId = this.$route.query.siteId || ''
            this.siteLists = [{siteId: 'A', siteName: 'A车间'}, {siteId: 'B', siteName: 'B车间'}, {
                siteId: 'C',
                siteName: 'C车间'
            }, {siteId: 'D', siteName: 'D车间'}]

            this.query()
            //取出路由中参数 赋值给自己得参数
            this.timer = setInterval(this.query,1000*60*2)
        },
        mounted() {
            // this.handleFullScreen() ;
            // this.$refs.upload.click()
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }

    }
</script>

<style lang="less"  scoped>
  /deep/ .board{
  &_fullscreen{
    background-color: #fff;
    &.isFullscreen{
      padding-left: 20px;
    }
 }
    /deep/ &_search{
    margin-top: 15px;
    /*background-color: #fff;*/
  }
}
  /deep/ .el-table .warning-row {
  /*background: oldlace;*/
  font-size: 20px;
  color: red;
  margin: 10px;
  background-color: #DBE621;
  font-weight: 500 ;
  animation: changeshadow 1s  ease-in  infinite ;
  /* 其它浏览器兼容性前缀 */
  -webkit-animation: changeshadow 1s linear infinite;
  -moz-animation: changeshadow 1s linear infinite;
  -ms-animation: changeshadow 1s linear infinite;
  -o-animation: changeshadow 1s linear infinite;
}
  /deep/ .el-table .commom-row {
  /*background: oldlace;*/
  font-size: 20px;
  color: white;
  margin: 10px;
  background-color: #82848a;

}


  /deep/ .el-table .success-row {
  background: #f0f9eb;
}

  /deep/ .el-table th,tr {
  background-color: dodgerblue;
  color: white;
  font-size: 20px;
}
@keyframes changeshadow {
  0%{ text-shadow: 0 0 4px #4cc134}
  50%{ text-shadow: 0 0 40px #f6ff37}
  100%{ text-shadow: 0 0 4px #c18b0c
  }
}
/* 添加兼容性前缀 */
@-webkit-keyframes changeshadow {
  0%{ text-shadow: 0 0 4px #ffffff}
  50%{ text-shadow: 0 0 40px #ffffff}
  100%{ text-shadow: 0 0 4px #ffffff}
}
@-moz-keyframes changeshadow {
  0%{ text-shadow: 0 0 4px #ffffff}
  50%{ text-shadow: 0 0 40px #ffffff}
  100%{ text-shadow: 0 0 4px #ffffff}
}
@-ms-keyframes changeshadow {
  0%{ text-shadow: 0 0 4px #ffffff}
  50%{ text-shadow: 0 0 40px #ffffff}
  100%{ text-shadow: 0 0 4px #ffffff}
}
@-o-keyframes changeshadow {
  0%{ text-shadow: 0 0 4px #ffffff}
  50%{ text-shadow: 0 0 40px #ffffff}
  100%{ text-shadow: 0 0 4px #ffffff}
}
</style>
