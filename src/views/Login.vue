<template>
    <div className="login">

        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" className="login-form">
            <h3 className="title">Django后台管理系统</h3>
            <el-form-item prop="username">
                <el-input
                        v-model="loginForm.username"
                        type="text"
                        size="large"
                        auto-complete="off"
                        placeholder="账号"
                >
                    <template #prefix>
                        <svg-icon icon="user"/>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                        v-model="loginForm.password"
                        type="password"
                        size="large"
                        auto-complete="off"
                        placeholder="密码"
                >
                    <template #prefix>
                        <svg-icon icon="password"/>
                    </template>
                </el-input>
            </el-form-item>


            <el-checkbox style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button
                        size="large"
                        type="primary"
                        style="width:100%;"
                        @click.prevent="handleLogin"
                >
                    <span>登 录</span>
                </el-button>
            </el-form-item>
        </el-form>
        <!--  底部  -->
        <div className="el-login-footer">
            <span>Copyright © 2013-2025 <a href="http://www.python222.com"
                                           target="_blank">python222.com</a> 版权所有.</span>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import requestUtil from '@/utils/request'
import qs from 'qs'
import {ElMessage} from "element-plus";


const loginForm = ref({
    username: '',
    password: ''
})
const loginRules = ref({
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'}
    ]
})
const loginRef = ref(null)

const handleLogin = () => {
    loginRef.value.validate(async (valid) => {
        if (valid) {
            let result = await requestUtil.post("user/login?" + qs.stringify(loginForm.value))
            console.log("result=", result)
            let data = result.data;
            if (data.code == 200) {
                const token = data.token
                ElMessage.success(data.info)
                window.sessionStorage.setItem("token", token)
            } else {
                ElMessage.error(data.info)
            }
        } else {
            console.log('验证失败')
            return false
        }
    })
}

</script>

<style lang="scss" scoped>
a {
  color: white
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 40px;


    input {
      display: inline-block;
      height: 40px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }

}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
