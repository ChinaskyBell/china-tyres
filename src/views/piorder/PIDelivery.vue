<script setup>
// import { ref } from "vue"
import PIItem from "./components/PIItem.vue"

const tableData = [
  {
    name: "Tom"
  },
  {
    name: "Tom"
  },
  {
    name: "Tom"
  },
  {
    name: "Tom"
  }
]
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <div class="m-b">
        <el-text tag="b" size="large">PI基本信息</el-text>
      </div>
      <PIItem />
    </el-card>

    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">核對信息</el-text>
          <el-button type="primary" @click="connectUpdate">完成發貨計劃</el-button>
        </div>
      </div>
      <div class="mb">
        <div class="flex justify-between items-center">
          <div>
            <el-input v-model="keyword" placeholder="請輸入產品名稱" style="width: 250px" class="pr" />
            <el-button type="primary" :icon="Search">查詢</el-button>
          </div>
          <div class="line-height-5">
            <div><el-text>PI發貨數量：</el-text><el-text type="danger">100 </el-text></div>
            <div><el-text>計劃發貨數量：</el-text><el-text type="primary">100 </el-text></div>
          </div>
        </div>
      </div>
      <el-table ref="tableRef" :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="序號" />
        <el-table-column prop="name" label="產品名稱" align="center" />
        <el-table-column prop="name" label="未發貨數" align="center" />
        <el-table-column prop="name" label="發貨數量" align="center">
          <template #default="scope">
            {{ scope.row.name }}
            <EditPen @click="handleUpdate(scope.row)" class="w4 h4 cursor-pointer hover:c-blue" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped></style>
