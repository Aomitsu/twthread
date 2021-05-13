require('dotenv').config({ path: './.env' })
console.clear(); // Console clear go brrrrr

import { logger } from './utils/logger'
import {checkStatus, getThread} from './utils/twitter'

if(!process.env.CONSUMER_KEY
  || !process.env.CONSUMER_SECRET
  || !process.env.ACCESS_TOKEN_KEY
  || !process.env.ACCESS_TOKEN_SECRET){
    logger('Check your ENV vars. Something is missing ? ', 'warn')
}

checkStatus()

const world = 'world';
const test: string = "Test"

export function hello(word: string = world): string {
  return `Hello ${world}! `;
}

logger(hello())
logger(test, 'warn')

setTimeout(async function(){ console.log(await getThread("1391473938375577606")) }, 1000);

