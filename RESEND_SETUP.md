# 📧 Configuração do Resend para Emails

## 🚀 Configuração Rápida

### 1. Criar conta no Resend
- Acesse [resend.com](https://resend.com)
- Crie sua conta gratuita
- Verifique seu email

### 2. Obter API Key
- Vá para Dashboard → API Keys
- Clique em "Create API Key"
- Copie a chave gerada

### 3. Configurar variáveis de ambiente
Edite o arquivo `.env.local`:

```env
# Email Integration (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
YOUR_EMAIL=seu-email@gmail.com
```

### 4. Testar
- Reinicie o servidor: `pnpm dev`
- Preencha o formulário de contato
- Verifique seu email!

## 📋 Características

- **3.000 emails/mês** grátis
- **Entrega confiável** com alta taxa de sucesso
- **Emails HTML bonitos** com design responsivo
- **API simples** e bem documentada
- **Sem configuração de servidor SMTP**

## 🔧 Solução de Problemas

### Email não chega?
1. Verifique se o `RESEND_API_KEY` está correto
2. Confirme se o `YOUR_EMAIL` está correto
3. Verifique a aba "Emails" no dashboard do Resend
4. Veja os logs do console do navegador/desenvolvedor

### Erro 500?
- Verifique se as variáveis estão definidas no `.env.local`
- Certifique-se de que o servidor foi reiniciado após mudanças

## 💡 Dicas

- Use `onboarding@resend.dev` como remetente para testes
- Para produção, verifique seu domínio próprio
- Monitore o uso mensal no dashboard
- Configure webhooks para notificações avançadas