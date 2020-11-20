import {BaseCommand} from './base.command';
import { Message, MessageEmbed, TextChannel} from 'discord.js';
import {messageUtils} from './utils';
import {Item, Output} from 'rss-parser';
import * as RssParser from 'rss-parser';

const rssParser = new RssParser();

export class RssCommand extends BaseCommand {
  
  readonly pattern = '!rss';

  private static itemIsAlreadyInChannel(messageTitle: string, messages: Message[]): boolean {
    for( let i = 0; i < messages.length; i++) {
      if ( messages[i].embeds[0].title.trim() === messageTitle.trim() ) return true;
    }
    return false;
  }

  private static async sendNewPosts(rssLink: string, message: Message): Promise<void> {
    const messageFilter = (message: Message) => message.author.bot && message.embeds.length > 0 ;
    const oldRssMessages = await messageUtils.fetchAllMessages(message.channel as TextChannel, messageFilter);

    const feed: Output = await rssParser.parseURL(rssLink);

    feed.items.forEach( (item: Item) => {
      if( item.title && !this.itemIsAlreadyInChannel(item.title, oldRssMessages ) ) {
        const messageEmbed = new MessageEmbed()
          .setTitle(item.title)
          .setDescription(item.link);
        message.channel.send(messageEmbed);
      }
    });
    
  }

  public async execute(message: Message): Promise<void> {
    if( message.channel.type === 'text' ) {
      //parse
      const rssLink = message.content.split(' ')[1]; // rss https://www.reddit.com/.rss

      await RssCommand.sendNewPosts(rssLink, message);
      let count = 1;
      message.channel.send(`finish sendNewPosts ${count} times from ${rssLink} `);

      const launchInterval = (ms: number) => {
        setInterval(async () => {
          await RssCommand.sendNewPosts(rssLink, message);
          count++;
          message.channel.send(`finish sendNewPosts ${count} times from ${rssLink} update each ${ms} milliseconds .`);
        }, ms);
      };

      /*
       * 1000 * 60 => 1 minute
       * 1000 * 60 * 60 => 1 Hour
       * 1000 * 60 * 60 * 24 => 1 day
       * 1000 * 60 * 60 * 24 * 7 => 1 week
       */
      launchInterval(1000 * 30);

    }
  }

  public parse(commandLine: string): boolean {
    return commandLine.trim().toLowerCase().startsWith(this.pattern);
  }
  
}

export const rssCommand = new RssCommand();
