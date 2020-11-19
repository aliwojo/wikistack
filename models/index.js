const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const PAGE = db.define('page', {
    title: {type: Sequelize.STRING},
    slug: {type: Sequelize.STRING},
    content: {type: Sequelize.TEXT},
    status: {type: Sequelize.BOOLEAN}
});

const USER = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = {
  db
}