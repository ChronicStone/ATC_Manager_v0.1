<template>
    <vx-card title="Create ATC" class="w-1/3">
        <vs-divider></vs-divider>
        <h5 class="text-warning mb-4">1. ATC Identity</h5>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/4 w-full">
                <span>ATC Name</span>
            </div>
            <div class="vx-col sm:w-3/4 w-full">
                <vs-input class="w-full" v-model="input1" />
            </div>
        </div>
        <vs-divider></vs-divider>
        <h5 class="mb-4 text-warning">2. ATC Master account</h5>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/4 mt-2 w-full">
                <span>Username</span>
            </div>
            <div class="vx-col sm:w-3/4 w-full">
                <vs-input class="w-full" type="text" v-model="input2" />
            </div>
        </div>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/4 w-full mt-2">
                <span>Password :</span>
            </div>
            <div class="vx-col sm:w-3/4 w-full">
                <vs-input class="w-full" type="password" v-model="input2" />
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col sm:w-full w-full ml-auto">
                <vs-button class="mr-3 mb-2 w-full">Submit</vs-button>
            </div>
        </div>
    </vx-card>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>