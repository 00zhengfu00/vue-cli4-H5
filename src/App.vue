<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>&nbsp;|&nbsp;
            <router-link to="/about">About</router-link>
        </div>
        <transition :name="transitionName">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    export default {
        name: 'app',
        computed: {
            ...mapState({
                'transitionName': state => state.direction
            })
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: PingFangSC-Medium, PingFang SC;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
    .page {
        min-width: 100vw;
        min-height: 100vh;
        background-color: #fff;
    }
</style>
