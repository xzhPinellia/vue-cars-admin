<template>
    <el-dialog title="地图" :visible.sync="dialogVisible" class="cars-dialog-center" @close="close" :close-on-click-modal="false">
        111
    </el-dialog>
</template>
<script>
export default {
    name: "",
    props:{
        flagVisible:{
            type:Boolean,
            default:false
        }
    },
    data() {
      return {
        dialogVisible:false
      }
    },
    mounted(){
    },
    methods: {
       close(){
           this.$emit("update:flagVisible",false)
       }
    },
    watch:{
        flagVisible:{
            handler(newValue,oldValue){
                this.dialogVisible=newValue
            }
        }
    }
}
</script>
<style lass="scss" scoped>
</style>