<template>
    <div class="amap-wrap">
        <div>
            <el-row>
                <el-col :span="18">
                    <el-form :inline="true" :model="form" class="demo-form-inline">
                        <el-form-item label="区域">
                            <CityArea ref="cityArea"  :cityAreaValue.sync="form.area" @callback="callbackComponent" />
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="form.type" placeholder="停车场" class="width-120">
                                <el-option v-for="item in type" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="禁启用">
                            <el-select v-model="form.status" placeholder="请选择" class="width-120">
                                <el-option v-for="item in status" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="关键字">
                            <el-select v-model="search_key" placeholder="请选择" @change="searchKeySelect" class="width-120">
                            <el-option label="停车场名称" value="parkingName"></el-option>
                            <el-option label="详细区域" value="address"></el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item>
                            <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="search">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                 <el-col :span="6">
                     <div class="pull-right">
                         <router-link to="/parkingAdd">
                             <el-button type="danger">新增停车场</el-button>
                         </router-link>
                     </div>
                 </el-col>
            </el-row>
            
        </div>
        <div>
             <el-table :data="tableData" border style="width: 100%">
                  <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="parkingName" label="停车场名称"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column prop="type" label="区域"></el-table-column>
                <el-table-column prop="carsNumber" label="可停放车辆"></el-table-column>
                <el-table-column prop="status" label="禁启用">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status" inactive-value="1" active-value="2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="查看位置">
                     <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="showMap(scope.row)">查看地图</el-button>
                    </template>
                </el-table-column>
                <el-table-column  label="操作">
                     <template slot-scope="scope">
                        <el-button size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-m pull-right">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.total">
                </el-pagination>
            </div>
        </div>
        <MapLocation :flagVisible.sync="map_show" />
    </div>
</template>
<script>
// 组件
import CityArea from "@c/common/cityArea";
import MapLocation from "@c/dialog/showMapLocation";
// API
import {ParkingList} from "@/api/parking"
export default {
    name: "Parking",
    components:{CityArea,MapLocation},
    data(){
        return {
          pageSize:10,
          pageNumber:1,
          currentPage:1,//当前页
          total:0,//数据总数
          area:"",
          search_key:"",//搜索key
          keyword:"",
          status: this.$store.state.config.parking_status,//停车场状态
          type: this.$store.state.config.parking_type,//类型
          form:{
              area:"",
              type:"",
              status:"",
          },
        //列表数据
        tableData:[],
        //地图显示
        map_show:false
      }
    },
    beforeMount(){
        this.parkList();
    },
    mounted(){
        
    },
    methods: {
        
        //处理回调
        callbackComponent(params){
            if(params.function) { this[params.function](params.data);  }
        },
        // 停车场列表
        parkList(){
            const requestData={
                pageSize:this.pageSize,
                pageNumber:this.pageNumber,
             }
             //过滤数据
             const filterData= JSON.parse(JSON.stringify(this.form))
             for(let key in filterData){
                 if(filterData[key]){
                     requestData[key]=filterData[key]
                 }
             }
             //关键字
             if(this.keyword && this.search_key){
                  requestData[this.search_key]=this.keyword;
             }
            ParkingList(requestData).then(response => {
               console.log(response);
                const data=response.data;
               //判断数据真实存在
                if(data){
                    this.tableData=data.data
                }
                this.total=data.total
            }).catch(error => {
               
            })
        },
        // 关键字选择
        searchKeySelect(val){ },
        //显示地图
        showMap(data){
            this.map_show=true;
        },
        //分页
        handleSizeChange(val) {
            this.pageSize=val;
            this.parkList();
        },
        handleCurrentChange(val) {
            this.pageNumber=val;
            this.parkList();
        },
        // 搜索
        search(){
            this.parkList();
        }
    }
}
</script>
<style lang="scss">
.page-m{
    margin-top: 20px;
}
.el-table .cell {
    text-overflow: clip;
}
</style>