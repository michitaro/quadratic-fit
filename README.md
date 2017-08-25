# Quadratic Fit
* High performance quadratic fit
* [Working Demo](https://michitaro.github.io/quadratic-fit)

## Install

```sh
npm instasll --save @hscmap/quadratic-fit
```

## Example (source code of the working demo)

```typescript
import { quadraticFit } from "@hscmap/quadratic-fit"


window.addEventListener('load', e => {
    const canvas = document.querySelector('canvas')!
    const ctx = canvas.getContext('2d')!

    const samples = generateRandomPoints(canvas)
    for (const [x, y] of samples) {
        ctx.fillRect(x, y, 1, 1)
    }

    const [a0, a1, a2] = quadraticFit(samples)
    ctx.strokeStyle = '#f00'
    ctx.beginPath()
    for (let x = 0; x < canvas.width; ++x) {
        const y = a0 + a1 * x + a2 * x ** 2
        ctx.lineTo(x, y)
    }
    ctx.stroke()
})


function generateRandomPoints(size: { width: number, height: number }) {
    const samples: [number, number][] = []
    const w0 = Math.random() - 0.5
    const c = Math.random() * 0.5
    for (let i = 0; i < 800; ++i) {
        const x = size.width * Math.random()
        const w = 2 * (x / size.width) - 1
        const y = 0.5 * size.height * ((w - w0) ** 2 + 0.2 * Math.random() + c)
        samples.push([x, y])
    }
    return samples
}
```