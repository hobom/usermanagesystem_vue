<template>
    <el-button type="primary" @click="handleLogin">测试登录</el-button>
    <el-button type="success" @click="handleUserList">测试获取信息列表</el-button>
</template>

<script setup>
    import requestUtil from '@/utils/request'
    const handleLogin = async()=>{
        let result = await requestUtil.get("user/jwt_test")
        let data = result.data;
        if(data.code==200){
            const token = data.token
            console.log("登录成功，token="+token)
            window.sessionStorage.setItem("token",token)
        }else {
            console.log("登录失败")
        }
    }

    const handleUserList = async()=>{
        let result = await requestUtil.get("user/test")
        let data = result.data;
        if(data.code==200){
            let userList = data.data
            console.log("获取信息列表成功, userList = "+userList)
        }else {
            console.log("获取信息列表失败")
        }
    }
</script>

<style scoped>
.button-example {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
}

.button-row > * {
    margin: 0;
}
</style>
