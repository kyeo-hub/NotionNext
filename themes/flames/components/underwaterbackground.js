"use client"

import { useEffect, useRef } from "react"

export default function UnderwaterBackground({
  bubbleFrequency = 0.1,
  fishCount = 5,
  seaweedCount = 10,
  rayOpacity = 0.1,
  rayCount = 6,
  zIndex = -1,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 创建画布元素
    const canvas = document.createElement("canvas")
    canvas.id = "underwaterCanvas"
    canvas.style.position = "fixed"
    canvas.style.left = "0px"
    canvas.style.top = "0px"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.zIndex = zIndex.toString() // 使用传入的zIndex，默认为-1（在内容后面）
    canvas.style.pointerEvents = "none" // 确保鼠标事件可以穿透到下面的元素
    containerRef.current.appendChild(canvas)

    // 初始化水下效果
    const cleanup = initUnderwaterEffect(canvas, {
      bubbleFrequency,
      fishCount,
      seaweedCount,
      rayOpacity,
      rayCount,
    })

    // 清理函数
    return () => {
      cleanup()
      if (containerRef.current && containerRef.current.contains(canvas)) {
        containerRef.current.removeChild(canvas)
      }
    }
  }, [bubbleFrequency, fishCount, seaweedCount, rayOpacity, rayCount, zIndex])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />
}

function initUnderwaterEffect(canvas, options) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}

  // 设置画布尺寸
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // 鼠标位置
  let mouseX = window.innerWidth / 2
  let mouseY = window.innerHeight / 2
  let lastMouseX = mouseX
  let lastMouseY = mouseY

  // 跟踪鼠标移动
  const handleMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }
  window.addEventListener("mousemove", handleMouseMove)

  // 气泡类
  class Bubble {
    constructor(x, y) {
      this.x = x + (Math.random() - 0.5) * 20
      this.y = y + (Math.random() - 0.5) * 20
      this.size = 1 + Math.random() * 3
      this.maxSize = 5 + Math.random() * 5
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = -1 - Math.random() * 2
      this.alpha = 0.5 + Math.random() * 0.5
      this.color = `rgba(255, 255, 255, ${this.alpha})`
      this.growthRate = 0.05 + Math.random() * 0.1
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      // 气泡增长
      if (this.size < this.maxSize) {
        this.size += this.growthRate
      }

      // 上升时逐渐消失
      this.alpha -= 0.005
      this.color = `rgba(255, 255, 255, ${this.alpha})`
    }

    draw(ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()

      // 添加高光使气泡更真实
      ctx.beginPath()
      ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 1.5})`
      ctx.fill()
    }
  }

  // 鱼类
  class Fish {
    constructor(x, y) {
      this.x = x + (Math.random() - 0.5) * 200
      this.y = y + (Math.random() - 0.5) * 200
      this.size = 5 + Math.random() * 10
      this.speedX = 0
      this.speedY = 0
      this.color = this.getRandomColor()
      this.targetX = x
      this.targetY = y
      this.wiggleOffset = Math.random() * Math.PI * 2
      this.wiggleSpeed = 0.1 + Math.random() * 0.1
      this.wiggleAmount = 1 + Math.random() * 2
      this.flipped = false
    }

    getRandomColor() {
      const colors = [
        "#FF9F1C", // 橙色
        "#2EC4B6", // 青色
        "#E71D36", // 红色
        "#FF3864", // 粉色
        "#011627", // 深蓝色
        "#41EAD4", // 青绿色
        "#FDFFFC", // 白色
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    update(targetX, targetY) {
      this.targetX = targetX
      this.targetY = targetY

      // 计算到目标的方向
      const dx = this.targetX - this.x
      const dy = this.targetY - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // 平滑更新速度
      this.speedX = (dx / distance) * (0.5 + Math.random() * 1)
      this.speedY = (dy / distance) * (0.5 + Math.random() * 1)

      // 确定鱼是否需要翻转
      this.flipped = this.speedX < 0

      // 添加摆动动作
      this.wiggleOffset += this.wiggleSpeed
      const wiggle = Math.sin(this.wiggleOffset) * this.wiggleAmount

      // 计算垂直方向
      const perpX = -this.speedY
      const perpY = this.speedX
      const perpLength = Math.sqrt(perpX * perpX + perpY * perpY) || 1

      // 应用摆动
      this.x += this.speedX + (perpX / perpLength) * wiggle
      this.y += this.speedY + (perpY / perpLength) * wiggle
    }

    draw(ctx) {
      ctx.save()
      ctx.translate(this.x, this.y)

      if (this.flipped) {
        ctx.scale(-1, 1)
      }

      // 绘制鱼身
      ctx.beginPath()
      ctx.moveTo(this.size, 0)
      ctx.quadraticCurveTo(0, this.size / 2, -this.size, 0)
      ctx.quadraticCurveTo(0, -this.size / 2, this.size, 0)
      ctx.fillStyle = this.color
      ctx.fill()

      // 绘制鱼尾
      ctx.beginPath()
      ctx.moveTo(-this.size, 0)
      ctx.lineTo(-this.size * 1.5, this.size / 1.5)
      ctx.lineTo(-this.size * 1.5, -this.size / 1.5)
      ctx.closePath()
      ctx.fillStyle = this.color
      ctx.fill()

      // 绘制眼睛
      ctx.beginPath()
      ctx.arc(this.size / 2, -this.size / 4, this.size / 6, 0, Math.PI * 2)
      ctx.fillStyle = "white"
      ctx.fill()

      ctx.beginPath()
      ctx.arc(this.size / 2, -this.size / 4, this.size / 10, 0, Math.PI * 2)
      ctx.fillStyle = "black"
      ctx.fill()

      ctx.restore()
    }
  }

  // 海草类
  class Seaweed {
    constructor(x) {
      this.x = x
      this.segments = 5 + Math.floor(Math.random() * 5)
      this.height = 50 + Math.random() * 100
      this.width = 10 + Math.random() * 10
      this.points = []
      this.color = `rgba(0, ${100 + Math.floor(Math.random() * 155)}, 0, 0.7)`
      this.swayOffset = Math.random() * Math.PI * 2
      this.swaySpeed = 0.02 + Math.random() * 0.02

      // 初始化点
      for (let i = 0; i <= this.segments; i++) {
        this.points.push({
          x: this.x,
          y: canvas.height - (i * this.height) / this.segments,
        })
      }
    }

    update() {
      this.swayOffset += this.swaySpeed

      // 更新除基点外的所有点
      for (let i = 1; i <= this.segments; i++) {
        const swayAmount = (i / this.segments) * 15
        this.points[i].x = this.x + Math.sin(this.swayOffset + i * 0.3) * swayAmount
      }
    }

    draw(ctx) {
      ctx.beginPath()
      ctx.moveTo(this.points[0].x, this.points[0].y)

      // 绘制平滑曲线
      for (let i = 1; i < this.points.length; i++) {
        const xc = (this.points[i].x + this.points[i - 1].x) / 2
        const yc = (this.points[i].y + this.points[i - 1].y) / 2
        ctx.quadraticCurveTo(this.points[i - 1].x, this.points[i - 1].y, xc, yc)
      }

      // 绘制到最后一点
      ctx.quadraticCurveTo(
        this.points[this.segments - 1].x,
        this.points[this.segments - 1].y,
        this.points[this.segments].x,
        this.points[this.segments].y,
      )

      // 绘制海草的另一侧
      for (let i = this.segments; i > 0; i--) {
        const xc = (this.points[i].x + this.points[i - 1].x) / 2
        const yc = (this.points[i].y + this.points[i - 1].y) / 2
        ctx.quadraticCurveTo(this.points[i].x + this.width / 2, this.points[i].y, xc + this.width / 2, yc)
      }

      ctx.closePath()
      ctx.fillStyle = this.color
      ctx.fill()
    }
  }

  // 创建数组
  const bubbles = []
  const fishes = []
  const seaweeds = []

  // 初始化海草
  for (let i = 0; i < options.seaweedCount; i++) {
    seaweeds.push(new Seaweed(Math.random() * canvas.width))
  }

  // 初始化鱼
  for (let i = 0; i < options.fishCount; i++) {
    fishes.push(new Fish(canvas.width / 2, canvas.height / 2))
  }

  // 绘制光线
  function drawLightRays(ctx) {
    ctx.save()

    // 使用较慢的时间变量减少闪烁
    const slowTime = Date.now() * 0.0002

    // 绘制光线
    for (let i = 0; i < options.rayCount; i++) {
      // 使光线位置更稳定
      const x = canvas.width * (i / options.rayCount) + Math.sin(slowTime + i) * 50
      const width = 80 + Math.sin(slowTime * 0.5 + i) * 20

      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + width, 0)
      ctx.lineTo(x + width / 2 + width * 0.8, canvas.height)
      ctx.lineTo(x + width / 2 - width * 0.8, canvas.height)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, `rgba(255, 255, 255, ${options.rayOpacity})`)
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = gradient
      ctx.fill()
    }

    ctx.restore()
  }

  // 绘制水面波浪
  function drawWaterSurface(ctx) {
    ctx.save()

    const time = Date.now() * 0.001
    ctx.beginPath()
    ctx.moveTo(0, 0)

    for (let x = 0; x < canvas.width; x += 20) {
      const y = 10 + Math.sin(x * 0.01 + time) * 5 + Math.sin(x * 0.02 + time * 1.5) * 3
      ctx.lineTo(x, y)
    }

    ctx.lineTo(canvas.width, 0)
    ctx.closePath()

    const gradient = ctx.createLinearGradient(0, 0, 0, 20)
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.7)")
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

    ctx.fillStyle = gradient
    ctx.fill()

    ctx.restore()
  }

  // 动画循环
  function animate() {
    // 用蓝色水下渐变清除画布
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "rgba(0, 100, 175, 0.7)")
    gradient.addColorStop(1, "rgba(0, 50, 100, 0.7)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 绘制光线
    drawLightRays(ctx)

    // 更新和绘制海草
    seaweeds.forEach((seaweed) => {
      seaweed.update()
      seaweed.draw(ctx)
    })

    // 随机和鼠标移动时创建新气泡
    if (
      Math.random() < options.bubbleFrequency ||
      Math.abs(mouseX - lastMouseX) > 5 ||
      Math.abs(mouseY - lastMouseY) > 5
    ) {
      bubbles.push(new Bubble(mouseX, mouseY))
      lastMouseX = mouseX
      lastMouseY = mouseY
    }

    // 更新和绘制气泡
    for (let i = bubbles.length - 1; i >= 0; i--) {
      bubbles[i].update()
      bubbles[i].draw(ctx)

      // 移除屏幕外或已消失的气泡
      if (bubbles[i].y < -20 || bubbles[i].alpha <= 0) {
        bubbles.splice(i, 1)
      }
    }

    // 更新和绘制鱼
    fishes.forEach((fish) => {
      fish.update(mouseX, mouseY)
      fish.draw(ctx)
    })

    // 绘制水面
    drawWaterSurface(ctx)

    requestAnimationFrame(animate)
  }

  // 开始动画
  animate()

  // 返回清理函数
  return () => {
    window.removeEventListener("resize", resizeCanvas)
    window.removeEventListener("mousemove", handleMouseMove)
  }
}
