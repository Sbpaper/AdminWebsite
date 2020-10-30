<template>
  <div class="layout-header">
    <div class="header">
      <div class="w">
        <div class="l"><div class="title">LOGO</div></div>
        <div class="r">
          <el-dropdown class="loginbar">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logoutbutton()"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from "@/utils/auth";
import router from "@/router";
export default {
  name: "Header",
  components: {},
  data() {
    return {};
  },
  watch: {},
  methods: {
    logoutbutton() {
      logout();
      router.push({ name: "login" });
    },
  },
};
</script>