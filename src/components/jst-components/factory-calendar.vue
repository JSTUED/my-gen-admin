<template>
    <div class="components-factory-calendar">
        <div>
            <el-date-picker
                    v-model="yMonth"
                    type="month"
                    :editable="false"
                    format="yyyy-MM"
                    value-format="yyyy-MM"
                    @change="changeYMonth"
                    :clearable="false"
                    placeholder="请选择年/月">
            </el-date-picker>
        </div>
        <div class="factory-calendar">
            <div class="factory-calendar-wrap">
                <div class="factory-left">
                    <!--is-expanded-->
                    <v-calendar
                            class="custom-calendar"
                            :masks="{weekdays: 'WWWW'}"
                            ref="vCalendar"
                    >
                        <template v-slot:header="page">
                            <div></div>
                        </template>
                        <template v-slot:header-left-button>
                            <div></div>
                        </template>
                        <template v-slot:header-right-button>
                            <div></div>
                        </template>
                        <template v-slot:day-content="{ day }">
                            <div class="per-day" @click="selectDay(day)" :class="{
                                    'day-active': new Date(day.id).getTime() == new Date(current.date).getTime(),
                                    'day-selected': includeDate(day.id)
                                }">
                                <span class="text-day" :class="{'text-orange': day.weekday==1 || day.weekday==7}">{{day.day}}</span>
                                <span v-if="includeDate(day.id)" class="rest">{{ includeDate(day.id).type=='normal' ? '休': '国假' }}</span>
                            </div>
                        </template>
                    </v-calendar>
                </div>
                <div class="factory-right">
                    <div class="right-wrap">
                        <div class="week-time">
                            {{formatTime}}
                        </div>
                        <div class="select-day">
                            <span>{{formatDay}}</span>
                        </div>
                        <div class="operate-btn">
                            <el-button v-if="operateType=='set'" @click="setSelectDay('normal')">设置为休息日</el-button>
                            <el-button v-if="operateType=='set'" @click="setSelectDay('native')">设置为国假</el-button>
                            <el-button v-if="operateType=='cancel'" @click="cancelSelectDay">取消休息日/国假</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /*
    * 工厂日历说明
    * 方法：includeDate 判断日期有没有被设置 没有设置返回null 设置返回设置的值{ date: '2019-08-28', type: 'normal' }
    *       setSelectDay 设置当前日期 国家、休息日 setSelectDay('native') 确保当前日期有值
    *       cancelSelectDay 取消当前的日期设置
    *       setVal 设置当前日历日期的值 传入数组 格式 [{ date: '2019-08-28', type: 'normal' }]
    *       getVal 获取当前日历的值
    *       setCurrentDay 设置当前操作的日期 '2019-08-28'
    *       getCurrentDay 获取当前操作的日期
    *       getCalendar 获取组件内部的日历 可以通过此对象操作所有日历的方法
    *       setCurrentMonth 设置当前日历的月份 传参：'2019-06'
    *
    *  事件：set-day 设置当前值为休息日、国假后触发 传参：当前日历的值
    *        cancel-day 取消休息日、国假后触发 传参：当前日历的值
    *        change-month 改变日历月份触发
    * */
    import { parseTime } from '@/util/date'
    export default {
        name: "factory-calendar",

        data(){
            return {
                current: {
                    date: parseTime(new Date(), "{y}-{m}-{d}"),
                    type: '', // normal: 休息日  native: 国家法定节假日 其他为没有设置
                },
                selectedDate: [],
                yMonth: parseTime(new Date(), "{y}-{m}"),
            }
        },

        computed: {
            operateType(){
                // set 为设置 cancel 为取消
                return this.current.type == "normal" || this.current.type == "native" ? 'cancel' : 'set';
            },
            formatTime(){
                let week = new Date(this.current.date).getDay();
                let week_str = ["日", "一", "二", "三", "四", "五", "六"];
                return this.current.date + " 星期" + week_str[week];
            },
            formatDay(){
                return new Date(this.current.date).getDate();
            },
        },

        created() {
            this.$nextTick(()=>{

            })
        },
        methods: {
            log(val){
                console.log(val)
            },
            changeYMonth(val){
                // 同步日历值
                let date = new Date(val);
                // console.log(this.$refs.vCalendar);
                let page = { month: date.getMonth() + 1, year: date.getFullYear() };
                this.$refs.vCalendar.showPageRange(page);
                this.$emit("change-month", val);
            },
            selectDay(day){
                //console.log(day);
                let result = this.includeDate(day.id);
                this.current = {
                    date: day.id,
                    type: result ? result.type : '',
                }
            },
            // 判断日期有没有被设置
            includeDate(date){
                let result = this.selectedDate.filter((item)=>{
                    return new Date(item.date).getTime() == new Date(date).getTime();
                });
                return result.length == 0 ? null : result[0];
            },
            // 设置休息日 国假
            setSelectDay(type){
                // 添加选择选项
                this.current.type = type;
                this.selectedDate.push({
                    date: this.current.date,
                    type: type
                });
                // 日期从小到大排序
                this.selectedDate.sort((a, b)=>{
                    return new Date(a.date).getTime() - new Date(b.date).getTime()
                });
                //console.log(this.selectedDate);
                this.$emit("set-day", this.selectedDate)
            },

            // 取消休息日国假
            cancelSelectDay(){
                this.selectedDate = this.selectedDate.filter((item)=>{
                    return new Date(item.date).getTime() != new Date(this.current.date).getTime();
                });
                this.$emit("cancel-day", this.selectedDate)
            },

            // 设置当前已选择的日期 格式 [{ date: '2019-08-28', type: 'normal' }]
            setVal(val){
                this.selectedDate = val;
            },
            // 获取当前的已设置的日期
            getVal(){
                return this.selectedDate;
            },
            // 设置当前操作的日期 '2019-08-28'
            setCurrentDay(val){
                this.current = { date: val, type: '' };
                // 同步顶部选框值
                let date = new Date(val);
                this.yMonth = parseTime(date, "{y}-{m}");
                // 同步日历值
                let page = { month: date.getMonth() + 1, year: date.getFullYear() };
                this.$refs.vCalendar.showPageRange(page);
            },
            // 获取当前正在操作的日期
            getCurrentDay(){
                return this.current;
            },

            // 获取日历对象 可以使用日历的所有方法
            getCalendar(){
                return this.$refs.vCalendar
            },
            // 设置当前日历的月份 '2019-06'
            setCurrentMonth(val){
                this.yMonth = val;
                this.changeYMonth(val);
            }

        }
    }
</script>

<style lang="scss">
    $border:  #e7e7e7;
    .factory-calendar{
        display: inline-block;
        box-shadow: 0px 0px 5px #ccc;
        border-radius: 3px;
        margin-bottom: 10px;
        .custom-calendar{
            border-radius: 0px;
            border-color: $border;
            border-top-width: 0px;
            border-left-width: 0px;
        }
        .vc-grid-container{
            padding: 0px;
        }
        .vc-weekday{
            background-color: #f0f0f0;
            color: #000;
            font-weight: normal;
            font-size: 12px;
            padding-top: 16px;
            padding-bottom: 12px;
            line-height: 1.4;
        }
        .vc-pane{
            .vc-grid-cell{
                border-top: 1px solid $border;
                border-left: 1px solid $border;
            }
        }

        .per-day{
            text-align: center;
            position: relative;
            width: 90px;
            height: 80px;
            line-height: 80px;
            cursor: pointer;
        }
        .rest{
            color: rgb(255, 255, 255);
            position: absolute;
            right: 0px;
            top: 0px;
            /*width: 26px;*/
            height: 26px;
            line-height: 26px;
            background: #f08f00;
            padding-left: 5px;
            padding-right: 5px;
        }
        .text-orange{
            color: #f08f00;
        }

        .factory-calendar-wrap{
            display: flex;
        }

        .factory-left{

        }

        .factory-right{
            width: 230px;
            display: flex;
            text-align: center;
            align-items: center;
            >div{
                width: 100%;
            }
            .right-wrap{
                .week-time{
                    font-size: 14px;
                }
                .select-day{
                    span{
                        width: 70px;
                        height: 70px;
                        line-height: 70px;
                        background: #3aa1ff;
                        color: #fff;
                        font-size: 27px;
                        display: inline-block;
                        margin-top: 30px;
                        margin-bottom: 35px;
                        border-radius: 4px;
                    }
                }
            }
        }

        .day-active{
            background: #3aa1ff;
            .text-day{
                color: #fff;
            }
        }
        .day-selected{
            background: #f5f5f6;
            .text-day{
                color: #000;
            }
            .text-day.text-orange{
                color: #f08f00;
            }
        }
        /*.day-active.day-selected{*/
        /*.text-day.text-orange{*/
        /*color: #f08f00;*/
        /*}*/
        /*}*/
    }


</style>
