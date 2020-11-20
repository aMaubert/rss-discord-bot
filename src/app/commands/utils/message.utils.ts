import {ChannelLogsQueryOptions, Message, TextChannel} from 'discord.js';


export class MessageUtils {

  public async fetchAllMessages( textChannel: TextChannel, filter: (message: Message) => boolean): Promise<Message[]> {
    const messages = [];
    let lastMessageId;

    while (true) {
      const fetchOptions = { limit: 100 } as ChannelLogsQueryOptions;
      if(lastMessageId ) {
        fetchOptions.before = lastMessageId;
      }

      try {
        const fetchedMessages = await textChannel.messages.fetch(fetchOptions);

        messages.push( ...fetchedMessages.filter(filter).array() );
        if( fetchedMessages.size < 100) break;

        lastMessageId = fetchedMessages.last().id;
      } catch (e) {
        console.error({error: e});
      }
    }
    return messages;
  }
}

export const messageUtils = new MessageUtils();
