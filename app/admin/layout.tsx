import Providers from '@/components/Providers'
import AdminSidebar from '@/components/admin/Sidebar'

export const metadata = {
  title: 'Panel Admin | Eco Módulos & Piscinas',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="min-h-screen bg-[#0d0d0d] flex">
        <AdminSidebar />
        <main className="flex-1 min-w-0 p-6 lg:ml-60">{children}</main>
      </div>
    </Providers>
  )
}
