<template>
    <div class="about">
        <h1>This is an aboutVuex page</h1>
        <p>{{ value }}</p>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'About',
        data() {
            return {}
        },
        computed: {
            ...mapState({
                'value': state => state.about.value
            })
        },
        created() {
            this.getValue();
        },
        methods: {
            getValue(){
                this.$axios.get('https://api.uomg.com/api/rand.qinghua').then(res => {
                    if(res.code == 1){
                        this.setValue(res.content)
                    }
                })
            },
            ...mapActions({
                'setValue': 'about/setValue'
            })
        }
    }
</script>
