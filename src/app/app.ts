import {Client} from 'discord.js';
import { BaseEvent, readyEvent, messageEvent } from './events';

const events: BaseEvent[] = [ readyEvent, messageEvent];

const client = new Client();

events.forEach( (event: BaseEvent)  => {
  client.on(event.name, event.onActivated.bind(event));
});

export const discordServer = client;


