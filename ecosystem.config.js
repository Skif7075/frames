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
      repo : "git@github.com:Skif7075/frames.git",
      path : "/srv/mystand/car360/frames",
      "post-deploy": "source ~/.profile && pm2 startOrRestart ecosystem.config.js"
    }
  }
}
