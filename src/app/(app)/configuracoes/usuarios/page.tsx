import { AppLayout } from "@/components/layout/app-layout"
import { UsuariosContent } from "@/features/configuracoes/usuarios/components/usuarios-content"

export default function UsuariosPage() {
  const breadcrumbs = [
    { title: "Configurações", href: "/configuracoes" },
    { title: "Usuários" },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs} currentScreen="usuarios">
      <UsuariosContent />
    </AppLayout>
  )
}