<template>
  <div>
    <el-row style="padding-top: 10px ;padding-bottom: 10px">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteLists"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input
        placeholder="请输入别名"
        style="width: 100px"
        v-model="params.pageAliase"
        clearable>
      </el-input>
      <!--    <el-button>默认按钮</el-button>-->
      <el-button type="primary" size="small" @click="query">搜索</el-button>
      <router-link :to="{path:'/cms/page/add/',query: {
        page:this.params.page,
        siteId: this.params.siteId
      }}" >
        <el-button type="primary" size="small" >新增</el-button>
      </router-link>
      <!--   <el-button type="success">成功按钮</el-button>
         <el-button type="info">信息按钮</el-button>
         <el-button type="warning">警告按钮</el-button>
         <el-button type="danger">危险按钮</el-button>-->
    </el-row>
    <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="类型（静态、动态）" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180" :formatter="formatCreatetime">
      </el-table-column>
      <el-table-column label="编辑" width="80">
        <template slot-scope="scope">

          <el-button
            size="small" type="primary"
            @click="edit(scope.row.pageId)">编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="80">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="danger"
            @click="del(scope.row.pageId)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="静态化" width="80">
        <template slot-scope="scope">
          <el-button
            size="small" type="primary" plain @click="generateHtml(scope.row.pageId)">静态化
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="发布" width="80">
        <template slot-scope="scope">
          <el-button
            size="small" type="primary" plain @click="postPage(scope.row.pageId)">发布
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      @current-change="currentChange"
      layout="prev, pager, next"
      style="float: right ; padding-right: 190px ; padding-top: 10px"
      :page-size="params.size"
      :current-page="params.page"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
    import * as cmsApi from '../api/cms'

    export default {
        data() {
            return {
                list: [],
                total: 0,
                params: {
                    page: 1,
                    size: 10,
                    siteId : '',
                    pageAliase : ''

                },
                siteLists: [],
                value : ''
            }
        },
        methods: {
            query: function () {
                console.log("aaaa")
                cmsApi.page_list(this.params.page, this.params.size ,this.params).then(res => {
                    this.list = res.queryResult.list;
                    this.total = res.queryResult.total;
                })
            },
            currentChange: function (val) {
                this.params.page = val
                this.query()
                console.log(`当前页: ${val}`);
            },
            del: function (pageId) {
              this.$confirm('你确定要删除吗','提示',{}).then(()=>{
                  cmsApi.item_del(pageId).then((res)=>{
                    if(res.success){
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })
                        this.query() ;
                    }else {
                        this.$message({
                            type:'error',
                            message:'删除失败'
                        })
                    }
                  })
              })
            },
            edit: function (pageId) {
                this.$router.push({
                    path:'/cms/page/edit/'+pageId,
                    query:{
                        page:this.params.page,
                        siteId: this.params.siteId
                    }
                })
            },
            generateHtml:function (pageId) {
                window.open("http://localhost:3001/cms/preview/"+pageId)
            }
        },
        created() {
            this.params.page = Number.parseInt(this.$route.query.page||1)
            this.params.siteId = this.$route.query.siteId||''


            //取出路由中参数 赋值给自己得参数

        },
        mounted() {
            this.siteLists =  [ { siteId:'5a751fab6abb5044e0d19ea1', siteName:'亚马逊注册' },{ siteId:'102', siteName:'亚马逊其他' } ]
            this.query()

        }

    }
</script>

<style>


</style>
