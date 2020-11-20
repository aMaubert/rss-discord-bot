import {BaseEvent} from './base.event';
import {Message} from 'discord.js';
import {
  BaseCommand,
  cleanCommand,
  CleanCommand,
  PingCommand,
  pingCommmand,
  rssCommand,
  RssCommand
} from '../commands';

export class MessageEvent extends BaseEvent {

  readonly name = 'message';

  readonly commands: BaseCommand[];

  constructor(  pingCommand: PingCommand,
                rssCommand: RssCommand,
                cleanCommand: CleanCommand) {
    super();
    this.commands = [pingCommand, rssCommand, cleanCommand];
  }

  public async onActivated(message: Message): Promise<void> {
    if(message.author.bot) return ;

    for(let i = 0; i < this.commands.length; i++ ) {
      if( this.commands[i].parse(message.content) ) {
        this.commands[i].execute(message);
        return ;
      }
    }
  }

}

export const messageEvent = new MessageEvent(pingCommmand, rssCommand, cleanCommand);
