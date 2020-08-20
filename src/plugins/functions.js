export default {
    /**
     * 判断是否是手机号
     * @param tel
     * @returns {boolean}
     */
    isMobile: function (tel) {
        var reg = /^0?1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/
        return reg.test(tel)
    },
    /**
     * 主要用来解决Vue引用传递的BUG
     * @param obj
     * @returns {any}
     */
    clone: function (obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    // 格式化日期,
    format_date: function (date, format) {
        var paddNum = function (num) {
            num += ''
            return num.replace(/^(\d)$/, '0$1')
        }
        // 指定格式字符
        var cfg = {
            yyyy: date.getFullYear(), // 年 : 4位
             yy: date.getFullYear().toString().substring(2), // 年 : 2位
             M: date.getMonth() + 1, // 月 : 如果1位的时候不补0
             MM: paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
             d: date.getDate(), // 日 : 如果1位的时候不补0
             dd: paddNum(date.getDate()), // 日 : 如果1位的时候补0
             h: date.getHours(),
             hh: paddNum(date.getHours()), // 时
             m: date.getMinutes(),
             mm: paddNum(date.getMinutes()), // 分
             ss: paddNum(date.getSeconds()) // 秒
        }
        format || (format = 'yyyy-MM-dd hh:mm:ss')
        return format.replace(/([a-z])(\1)*/ig, function (m) {
            // console.log(m)
            return cfg[m]
        })
    },
    showMonthFirstDay () {
        var Nowdate = new Date()
        var MonthFirstDay = new Date(Nowdate.getYear(), Nowdate.getMonth(), 1)
        var M = Number(MonthFirstDay.getMonth()) + 1
        return MonthFirstDay.getYear() + '-' + M + '-' + MonthFirstDay.getDate()
    },
    // 例如今天是2020-1-31  调用getLocaltime(30) 那么返回值就是 [2020-1-1,2020-1-31]
    getLocaltime (date_count) {
        let date = new Date()
        let end = new Date(date.getTime())
        let start = new Date(date.getTime() - 3600 * 1000 * 24 * date_count)
        let formatStart = this.format_date(start, 'yyyy-MM-dd')
        let formatEnd = this.format_date(end, 'yyyy-MM-dd')
        return [formatStart, formatEnd]
    },
    shortcuts: [
        {
            text: '最近一周',
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '最近一个月',
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '最近三个月',
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
            }
        }
    ],
    // 生成随机数
    rand: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    },
    // 主题颜色设置 非elementUI
    setColor: function (val) {
        // console.log(val)
        if (val === 'yellow' || val === 'blue' || val === 'redwine' || val === 'orange' || val === 'skyblue' || val === 'green') {
            window.document.documentElement.setAttribute('data-theme', val)
        } else {
            console.log(val)
            window.document.documentElement.setAttribute('data-theme', 'blue')
        }
    }
}
