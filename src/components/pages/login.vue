<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
          v-model="userName"
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          required
          @click-icon="userName = ''"
          :error-message="usernameErrorMsg"
      />
      <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          @click-icon="password = ''"
          :error-message="passwordErrorMsg"
      />
    </div>
    <div class="register-button">
        <van-button type="primary" size="large" @click="loginAction" :loading="openloading">登陆</van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      userName: "",
      password: "",
      openloading: false, //是否开启用户注册的loading状态
      usernameErrorMsg: "", //当用户名出现错误时的提示信息
      passwordErrorMsg: "" //当密码出现错误的时候
    };
  },
  created() {
    if (localStorage.userInfo) {
      Toast.success("您已经登陆过了！");
      this.$router.push("/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 表单验证方法
    checkForm() {
      let isOk = true;
      if (this.userName.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
    loginAction() {
      // 优化前
      // if(this.checkForm()){
      //   this.axiosRegisterUser()
      // }
      // 优化后
      this.checkForm() && this.axiosLoginUser();
    },
    axiosLoginUser() {
      this.openloading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.userName,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.userName };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登陆成功");
                this.$router.push("/");
              })
              .catch(err => {
                console.log(err);
                Toast.fail("登录状态保存失败");
              });
          } else {
            Toast.fail("登录失败");
            this.openloading = false;
          }
        })
        .catch(err => {
          Toast.fail("登录失败");
          this.openloading = false;
        });
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  /* padding-bottom: 50px; */
}
.register-button {
  padding-top: 10px;
}
</style>
