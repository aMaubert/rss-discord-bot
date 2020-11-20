import {BaseCommand} from "./base.command";
import {Message, TextChannel} from "discord.js";

export class CleanCommand extends BaseCommand {

  readonly pattern = '!clean';

  public async execute(message: Message): Promise<void> {
    const splitMessage = message.content.split(' ');
    const numberToDelete = parseInt(splitMessage[splitMessage.length - 1], 10);
    const textChannel = message.channel as TextChannel;
    textChannel.messages.channel.bulkDelete(numberToDelete);
  }

  public parse(commandLine: string): boolean {
    return commandLine.trim().toLowerCase().startsWith(this.pattern);
  }
}

export const cleanCommand = new CleanCommand();
