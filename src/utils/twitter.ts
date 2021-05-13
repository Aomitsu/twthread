import { logger } from './logger'
const Twitter = require('twitter-lite')
const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

export function checkStatus() {
  client
  .get("account/verify_credentials")
  .then((results: any) => {
    //logger(JSON.stringify(results), 'info')
    if(results.suspended){
      logger(`Suspended Twitter account @${results.screen_name}`, 'error')
    } else if(results.needs_phone_verification){
      logger(`Twitter account @${results.screen_name} need phone verification`, 'error')
    } else {
      logger(`Connected to the Twitter account @${results.screen_name}`, 'info')
    }
  })
  .catch((e: any) => {
    logger('Twitter: \n' + JSON.stringify(e), 'error')
  });
}

export async function getThread(tweetId: string, list: Array<any> = []): Promise<any>{
    if(!tweetId){
        logger('ID of the last tweet to retrieve the thread was not indicated', 'error')
        // TODO: Retourner erreur
    } else if (list.length > 150){
      logger('There are too many tweets', 'error')
      // TODO: Retourner erreur
    }

    let tweet: any = await client.get('statuses/show', {
      id: `${tweetId}`,
      tweet_mode: 'extended'
    })
    if(!tweet.id){
      logger('Obtaining the thread is impossible, a tweet is missing ? Rate Limited ?', 'warn')
      // TODO: Retourner erreur
    }else if (list.length != 0 && list[0].user.id_str !== tweet.user.id_str){
      logger('The author is not the same', 'error')
      // TODO: Retourner erreur
    }

    list.push(tweet)
    
    if (!tweet.in_reply_to_status_id_str) {
      // Dernier tweet, on retourne la liste entière remise dans l'ordre
      logger(`New thread obtained. ${list.length} tweets`, 'info')
      return list.reverse()
    } else {
      //Il reste des tweets à analyser
      return getThread(tweet.in_reply_to_status_id_str, list)
    }

    /*
     * TODO:
     * Attention a la Rate Limite et aux erreurs éventuelles, limiter à 150 tweets
     *                                        ( ex : Supression )
     */

}

export async function getUser(userId: string): Promise<any>{
  let params: any = {}
  if(!userId){
    logger('ID of the last tweet to retrieve the thread was not indicated', 'error')
    // TODO: Retourner erreur
  }

  let user = await client.get('users/show', {
    user_id: userId
  })
  // TODO: Gestion d'erreurs
  
  return user
}

export async function getMentionTimeline(): Promise<any>{
  let timeline = await client.get('statuses/mentions_timeline', {
    tweet_mode: 'extended',
    count: '200'
  })

  // TODO: Gestion d'erreurs

  return timeline
}