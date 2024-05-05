<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBorrowingStore } from '@/stores/BorrowingStore'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()

const chartOptions = ref({
  chart: {
    id: 'user-activity-chart',
    toolbar: {
      show: true
    }
  },
  xaxis: {
    type: 'datetime',
    title: {
      text: 'Fecha'
    }
  },
  yaxis: {
    title: {
      text: 'Cantidad'
    }
  }
})

type ChartDataPoint = {
  x: string | number | Date
  y: number
}

const chartSeries = ref([
  {
    name: 'Prestamos',
    data: [] as ChartDataPoint[]
  }
])

const borrowingStore = useBorrowingStore()

onMounted(async () => {
  if (typeof authStore.userIdLoged === 'number') {
    await borrowingStore.fetchUserBorrowings(authStore.userIdLoged)
    updateChartData()
  } else {
    console.error('userId es undefined')
  }
})

function updateChartData() {
  const countsByDate: Record<string, number> = {}

  borrowingStore.userBorrowings.forEach((borrowing) => {
    const date = new Date(borrowing.borrowingDate)
    const dateStr = date.toISOString().split('T')[0]
    if (!countsByDate[dateStr]) {
      countsByDate[dateStr] = 0
    }
    countsByDate[dateStr]++
  })

  const activityData: ChartDataPoint[] = Object.entries(countsByDate).map(([date, count]) => {
    return {
      x: new Date(date).getTime(),
      y: count
    }
  })

  activityData.sort((a, b) => (a.x as number) - (b.x as number))

  chartSeries.value[0].data = activityData
}
</script>

<template>
  <div class="chart-container">
    <apexchart type="line" :options="chartOptions" :series="chartSeries"></apexchart>
  </div>
</template>

<style scoped>
.chart-container {
  max-width: 400px;
  margin: auto;
}
</style>
