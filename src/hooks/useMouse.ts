import { reactive, onMounted, toRefs, onUnmounted } from 'vue'

export function useMouse() {
  const coordinate = reactive({
    x: 0,
    y: 0
  })

  function setCoordinate(e: MouseEvent) {
    coordinate.x = e.pageX
    coordinate.y = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', setCoordinate)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', setCoordinate)
  })

  return {
    ...toRefs(coordinate)
  }
}
