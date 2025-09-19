# Components.json Configurations

Este arquivo contém 3 configurações diferentes de `components.json` baseadas na categorização dos registries.

---

## 🎨 LANDING PAGE & MARKETING
*Para projetos com foco em landing pages, marketing e componentes visuais/animações*

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@aceternity": "https://ui.aceternity.com/registry/{name}.json",
    "@magicui": "https://magicui.design/r/{name}.json",
    "@animate-ui": "https://animate-ui.com/r/{name}.json",
    "@blocks": "https://blocks.so/r/{name}.json",
    "@cult-ui": "https://cult-ui.com/r/{name}.json",
    "@kokonutui": "https://kokonutui.com/r/{name}.json",
    "@motion-primitives": "https://motion-primitives.com/c/{name}.json",
    "@paceui-ui": "https://ui.paceui.com/r/{name}.json",
    "@react-bits": "https://reactbits.dev/r/{name}.json",
    "@reui": "https://reui.io/r/{name}.json",
    "@skiper-ui": "https://skiper-ui.com/registry/{name}.json",
    "@smoothui": "https://smoothui.dev/r/{name}.json",
    "@tailark": "https://tailark.com/r/{name}.json",
    "@8bitcn": "https://8bitcn.com/r/{name}.json",
    "@retroui": "https://retroui.dev/r/{name}.json"
  }
}
```

---

## ⚙️ SISTEMA & APLICAÇÃO
*Para dashboards, aplicações e componentes funcionais/estruturais*

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@originui": "https://originui.com/r/{name}.json",
    "@shadcn": "https://ui.shadcn.com/registry/{name}.json",
    "@alexcarpenter": "https://ui.alexcarpenter.me/r/{name}.json",
    "@basecn": "https://basecn.dev/r/{name}.json",
    "@kibo-ui": "https://www.kibo-ui.com/r/{name}.json",
    "@rigidui": "https://rigidui.com/r/{name}.json",
    "@wds": "https://wds-shadcn-registry.netlify.app/r/{name}.json",
    "@alpine": "https://alpine-registry.vercel.app/r/{name}.json",
    "@heseui": "https://www.heseui.com/r/{name}.json",
    "@97cn": "https://97cn.itzik.co/r/{name}.json"
  }
}
```

---

## 🔧 ESPECIALIZADO & UTILITÁRIOS
*Para funcionalidades específicas como IA, autenticação, pagamentos, etc.*

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@ai-elements": "https://registry.ai-sdk.dev/{name}.json",
    "@prompt-kit": "https://prompt-kit.com/c/{name}.json",
    "@ncdai": "https://chanhdai.com/r/{name}.json",
    "@clerk": "https://clerk.com/r/{name}.json",
    "@billingsdk": "https://billingsdk.com/r/{name}.json",
    "@elements": "https://tryelements.dev/r/{name}.json",
    "@formcn": "https://formcn.dev/r/{name}.json",
    "@shadcn-editor": "https://shadcn-editor.vercel.app/r/{name}.json",
    "@limeplay": "https://limeplay.winoffrg.dev/r/{name}.json",
    "@nativeui": "https://nativeui.io/registry/{name}.json"
  }
}
```

---

## 📋 COMO USAR:

1. **Copie** a configuração desejada acima
2. **Cole** no seu arquivo `components.json`
3. **Execute** comandos shadcn/ui normalmente

### Exemplos de uso:
```bash
# Com landing page config
npx shadcn@latest add @magicui/hero-section

# Com system config  
npx shadcn@latest add @kibo-ui/data-table

# Com specialized config
npx shadcn@latest add @clerk/sign-in
```

---

## 🏷️ REGISTRIES INCLUÍDOS:

### Landing Page & Marketing:
- `@aceternity` - Componentes modernos com animações 3D
- `@magicui` - 150+ componentes animados para landing pages
- `@animate-ui` - Biblioteca de componentes React animados
- `@blocks` - Blocos de UI para páginas de conversão
- `@cult-ui` - Extensão Shadcn com componentes distintos
- `@kokonutui` - Componentes modernos com Framer Motion
- `@motion-primitives` - Primitivas de animação
- `@paceui-ui` - Componentes animados com GSAP
- `@react-bits` - Componentes animados e interativos
- `@reui` - 60+ componentes e efeitos animados
- `@skiper-ui` - Templates complexos para landing pages
- `@smoothui` - Componentes com animações suaves
- `@tailark` - Blocos pré-construídos estilo Notion
- `@8bitcn` - Estilo nostálgico 8-bit
- `@retroui` - Estética retro

### Sistema & Aplicação:
- `@originui` - Componentes limpos e minimalistas
- `@shadcn` - Base padrão de componentes funcionais
- `@alexcarpenter` - UI de propósito geral
- `@basecn` - Alternativa com Base UI para acessibilidade
- `@kibo-ui` - Componentes de alto nível (tabelas, kanban)
- `@rigidui` - Componentes complexos (explorador, dashboards)
- `@wds` - Registro customizado focado em acessibilidade
- `@alpine` - Porta para Alpine.js (não-React)
- `@heseui` - Registro genérico estilo Shadcn
- `@97cn` - Registro genérico estilo Shadcn

### Especializado & Utilitários:
- `@ai-elements` - Componentes para aplicações de IA
- `@prompt-kit` - Experiências de chat com IA
- `@ncdai` - Componentes nativos de IA
- `@clerk` - Gerenciamento de autenticação
- `@billingsdk` - UI para assinaturas e faturamento
- `@elements` - Componentes full-stack para Next.js
- `@formcn` - Componentes para formulários
- `@shadcn-editor` - Editores de rich text e código
- `@limeplay` - Players de vídeo modernos
- `@nativeui` - Componentes para React Native
