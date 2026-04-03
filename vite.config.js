import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        expertise: resolve(__dirname, 'expertise.html'),
        secteurs: resolve(__dirname, 'secteurs.html'),
        clients: resolve(__dirname, 'clients.html'),
        equipe: resolve(__dirname, 'equipe.html'),
        partenaires: resolve(__dirname, 'partenaires.html'),
        contact: resolve(__dirname, 'contact.html'),
        mentions: resolve(__dirname, 'mentions-legales.html'),
        privacy: resolve(__dirname, 'vie-privee.html'),
        cookies: resolve(__dirname, 'cookies.html'),
        faq: resolve(__dirname, 'faq.html'),
        apropos: resolve(__dirname, 'a-propos.html'),
        casClients: resolve(__dirname, 'cas-clients.html'),
        notfound: resolve(__dirname, '404.html'),
        calculateur: resolve(__dirname, 'calculateur.html'),
      }
    }
  }
})
