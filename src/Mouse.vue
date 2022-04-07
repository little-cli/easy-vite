<template>
  <h2>Optional: {{ x }},{{ y }}</h2>
</template>

<script>
export default {
  name: 'Mouse',
  data() {
    return {
      x: 0,
      y: 0
    }
  },

  mounted() {
    window.addEventListener('mousemove', this.setMouse)
  },

  destroyed() {
    window.removeEventListener('mouse', this.setMouse)
  },

  methods: {
    setMouse(e) {
      this.x = e.pageX
      this.y = e.pageY
    }
  }
}
</script>
