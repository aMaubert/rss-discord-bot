import {Message} from 'discord.js';


export abstract class BaseCommand {

  readonly pattern : string;
  
  abstract parse(commandLine: string): boolean;
  
  abstract execute(message: Message): Promise<void>;
  
}
