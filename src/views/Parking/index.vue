<template>
    <div class="amap-wrap">
        <div>
            <el-row>
                <el-col :span="18">
                    <el-form :inline="true" :model="form" class="demo-form-inline">
                        <el-form-item label="审批人">
                            <el-input v-model="form.parking_name" placeholder="审批人"></el-input>
                        </el-form-item>
                        <el-form-item label="区域">
                        <el-cascader
                                v-model="area"
                                :options="options"
                                :props="{ expandTrigger: 'hover' }"
                                >
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="form.type" placeholder="活动区域">
                            <el-option label="室内" value="shanghai"></el-option>
                            <el-option label="室外" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="onSubmit">搜索</el-button>
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
                <el-table-column prop="disable" label="禁启用">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.disable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="查看位置"></el-table-column>
                <el-table-column  label="操作">
                     <template slot-scope="scope">
                        <el-button size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-m pull-right">
                <el-pagination
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

    </div>
</template>
<script>
// API
import {ParkingList} from "@/api/parking"
export default {
    name: "Parking",
    data(){
        return {
          pageSize:10,
          pageNumber:1,
          currentPage:1,
          total:0,//数据总数
          area:"",
          form:{
              parking_name:"",
              area:"",
              type:"",
             
          },
          options: [
              {
                value: '111',
                label: '广东省',
                children: [
                    {
                        value: '111',
                        label: '深圳市',
                    }, {
                        value: '111',
                        label: '广州市',
                    }
                ]
            }, {
                value: '222',
                label: '广西省',
                children: [
                    {
                        value: '222',
                        label: '南宁市',
                    }, {
                        value: '111',
                        label: '广州市',
                    }
                ]
            }
        ],
        tableData:[],
    }
    },
    mounted(){
        this.parkList();
    },
    methods: {
        // 停车场列表
        parkList(){
            let requestData={
                pageSize:this.pageSize,
                pageNumber:this.pageNumber,
             }
            ParkingList(requestData).then(response => {
               console.log(response)
               let data=response.data.data;
               this.tableData=data
               this.total=response.data.total
            }).catch(error => {
               
            })
        },
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // 搜索
        onSubmit(){

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