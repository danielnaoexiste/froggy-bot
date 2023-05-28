declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_NAME: string
      CLIENT_ID: string
      BOT_SITE: string
      BOT_TOKEN: string
      MONGO_URI: string
      OTAKU_GIFS: string
      TAROT_IMAGE: string
    }
  }
}

export {}
