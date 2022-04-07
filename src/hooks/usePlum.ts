import { computed, ref } from 'vue'

interface Point {
  x: number
  y: number
}

interface Branch {
  start: Point
  length: number
  theta: number
}

export function usePlum() {
  const el = ref<HTMLCanvasElement>()
  const ctx = computed(() => el.value?.getContext('2d')!)

  const WIDTH = 600
  const HEIGHT = 600

  function init() {
    ctx.value.strokeStyle = '#ccc'

    step({
      start: { x: WIDTH / 2, y: HEIGHT },
      length: 20,
      theta: -Math.PI / 2
    })
  }

  function lineTo(p1: Point, p2: Point) {
    ctx.value.beginPath()
    ctx.value.moveTo(p1.x, p1.y)
    ctx.value.lineTo(p2.x, p2.y)
    ctx.value.stroke()
  }

  const pendingTasks: Function[] = []

  function step(b: Branch, depth = 0) {
    const end = getEndPoint(b)

    drawBranch(b)
    if (depth < 2 || Math.random() < 0.7) {
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 10 - 5),
            theta: b.theta - 0.4 * Math.random()
          },
          depth + 1
        )
      )
    }

    if (depth < 2 || Math.random() < 0.7) {
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 10 - 5),
            theta: b.theta + 0.4 * Math.random()
          },
          depth + 1
        )
      )
    }
  }

  function frame() {
    const tasks = [...pendingTasks]
    pendingTasks.length = 0
    tasks.forEach((fn) => fn())
  }

  let frameCount = 0
  function startFrame() {
    console.log(frameCount)
    if (frameCount > 50) return
    requestAnimationFrame(() => {
      frameCount += 1
      if (frameCount % 3 === 0) frame()
      startFrame()
    })
  }

  startFrame()

  function getEndPoint(b: Branch) {
    return {
      x: b.start.x + b.length * Math.cos(b.theta),
      y: b.start.y + b.length * Math.sin(b.theta)
    }
  }

  function drawBranch(b: Branch) {
    lineTo(b.start, getEndPoint(b))
  }

  return {
    el,
    init
  }
}
