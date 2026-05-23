import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: { default: 'Admin | OmniRide', template: '%s | Admin | OmniRide' },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64 min-h-screen">
        {children}
      </div>
    </div>
  )
}
