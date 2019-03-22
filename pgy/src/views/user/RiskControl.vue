<template>
    <div>
        <div class="risk-controller">
            <Button @click="add(1)">风控信息</Button>
            <Button @click="add(2)">短信</Button>
            <Button @click="add(3)">运营商</Button>
            <Button @click="add(4)">电商</Button>
            <Button @click="add(5)">qq</Button>
        </div>
        <div class="content">
            {{msg}}
        </div>
    </div>
</template>

<script>
export default {
    name:'riskControl',
    data(){
        return {
            msg:'',
        }
    },
    methods:{
        add(val){
            switch(val){
                case 1:
                    this.msg = '这是一个风控信息报告';
                    break;
                case 2:
                    this.msg = '这是一个短信信息报告';
                    break;
                case 3:
                    this.msg = '这是一个运营商信息报告';
                    break;
                case 4:
                    this.msg = '这是一个电商信息报告';
                    break;
                case 5:
                    this.msg = '这是一个QQ信息报告';
                    break;
                default:
                    this.msg = '这是一个默认页面';
            }
                
            
        }
    }
}
</script>

<style scoped>
 .risk-controller{
     width: 100%;
     display: flex;
     justify-content:space-around;
 }
 .content{
     width: 100%;
     height: 100%;
     display: flex;
     flex-flow: column;
     align-items:center;
     justify-content: center;
     font-size: 30px;
 }
</style>

