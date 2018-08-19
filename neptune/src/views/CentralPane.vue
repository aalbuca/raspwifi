<template>
    <cardCentral></cardCentral>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import cardCentral from '@/components/cardCentral.vue'; // @ is an alias to /src

@Component({
  components: {
    cardCentral,
  },
})
export default class CentralPane extends Vue {}
</script>
