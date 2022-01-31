<template>
    <div id="nav" class="h-6 bg-opacity-80 bg-blue-500 text-white text-xs font-bold relative flex px-5 py-1">
        <div class="flex-auto text-left flex gap-1.5">
            <router-link :to="{ name: 'home' }" class="hover:bg-blue-400 px-1">Home</router-link>
            <router-link :to="{ name: 'reusemetrics' }" class="hover:bg-blue-400 px-1">R / R+ Metrics</router-link>
            <router-link :to="{ name: 'contributors'}" class="hover:bg-blue-400 px-1">Contributors</router-link>
            <a class="hover:bg-blue-400 px-1" href="https://github.com/bhermann/DoR">Source code</a>
            <!-- <a class="hover:bg-blue-400 px-1" href="https://github.com/bhermann/DoR">Meet the team</a> -->
        </div>
        <div class="flex-none">The Department of Reuse is a department within the <a href="https://global.rutgers.edu/rose>ROSE initiative</a>.</div>
    </div>
</template>
<script lang="ts">

export default {
    setup() {
        
    },  
}
</script>
<style scoped>
    #nav {
        font-family: "Roboto Condensed", "Helvetica", "Arial", sans-serif;
    }
</style>
