import { AppLayout } from "@/components/layout/app-layout"
import { NiveisAcessoContent } from "@/features/configuracoes/niveis-acesso/components/niveis-acesso-content"

export default function NiveisAcessoPage() {
  const breadcrumbs = [
    { title: "Configurações", href: "/configuracoes" },
    { title: "Níveis de Acesso" },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs} currentScreen="niveis-acesso">
      <NiveisAcessoContent />
    </AppLayout>
  )
}