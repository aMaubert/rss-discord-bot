import {BaseEvent} from './base.event';


class ReadyEvent extends BaseEvent {

  readonly name = 'ready';

  public async onActivated(): Promise<void> {
    console.log(`Logged in channel`);
  }

}

export const readyEvent = new ReadyEvent();
