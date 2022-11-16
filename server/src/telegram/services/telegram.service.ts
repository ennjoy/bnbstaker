import { Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'

@Injectable()
export class TelegramService {
    constructor() {}

    public bot: any = new Telegraf(process.env.TELEGRAM_BOT_API_KEY)
    
    sendMessage(chatId: string | number, message: string): void {
        this.bot.telegram.sendMessage(chatId, message)
    }    
    
    // onModuleInit() {
    //     this.bot.on('message', function (ctx, next) {
    //         console.log(ctx.message.chat.id)
    //     })
    //     this.bot.launch()
    // }
  
}