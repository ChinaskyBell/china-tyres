<script setup>
import { useUserStore } from "@/store/modules/user"

const { userinfo } = useUserStore()
// const isAdmin = userStore.roles.includes("admin")
</script>

<template>
  <div class="app-container">
    <el-card>
      <el-descriptions title="個人信息" direction="vertical" :column="4" size="large" border>
        <el-descriptions-item label="用戶名">{{ userinfo.username }}</el-descriptions-item>
        <el-descriptions-item label="電郵">{{ userinfo.email }}</el-descriptions-item>
        <el-descriptions-item label="電話">{{ userinfo.phone }}</el-descriptions-item>
        <el-descriptions-item label="部門">{{ userinfo.account }}</el-descriptions-item>
        <el-descriptions-item label="性別">
          <el-tag size="small">{{ userinfo.sex }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="備註">{{ userinfo.remarks }} </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>
