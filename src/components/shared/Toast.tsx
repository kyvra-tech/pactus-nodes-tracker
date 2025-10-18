import { useToast } from '../../hook/useToast';

export const ToastContainer: React.FC<{ toasts: ReturnType<typeof useToast>['toasts'] }> = ({ toasts }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-6 py-3 rounded-lg shadow-lg animate-slide-in ${
            toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};