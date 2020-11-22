<template>
  <div class="layout-header">
    <div class="header">
      <div class="w">
        <div class="l">
          <div class="logobox">
            <div class="logo">
              <img src="@/assets/image/logo2.png" />
            </div>
          </div>
          <div class="title">Sbpaper 后台管理中心</div>
        </div>

        <div class="r">
          <el-dropdown class="loginbar">
            <span class="el-dropdown-link">
              <span>欢迎你, <span v-if="userdata.UserJurisdiction == 1">管理员</span> {{ userdata.Username }} </span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logoutbutton()"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- <div class="r">
          <div class="username">
            <span>欢迎你, 管理员{{ userdata.Username }} </span>
          </div>
        </div> -->

        <div class="r">
          <div class="userhead">
            <img :src="userdata.Userhead" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { logout, getuser } from "@/utils/auth";
import router from "@/router";
export default {
  name: "Header",
  components: {},
  data() {
    return {
      userdata: null,
    };
  },
  watch: {},
  methods: {
    logoutbutton() {
      logout();
      router.push({ name: "login" });
    },
  },
  created() {
    this.userdata = getuser();
  },
};
</script>