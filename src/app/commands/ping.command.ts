import {BaseCommand} from './base.command';
import {Message} from 'discord.js';

export class PingCommand extends BaseCommand {
  
  readonly pattern = '!ping';

  public async execute(message: Message): Promise<void> {
    message.reply('Pong!');
  }

  public parse(commandLine: string): boolean {
    return commandLine.trim().toLowerCase().startsWith(this.pattern);
  }
  
}

export const pingCommmand = new PingCommand();
