<template>
  <div>
    <component v-if="this.$store.getters['auth/userInfo'].theme == 'default'" :is="require('@/components/dashboard/IndexMis').default"/>
    <component v-if="this.$store.getters['auth/userInfo'].theme == 'prottoy'" :is="require('@/components/dashboard/IndexMis').default"/>
    <component v-if="this.$store.getters['auth/userInfo'].theme == 'bijoy'" :is="require('@/components/dashboard/IndexMisBijoy').default"/>
  </div>
</template>