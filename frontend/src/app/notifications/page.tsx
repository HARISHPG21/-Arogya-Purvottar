'use client';

import { useState } from 'react';

interface Notification {
  id: number;
  type: 'critical' | 'high' | 'medium' | 'info' | 'success';
  title: string;
  message: string;
  village: string;
  state: string;
  time: string;
  read: boolean;
  channel: 'sms' | 'app' | 'email' | 'ivr';
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1, type: 'critical', title: '🚨 CRITICAL: Outbreak Alert — Sonapur',
    message: 'AI Risk Score: 85%. E.Coli detected in Sonapur Stream Intake. 22 symptomatic cases in 24h. Dispatch RRT immediately.',
    village: 'Sonapur', state: 'Assam', time: '5 min ago', read: false, channel: 'app'
  },
  {
    id: 2, type: 'high', title: '⚠ HIGH: Water Contamination — Lakhipur',
    message: 'Turbidity spiked to 22.3 NTU in Barak River intake. pH at 5.8. ASHA worker notified. Recommend field verification.',
    village: 'Lakhipur', state: 'Assam', time: '23 min ago', read: false, channel: 'sms'
  },
  {
    id: 3, type: 'critical', title: '🚨 CRITICAL: 14 New Cholera Cases — Chandrapur',
    message: 'PHC Officer Dr. Sharma reported 14 new acute watery diarrhea cases in Chandrapur village. Water source closed pending testing.',
    village: 'Chandrapur', state: 'Assam', time: '1h ago', read: false, channel: 'email'
  },
  {
    id: 4, type: 'medium', title: '⚡ MEDIUM: Symptom Cluster Forming — Imphal East',
    message: '7 citizen reports of fever+vomiting in Imphal East in last 48h. Monitor closely. Risk score: 45%.',
    village: 'Imphal East', state: 'Manipur', time: '3h ago', read: true, channel: 'app'
  },
  {
    id: 5, type: 'success', title: '✅ Alert Resolved — Chabua',
    message: 'Chabua chlorination complete. Latest water test: pH 7.1, Turbidity 2.8 NTU, E.Coli: CLEAR. Risk Score down to 18%.',
    village: 'Chabua', state: 'Assam', time: '5h ago', read: true, channel: 'app'
  },
  {
    id: 6, type: 'info', title: 'ℹ SMS Broadcast Sent — Mizoram',
    message: '1,247 SMS messages sent to Aizawl district residents: "Boil water before drinking. Report symptoms to your ASHA worker."',
    village: 'Aizawl', state: 'Mizoram', time: '8h ago', read: true, channel: 'sms'
  },
  {
    id: 7, type: 'high', title: '⚠ HIGH: Flash Flood Risk — Silchar',
    message: 'IMD weather alert: 120mm rainfall expected in Barak Valley. Pre-position ORS stocks at all PHCs. Activate flood monitoring protocol.',
    village: 'Silchar', state: 'Assam', time: '12h ago', read: true, channel: 'ivr'
  },
  {
    id: 8, type: 'info', title: 'ℹ Monthly District Report Ready',
    message: 'July 2025 Assam District Health Surveillance Report is ready for download. 145 total cases, 38 active, 18 high-risk villages.',
    village: 'All Assam', state: 'Assam', time: '1d ago', read: true, channel: 'email'
  },
];

const TYPE_STYLES: Record<string, string> = {
  critical: 'border-l-red-500 bg-red-500/5',
  high: 'border-l-orange-500 bg-orange-500/5',
  medium: 'border-l-yellow-500 bg-yellow-500/5',
  info: 'border-l-blue-500 bg-blue-500/5',
  success: 'border-l-green-500 bg-green-500/5',
};

const CHANNEL_ICONS: Record<string, string> = {
  app: '📱', sms: '💬', email: '📧', ivr: '📞'
};

const CHANNEL_LABELS: Record<string, string> = {
  app: 'In-App', sms: 'SMS Alert', email: 'Email', ivr: 'IVR Call'
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');
  const [smsTest, setSmsTest] = useState('');
  const [smsSending, setSmsSending] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  const filtered = notifications.filter(n =>
    filter === 'all' ? true :
    filter === 'unread' ? !n.read :
    n.type === 'critical'
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));
  const markRead = (id: number) => setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x));

  const sendTestSMS = async () => {
    if (!smsTest.trim()) return;
    setSmsSending(true);
    await new Promise(r => setTimeout(r, 1400));
    setSmsSending(false);
    setSmsSent(true);
    const newNotif: Notification = {
      id: Date.now(), type: 'info',
      title: 'ℹ SMS Test Sent',
      message: `Test SMS delivered to ${smsTest}. Message: "ArogyaPurvottar Alert: Boil water before drinking. Report symptoms to your ASHA worker."`,
      village: 'Test', state: 'System', time: 'Just now', read: false, channel: 'sms'
    };
    setNotifications(n => [newNotif, ...n]);
    setSmsTest('');
    setTimeout(() => setSmsSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">🔔 Notification Center</h1>
          <p className="text-gray-400 text-sm">Real-time alerts via App, SMS, Email, and IVR for all stakeholders</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm transition-all">
            ✓ Mark All Read ({unreadCount})
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="md:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex gap-2">
            {(['all', 'unread', 'critical'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-sm rounded-lg capitalize transition-all ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'}`}
              >
                {f} {f === 'unread' && unreadCount > 0 ? `(${unreadCount})` : ''}
              </button>
            ))}
          </div>

          {/* Notification Cards */}
          {filtered.map(n => (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`border-l-4 rounded-xl p-4 cursor-pointer transition-all hover:brightness-110 ${TYPE_STYLES[n.type]} ${!n.read ? 'border border-gray-700' : 'border border-gray-800 opacity-80'}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="font-semibold text-sm text-white">{n.title}</div>
                <div className="flex items-center gap-2 shrink-0">
                  {!n.read && <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>}
                  <span className="text-xs text-gray-500">{n.time}</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-3">{n.message}</p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">📍 {n.village}, {n.state}</span>
                <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full border border-gray-700">
                  {CHANNEL_ICONS[n.channel]} {CHANNEL_LABELS[n.channel]}
                </span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-12">No {filter} notifications.</div>
          )}
        </div>

        {/* Sidebar: Alert Stats + SMS Sender */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-300 mb-3">Alert Statistics (Last 24h)</h2>
            {[
              { label: 'Critical Alerts', val: 2, color: 'text-red-400' },
              { label: 'High Alerts', val: 2, color: 'text-orange-400' },
              { label: 'Medium Alerts', val: 1, color: 'text-yellow-400' },
              { label: 'SMS Sent', val: 1247, color: 'text-blue-400' },
              { label: 'IVR Calls Made', val: 89, color: 'text-purple-400' },
              { label: 'Emails Dispatched', val: 34, color: 'text-green-400' },
            ].map(s => (
              <div key={s.label} className="flex justify-between text-sm py-1.5 border-b border-gray-800 last:border-0">
                <span className="text-gray-400">{s.label}</span>
                <span className={`font-bold ${s.color}`}>{s.val.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* SMS Test Sender */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-300 mb-3">📱 Test SMS Broadcast</h2>
            <p className="text-xs text-gray-400 mb-3">Send a test alert SMS to a phone number (simulation):</p>
            <input
              type="tel"
              value={smsTest}
              onChange={e => setSmsTest(e.target.value)}
              placeholder="+91 9876543210"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendTestSMS}
              disabled={smsSending || !smsTest.trim()}
              className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${smsSent ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'}`}
            >
              {smsSending ? '⟳ Sending...' : smsSent ? '✅ SMS Sent!' : 'Send Test SMS'}
            </button>
          </div>

          {/* Alert Channels */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-300 mb-3">📡 Active Notification Channels</h2>
            {[
              { icon: '📱', label: 'In-App Push', status: 'Active', color: 'text-green-400' },
              { icon: '💬', label: 'SMS Broadcast (Twilio)', status: 'Active', color: 'text-green-400' },
              { icon: '📧', label: 'Email (Gov SMTP)', status: 'Active', color: 'text-green-400' },
              { icon: '📞', label: 'IVR Voice Call', status: 'Standby', color: 'text-yellow-400' },
              { icon: '📻', label: 'ASHA WhatsApp Bot', status: 'Active', color: 'text-green-400' },
            ].map(c => (
              <div key={c.label} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                <span className="text-sm text-gray-300">{c.icon} {c.label}</span>
                <span className={`text-xs font-semibold ${c.color}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
