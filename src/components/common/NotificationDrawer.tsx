import React, { useState } from 'react';
import { X, CheckCheck, Bell, Calendar, Clock, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (item: typeof notifications[0]) => {
    markNotificationAsRead(item.id);
    onClose();
    if (item.linkModule) {
      navigate(`/app/${item.linkModule}?selected=${item.linkRecordId}`);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'hearing':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'release':
        return <Clock className="w-4 h-4 text-emerald-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <FileText className="w-4 h-4 text-chakra-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-darkcard border-l border-slate-200 dark:border-darkborder shadow-2xl flex flex-col h-full animate-slideIn">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-darkborder flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-saffron-50 dark:bg-saffron-950/50 text-saffron-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-navy-900 dark:text-white text-base">Notifications</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Actions Bar */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-darkborder flex items-center justify-between text-xs">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-navy-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-white dark:bg-slate-800 text-navy-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="flex items-center gap-1 text-chakra-600 dark:text-chakra-400 hover:underline font-medium"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {/* Notification Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredNotifications.length === 0 ? (
            <div className="py-16 text-center text-slate-400 dark:text-slate-500">
              <Bell className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No notifications in this view</p>
              <p className="text-xs mt-1">Smart alerts and system events will show here.</p>
            </div>
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                  n.read
                    ? 'bg-white dark:bg-darkcard border-slate-150 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    : 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/80 dark:border-blue-900/50 text-slate-800 dark:text-slate-200 shadow-xs'
                }`}
              >
                {!n.read && (
                  <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-saffron-500" />
                )}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shrink-0 mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 pr-3">
                    <h3 className="font-semibold text-sm text-navy-900 dark:text-white leading-tight">
                      {n.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                      {n.description}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-800/50">
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        {n.timestamp}
                      </span>
                      {n.linkModule && (
                        <span className="text-[11px] font-medium text-chakra-600 dark:text-chakra-400 flex items-center gap-0.5 group-hover:underline">
                          View details <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-darkborder text-[11px] text-center text-slate-500">
          Smart Alert Notifications • Fictional Demonstration Dataset
        </div>
      </div>
    </div>
  );
};
