<template>
  <div class="container" :class="{ is_dynamic: (tShapeStatus === '动态'), is_static: (tShapeStatus !== '动态') }">
    <header class="page-header">
      <div><h1>T形件全过程曲线计算器</h1></div>
      <div class="status-switch">
        <el-radio-group v-model="tShapeStatus" size="large">
          <el-radio-button label="静态" value="静态"/>
          <el-radio-button label="动态" value="动态"/>
        </el-radio-group>
      </div>
    </header>
    <div class="current-status">当前状态： <span>{{ tShapeStatus }}</span></div>


    <div class="content">


      <div class="input-section">
        <h2>输入参数</h2>

        <!-- 翼缘材料参数 -->
        <div class="parameter-group">
          <div class="input-group-head">
            <div class="h-item h-left"><h3>翼缘材料</h3></div>
            <div class="h-item h-right"><img src="./images/flange.svg"/></div>
          </div>

          <div class="input-row">
            <div class="form-group">
              <label for="E">弹性模量 E (MPa)</label>
              <input type="number" id="E" step="1000" value="210000">
            </div>
            <div class="form-group">
              <label for="fy">屈服强度 fy (MPa)</label>
              <input type="number" id="fy" step="1" value="410">
            </div>
          </div>

          <div class="input-row">
            <div class="form-group">
              <label for="Eh">强化模量 Eh (MPa)</label>
              <input type="number" id="Eh" step="100" value="2700">
            </div>
            <div class="form-group">
              <label for="Enk">颈缩强化 Enk (MPa)</label>
              <input type="number" id="Enk" step="10" value="150">
            </div>
          </div>

          <div class="input-row">
            <div class="form-group">
              <label for="epsilon_h">强化应变 εh</label>
              <input type="number" id="epsilon_h" step="0.0001" value="0.015263">
            </div>
            <div class="form-group">
              <label for="epsilon_m">峰值应变 εm</label>
              <input type="number" id="epsilon_m" step="0.001" value="0.137">
            </div>
          </div>

          <div class="input-row">
            <div class="form-group">
              <label for="epsilon_u">断裂应变 εu</label>
              <input type="number" id="epsilon_u" step="0.01" value="1">
            </div>
          </div>


          <div class="dynamic-paras" v-if="tShapeStatus === '动态'">
            <!-- 率强化参数 -->
            <div class="input-row"><label>C-S率相关本构模型参数</label></div>
            <div class="input-row">
              <div class="form-group label-inline ">
                <label for="D_flange">D</label>
                <input type="number" id="D_flange" step="1" value="4945">
              </div>
              <div class="form-group label-inline ">
                <label for="p_flange"> p</label>
                <input type="number" id="p_flange" step="0.1" value="2.7">
              </div>
            </div>
          </div>


        </div>

        <!-- 几何尺寸参数 -->
        <div class="parameter-group">

          <div class="input-group-head">
            <div class="h-item h-left"><h3>几何尺寸</h3></div>
            <div class="h-item h-right">
<!--              <img src="./images/t-stub.svg"/>-->
              <el-popover placement="right" width="300"  trigger="click">
                <template #reference>
                  <img src="./images/t-stub.svg" alt=""/>
                </template>
                <template #default>
                  <div class="t-stub-desc-popover">

                    <ul style="margin: 0 0 0 1rem;">
                      <li>(0.8 * tf)： 焊脚尺寸, 厚度的0.8倍</li>
                      <li>翼缘厚度（tf） 等于 腹板厚度（webTf）</li>
                      <li>bf = 2(m+n+0.8tf) + webTf , 即：</li>
                      <li>bf = 2(m+n+0.8tf) + tf</li>
                    </ul>
                  </div>
                </template>
              </el-popover>
            </div>
          </div>

          <div class="form-group">
            <label for="boltDiameter">螺栓有效直径<!--螺栓直径--> (mm)</label>
            <input type="number" id="boltDiameter" step="0.1" value="6.82725">
          </div>

          <div class="input-row">
            <div class="form-group">
              <!--<label for="m">m (mm)</label>
              <input type="number" id="m" step="0.1" value="42.2">-->
              <label for="m">bf (mm)</label>
              <input type="number" id="bf" step="1" value="180">
            </div>
            <div class="form-group">
              <label for="n">n (mm)</label>
              <input type="number" id="n" step="0.1" value="40">
            </div>
          </div>

          <div class="input-row">
            <div class="form-group">
              <label for="tf">翼缘厚度 tf (mm)</label>
              <input type="number" id="tf" step="0.1" value="6">
            </div>
            <div class="form-group">
              <label for="lf">有效宽度 lf (mm)</label>
              <input type="number" id="lf" step="0.1" value="80">
            </div>
          </div>


          <div class="input-row">
            <div class="form-group">
              <label for="boltLength">螺栓计算长度 LB (mm)</label>
              <input type="number" id="boltLength" step="0.1" value="20.5">
            </div>
            <div class="form-group">
              <label for="boltHeadDiameter">螺栓头直径 ⌀ (mm)</label>
              <input type="number" id="boltHeadDiameter" step="0.1" value="13">
            </div>
          </div>

          <div class="input-row">
            <div class="form-group">
              <label for="washerDiameter">垫片直径 ⌀ (mm)</label>
              <input type="number" id="washerDiameter" step="0.1" value="15">
            </div>

            <div class="form-group">
              <label for="washerThick">垫片厚度 H (mm)</label>
              <input type="number" id="washerThick" step="0.1" value="1.5">
            </div>
          </div>

          <div v-if="tShapeStatus === '动态'" class="input-row dynamic-paras">
            <div class="form-group">
              <label for="loadSpeed">加载速率 v (mm/s)</label>
              <input type="number" id="loadSpeed" step="1" value="0">
            </div>
          </div>


        </div>

        <!-- 螺栓参数 -->
        <div class="parameter-group">

          <div class="input-group-head">
            <div class="h-item h-left"><h3>螺栓材料</h3></div>
            <div class="h-item h-right"><img src="./images/bolt.svg"/></div>
          </div>

          <div class="input-row">
            <div class="form-group">
              <label for="boltLength">屈服应变</label>
              <input type="number" id="boltQuFuEpsilon" step="0.1" value="0.0032">
            </div>
            <div class="form-group">
              <label for="boltHeadDiameter">峰值应变</label>
              <input type="number" id="boltFengZhiEpsilon" step="0.1" value="0.0632">
            </div>
            <div class="form-group">
              <label for="boltHeadDiameter">断裂应变</label>
              <input type="number" id="boltDuanLieEpsilon" step="0.1" value="0.141">
            </div>
          </div>
          <div class="input-row">
            <div class="form-group">
              <label for="boltLength">屈服强度</label>
              <input type="number" id="boltQuFuForce" step="1" value="650">
            </div>
            <div class="form-group">
              <label for="boltHeadDiameter">峰值强度</label>
              <input type="number" id="boltFengZhiForce" step="1" value="930">
            </div>
            <div class="form-group">
              <label for="boltHeadDiameter">断裂强度</label>
              <input type="number" id="boltDuanLieForce" step="1" value="750">
            </div>
          </div>

          <div  class="dynamic-paras" v-if="tShapeStatus === '动态'">
            <!-- 率强化参数 -->
            <div class="input-row"><label>C-S率相关本构模型参数</label></div>
            <div class="input-row">
              <div class="form-group label-inline ">
                <label for="D_bolt">D</label>
                <input type="number" id="D_bolt" step="1000" value="1300000">
              </div>
              <div class="form-group label-inline ">
                <label for="p_bolt">p</label>
                <input type="number" id="p_bolt" step="0.1" value="3.6">
              </div>
            </div>
          </div>

        </div>




        <button class="btn" @click="startCalculate">计算并生成曲线</button>
      </div>


      <div class="output-section">
        <h2>计算结果</h2>
        <div class="failure-mode">
          <h3>
            失效模式
            <div id="failureModeResult">等待计算...</div>
          </h3>

        </div>

        <div class="chart-container" id="chart" ref="chartRef"></div>

        <div class="results">
          <h3>关键数据点</h3>
          <div id="pointsResult">等待计算...</div>
        </div>
      </div>
    </div>
  </div>

</template>


<script setup lang="ts">
// @ts-ignore
import TCalculator from '@/views/t-model/js/t-model.js';
import {ref, onMounted, onUnmounted} from 'vue';
import * as echarts from 'echarts';


const tCalculator = TCalculator();
const chartRef = ref(null);
let chartInstance: any = null;

// 当前是静态的计算还是动态计算
const tShapeStatus = ref('静态'); // dynamic

onMounted(() => {
  // 确保 DOM 已经渲染
  if (chartRef.value) {
    initChart()
  }

  window.addEventListener('resize', () => chartInstance?.resize());

});

onUnmounted(() => {
  // 组件卸载时销毁图表实例
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
});


const initChart = () => {
  // 初始化图表
  chartInstance = echarts.init(chartRef.value)

  // 设置配置项
  chartInstance.setOption(tCalculator.echartsInitOptions())
};


const startCalculate = () => {
  tCalculator.startCalculation(chartInstance);
};

</script>

<style scoped lang="scss">
@use './css/styles.scss';


.dynamic-paras {
  label {
    color: chocolate;
  }
}

.page-header {
  position: relative;

  .status-switch {
    position: absolute;
    top: 2rem;
    right: 3rem;
  }
}

.current-status {
  text-align: right;
  padding: 1rem 3rem 0 0;

  span {
    font-weight: bold;
  }
}


.label-inline {
  display: flex;
  align-items: center;
  label {
    margin-bottom: 0 ;
    margin-right: 0.5rem ;
  }
}

:deep(.status-switch) {
  .el-radio-button__inner {
    background-color: transparent;
    color: #ffffff;
  }

  .is-active {
    .el-radio-button__inner {
      background-color: #D9D9D9 !important;
      color: #000000 !important;
      font-weight: bold;
    }
  }
}
</style>