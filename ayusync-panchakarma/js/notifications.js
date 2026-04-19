// WhatsApp/SMS Notification Simulator
class NotificationSimulator {
    constructor() {
        this.notifications = [
            {
                type: 'whatsapp',
                title: '📱 WhatsApp Reminder',
                message: 'Hello Priya! 👋\n🧘 PRE-SESSION REMINDER:\n• Light breakfast only\n• Wear loose cotton clothes\n• Arrive 15 mins early\n⏰ Time: Today, 4:30 PM',
                time: '4:00 PM'
            },
            {
                type: 'sms',
                title: '📱 SMS Notification',
                message: 'From: AYURVEDA\nPriya, your Kati Basti session is at 4:30 PM today with Dr. Anjali (Room 102).\nPRE-CARE: Light meal 2hrs before. Avoid cold items.\nTrack: bit.ly/ayu-priya',
                time: '4:00 PM'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.createNotificationBell();
        this.simulateIncomingNotifications();
    }
    
    createNotificationBell() {
        const bell = document.createElement('div');
        bell.innerHTML = '🔔';
        bell.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(255,107,107,0.4);
            z-index: 10000;
            animation: pulse 2s infinite;
        `;
        bell.title = 'Notifications (2 unread)';
        document.body.appendChild(bell);
        
        bell.addEventListener('click', () => this.showNotifications());
    }
    
    showNotifications() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        let content = '<div style="background: white; padding: 2rem; border-radius: 20px; max-width: 400px; max-height: 80vh; overflow-y: auto;">';
        content += '<h2 style="margin-bottom: 1.5rem; color: #2d5a2d;">Notifications</h2>';
        
        this.notifications.forEach((notif, index) => {
            content += `
                <div style="background: ${notif.type === 'whatsapp' ? '#25D366' : '#e0e0e0'}; color: white; padding: 1.5rem; margin-bottom: 1rem; border-radius: 15px;">
                    <div style="font-weight: bold; margin-bottom: 0.5rem;">${notif.title}</div>
                    <pre style="font-family: inherit; white-space: pre-wrap; font-size: 0.9rem; margin: 0;">${notif.message}</pre>
                    <div style="font-size: 0.8rem; opacity: 0.9; margin-top: 0.5rem;">${notif.time}</div>
                </div>
            `;
        });
        
        content += '<button onclick="this.parentElement.parentElement.remove()" style="width: 100%; padding: 1rem; background: #f44336; color: white; border: none; border-radius: 10px; font-size: 1rem; cursor: pointer; margin-top: 1rem;">Close</button>';
        content += '</div>';
        
        modal.innerHTML = content;
        document.body.appendChild(modal);
    }
    
    simulateIncomingNotifications() {
        setTimeout(() => {
            // Simulate new notification
            const newNotif = {
                type: 'whatsapp',
                title: '📱 Session Complete Feedback',
                message: 'Priya completed Kati Basti session.\nPain reduced from 5 to 4.\nNo side effects reported. ⭐⭐⭐⭐⭐',
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
            this.notifications.unshift(newNotif);
            // Pulse effect on bell
            const bell = document.querySelector('div[title*="Notifications"]');
            if (bell) {
                bell.style.animation = 'none';
                bell.offsetHeight; // Trigger reflow
                bell.style.animation = 'pulse 0.5s infinite';
            }
        }, 5000);
    }
}

// Initialize when DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new NotificationSimulator());
} else {
    new NotificationSimulator();
}
