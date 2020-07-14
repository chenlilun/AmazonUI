import Home from '@/module/home/page/home.vue';
import excep_list from '@/module/cms/page/excep_list.vue';
import page_list from '@/module/cms/page/page_list.vue';
import add_list from '@/module/cms/page/page_add.vue';
import edit_list from '@/module/cms/page/page_edit.vue';
import file_list from '@/module/cms/page/file_list.vue';
export default [{
    path: '/',
    component: Home,
    name: '报表',
    hidden: false,
    children:[
      {path:'/cms/page/list',name:'页面列表',component: page_list,hidden:false},
      {path:'/cms/page/excepList',name:'外观异常报表',component: excep_list,hidden:true},
      {path:'/cms/page/add',name:'新增列表',component: add_list,hidden:true},
      {path:'/cms/page/edit/:pageId',name:'编辑列表',component: edit_list,hidden:true},
      {path:'/cms/page/fileList',name:'文件列表',component: file_list,hidden:false},
    ]
    // ,
    // redirect: '/home',
    // children: [
    //   {path: 'home', component: Home}
    // ]
  }/*,
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }*/
]
