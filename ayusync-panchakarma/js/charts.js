// Simple Chart Library for Progress Visualization
class AyuSyncCharts {
    static createProgressLine(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const maxValue = Math.max(...data.values);
        const padding = 40;
        
        // Draw background grid
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const y = padding + (canvas.height - padding * 2) * (10 - i) / 10;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();
            
            ctx.fillText(i, 10, y + 4);
        }
        
        // Draw data line
        ctx.strokeStyle = '#4a7c4a';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        data.points.forEach((point, index) => {
            const x = padding + (canvas.width - padding * 2) * index / (data.points.length - 1);
            const y = canvas.height - padding - (point / maxValue) * (canvas.height - padding * 2);
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
        
        // Data points
        data.points.forEach((point, index) => {
            const x = padding + (canvas.width - padding * 2) * index / (data.points.length - 1);
            const y = canvas.height - padding - (point / maxValue) * (canvas.height - padding * 2);
            ctx.fillStyle = '#4a7c4a';
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(point.toFixed(1), x, y);
        });
    }
    
    static createProgressBar(containerId, percentage, label) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div style="height: 20px; background: #eee; border-radius: 10px; overflow: hidden;">
                <div style="height: 100%; width: ${percentage}%; background: linear-gradient(90deg, #4CAF50, #8BC34A); transition: width 1s ease;"></div>
            </div>
            <p style="margin-top: 0.5rem; font-weight: bold;">${label} ${percentage}%</p>
        `;
    }
}

// Usage examples for dashboards
document.addEventListener('DOMContentLoaded', function() {
    // Patient pain progress chart
    if (document.getElementById('pain-chart')) {
        AyuSyncCharts.createProgressLine('pain-chart', {
            points: [8, 6, 5.5, 4],
            labels: ['Day1', 'Day2', 'Day3', 'Today']
        });
    }
    
    // Admin satisfaction chart
    if (document.getElementById('satisfaction-chart')) {
        AyuSyncCharts.createProgressLine('satisfaction-chart', {
            points: [4.6, 4.7, 4.8, 4.85],
            labels: ['Jan', 'Feb', 'Mar', 'Apr']
        });
    }
    
    // Progress bars
    const progressBars = [
        { id: 'ama-progress', percent: 52, label: 'Ama (Toxin) Reduction' },
        { id: 'flex-progress', percent: 38, label: 'Flexibility Gain' }
    ];
    
    progressBars.forEach(bar => {
        AyuSyncCharts.createProgressBar(bar.id, bar.percent, bar.label);
    });
});
