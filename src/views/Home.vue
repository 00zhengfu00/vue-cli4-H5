<template>
    <div class="home">
        <baidu-map class="my-map" :center="center" :zoom="zoom" @ready="handler" ak="rIv2CMtCyMC5brlW2mmzw5SiKI1BkDAH"></baidu-map>
        <van-button type="primary">1234</van-button>
    </div>
</template>

<script>
    import {BaiduMap} from 'vue-baidu-map'
    export default {
        name: "Home",
        components: {
            BaiduMap
        },
        data(){
            return {
                center: {lng: 0, lat: 0},
                zoom: 3
            }
        },
        methods: {
            handler ({BMap, map}) {
                console.log(BMap, map)
                this.center.lng = 116.404
                this.center.lat = 39.915
                this.zoom = 15
                console.log(123)
            }
        }
    };
</script>
<style>
    .my-map {
        width: 400px;
        height: 400px;
    }
</style>
