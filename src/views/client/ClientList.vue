<script setup>
import { reactive, ref, watch } from "vue"
import { getClientListApi, deleteClientListApi } from "@/api/users"
import { ElMessage, ElMessageBox, ElButton } from "element-plus"
import { Search, CirclePlus, Refresh } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useRouter } from "vue-router"

defineOptions({
  name: "ClientList"
})

const loading = ref(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 删
const handleDelete = (row) => {
  ElMessageBox.confirm(`正在刪除用戶 ${row.client_name}，確認刪除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      deleteClientListApi(row.id).then(() => {
        ElMessage.success("刪除成功")
        getTableData()
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消"
      })
    })
}
//#endregion

//#region 查
const tableData = ref([])
const searchFormRef = ref(null)
const searchData = reactive({
  keyword: "",
  payment_terms: "",
  user_id: ""
})
const getTableData = () => {
  loading.value = true
  getClientListApi({
    page: paginationData.currentPage,
    page_size: paginationData.pageSize,
    keyword: searchData.keyword || undefined,
    payment_terms: searchData.payment_terms || undefined,
    user_id: searchData.user_id || undefined
  })
    .then(({ data }) => {
      paginationData.total = data.total
      tableData.value = data.data
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}
//#endregion

// 重置
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })

const router = useRouter()
// 改
const handleUpdate = (row) => {
  router.push({
    path: "/client/clientitem",
    query: {
      id: row.id
    }
  })
}
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="searchData.keyword" placeholder="請輸入客戶名稱、所屬員工、電話" style="width: 300px" />
        </el-form-item>
        <el-form-item prop="state" label="付款條件">
          <el-select v-model="searchData.payment_terms" style="width: 150px">
            <el-option label="全部" value="" />
            <el-option label="付款条件A" value="付款条件A" />
            <el-option label="付款条件B" value="付款条件B" />
          </el-select>
        </el-form-item>
        <el-form-item prop="department" label="所屬員工">
          <el-select v-model="searchData.user_id" style="width: 100px">
            <el-option label="全部" value="" />
            <el-option label="員工1" :value="1" />
            <el-option label="員工2" :value="2" />
            <el-option label="員工3" :value="3" />
            <el-option label="員工4" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查詢</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus">新增客戶</el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table ref="tableRef" :data="tableData">
          <el-table-column prop="client_name" label="客戶名稱" align="center" />
          <el-table-column prop="username" label="聯絡人" align="center" />
          <el-table-column prop="user_id" label="所屬員工" align="center" />
          <el-table-column prop="address" width="150" :show-overflow-tooltip="true" label="地址" align="center" />
          <el-table-column prop="phone" label="電話" align="center" />
          <el-table-column prop="email" label="Email" align="center" />
          <el-table-column prop="payment_terms" label="付款條件" align="center" />
          <el-table-column prop="credit" label="信用額度" align="center" />
          <el-table-column prop="advance_payment" label="預付款" align="center" />
          <el-table-column prop="created_at" label="创建时间" align="center" sortable />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
