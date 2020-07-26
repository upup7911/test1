<template>
  <div>
    <!-- 导航 -->
    <div id="nav" class="container">
      <!-- logo -->
      <img src="../assets/imgs/logo.png" alt />
      <!-- 标签页 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item v-for="item in list" :key="item.id" :index="item.hash">{{item.value}}</el-menu-item>
      </el-menu>
      <!-- 搜索 -->
      <div class="nav_search_box">
        <input type="text" class="nav_input_box" placeholder="请输入用户名、ID" />
        <img src="../assets/imgs/search.svg" alt />
      </div>
      <div class="nav_right">
        <!-- 下载 -->
        <div class="nav_down">
          <i class="el-icon-download"></i>
          <p>
            <a href="JavaScript:;">下载</a>
          </p>
        </div>

        <!-- 登录/注册/充值 -->
        <button class="nav_login_register" @click="dialogVisible = true">登录/注册</button>

        <button class="nav_recharge">立即充值</button>

        <!-- 登录注册框 -->
        <el-dialog :visible.sync="dialogVisible" width="25%" :before-close="handleClose" >
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="登录" name="first">
              <el-form
                :model="ruleForm2"
                status-icon
                :rules="rules2"
                ref="ruleForm2"
                label-width="0"
                class="demo-ruleForm"
              >
                <el-form-item prop="tel">
                  <el-input
                    v-model="ruleForm2.tel"
                    auto-complete="off"
                    :style="width"
                    placeholder="请输入手机号"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="smscode" class="code">
                  <el-input v-model="ruleForm2.smscode" style="width:30%" placeholder="验证码"></el-input>
                  <el-button class="sendCode" :disabled="isDisabled" @click="sendCode">{{buttonText}}</el-button>
                </el-form-item>
                <el-form-item prop="pass">
                  <el-input
                    type="password"
                    v-model="ruleForm2.pass"
                    auto-complete="off"
                    placeholder="输入密码"
                    :style="width"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <el-input
                    type="password"
                    v-model="ruleForm2.checkPass"
                    auto-complete="off"
                    placeholder="确认密码"
                    :style="width"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="rej" @click="submitForm('ruleForm2')" style="width:50%;">注册</el-button>
                  <p class="login" @click="gotoLogin">已有账号？立即登录</p>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>

    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // <!--验证手机号是否合法-->
    let checkTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!this.checkMobile(value)) {
        callback(new Error("手机号码不合法"));
      } else {
        callback();
      }
    };
    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机验证码"));
      } else {
        callback();
      }
    };
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      list: [
        { id: 1, value: "直播", hash: "/" },
        { id: 2, value: "动态", hash: "/Dynamic" },
        { id: 3, value: "啪啪", hash: "/Brian" },
        { id: 4, value: "约会", hash: "/Data" },
      ], //导航
      activeIndex: "/", //激活导航
      activeName: "first",
      dialogVisible: false, //打开登录注册框

      //   注册
      width:'width:70%',
      ruleForm2: {
        pass: "",
        checkPass: "",
        tel: "",
        smscode: "",
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        tel: [{ validator: checkTel, trigger: "change" }],
        smscode: [{ validator: checkSmscode, trigger: "change" }],
      },
      buttonText: "发送验证码",
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true,
    };
  },
  watch: {
    // 监听路由变化
    $route(to) {
      // 监听路由的变化  如果路由发生改变则当前tab栏默认值也相应改变
      this.activeIndex = to.path;
    },
  },
  methods: {
    //   激活导航栏
    handleSelect(key) {
      //   console.log(key, keyPath);
      this.activeIndex = key;
    },
    // 登录注册
    handleClose() {
      this.dialogVisible = false;
    },

    // 注册
    sendCode() {
      let tel = this.ruleForm2.tel;
      if (this.checkMobile(tel)) {
        console.log(tel);
        let time = 60;
        this.buttonText = "已发送";
        this.isDisabled = true;
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + " 秒";
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = "重新获取";
              this.isDisabled = false;
              this.flag = true;
            }
          }, 1000);
        }
      }
    },
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setTimeout(() => {
            alert("注册成功");
          }, 400);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    // 验证手机号
    checkMobile(str) {
      let re = /^1\d{10}$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
// 导航
#nav {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // 标签页样式
  .el-menu.el-menu--horizontal {
    border: none;
    .el-menu-item {
      position: relative;
      transition: none;
    }
    .el-menu-item.is-active {
      font-weight: bold;
      border-bottom: none;
      //   在激活导航后添加样式
      &::after {
        content: "";
        position: absolute;
        bottom: 15px;
        left: 30px;
        width: 8px;
        height: 4px;
        background: linear-gradient(
          270deg,
          rgba(199, 6, 255, 1) 0%,
          rgba(112, 0, 252, 1) 100%
        );
        border-radius: 2px;
      }
    }
  }
  //   搜索框盒子
  .nav_search_box {
    position: relative;
    display: flex;
    align-items: center;
    .nav_input_box {
      outline: medium;
      width: 265px;
      height: 36px;
      background: rgba(238, 238, 238, 0.6);
      border-radius: 18px;
      border: none;
      text-indent: 20px;
      &:focus {
        box-shadow: 0 0 5px rgba(112, 0, 252, 1);
      }
    }
    ::placeholder {
      color: #ccc;
    }
    img {
      position: absolute;
      right: 15px;
      width: 30px;
      height: 30px;
    }
  }
  //   右边部分
  .nav_right {
    display: flex;
    margin-left: 150px;
    //   下载
    .nav_down {
      text-align: center;
    }
    // <!-- 登录/注册/充值 -->
    button {
      width: 108px;
      height: 36px;
      border-radius: 18px;
      outline: none;
      cursor: pointer;
      margin-left: 20px;
    }
    .nav_login_register {
      border: none;
      background-color: #fff;
      cursor: pointer;
      line-height: 1.8;
      /*   border: 5px solid transparent; */
      box-sizing: border-box;
      background-image: linear-gradient(#fff, #fff),
        linear-gradient(90deg, rgba(106, 58, 147, 1), rgba(232, 63, 111, 1));
      padding: 2px;
      border-radius: 100px;
      background-clip: content-box, padding-box;
      transition: filter 0.5s ease;
    }
    .nav_recharge {
      border: none;
      background: linear-gradient(
        90deg,
        rgba(106, 58, 147, 1) 0%,
        rgba(232, 63, 111, 1) 100%
      );
    }
    .demo-ruleForm{
        padding: 10px 20px;
        text-align: center !important;
    }
    .rej{
        margin: 0;
    }
    .el-form-item{
        margin: 10px;
    }
    .sendCode{
        width: 90px;
        height: 36px;
        border-radius: 18px;
      border: none;
      background-color: #fff;
      cursor: pointer;
      line-height: 1.8;
      /*   border: 5px solid transparent; */
      box-sizing: border-box;
      background-image: linear-gradient(#fff, #fff),
        linear-gradient(90deg, rgba(106, 58, 147, 1), rgba(232, 63, 111, 1));
      padding: 2px;
      border-radius: 100px;
      background-clip: content-box, padding-box;
      transition: filter 0.5s ease;
    }
  }
}
</style>