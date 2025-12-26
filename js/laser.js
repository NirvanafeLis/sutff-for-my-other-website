window.addEventListener('load', function() {
    // 简化的激光笔效果
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
    `;
    
    document.body.appendChild(canvas);
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    let mouseX = 0, mouseY = 0;
    let trail = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trail.unshift({x: mouseX, y: mouseY, age: 0});
        if (trail.length > 10) trail.pop();
    });
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制轨迹
        for (let i = 0; i < trail.length - 1; i++) {
            const alpha = 1 - (i / trail.length) * 0.7;
            ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`;
            ctx.lineWidth = (1 - i / trail.length) * 3 + 1;
            ctx.beginPath();
            ctx.moveTo(trail[i].x, trail[i].y);
            ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
            ctx.stroke();
        }
        
        // 绘制主点
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fill();
        
        // 更新轨迹年龄
        trail = trail.filter(point => ++point.age < 15);
        
        requestAnimationFrame(animate);
    }
    
    animate();
});