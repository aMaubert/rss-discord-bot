import {config} from 'dotenv';
import {discordServer} from './app';


config({path: '.env.local'});

discordServer.login(process.env.BOT_TOKEN as string)
                  .then();
