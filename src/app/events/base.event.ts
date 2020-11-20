import {ClientEvents} from 'discord.js';


export abstract class BaseEvent {
  readonly name: keyof ClientEvents;
  abstract onActivated(...args: ClientEvents[keyof ClientEvents]): Promise<void>;
}
