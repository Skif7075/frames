module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    {
      name      : "Car360",
      script    : "server.js"
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "car360",
      host : "mystand.ru",
      ref  : "origin/master",
      repo : "git@bitbucket.org/mystand/car360.git",
      path : "/srv/mystand/car360/frames",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production"
    }
  }
}
