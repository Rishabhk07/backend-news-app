/**
 * Created by rishabhkhanna on 14/07/17.
 */
'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return [
            queryInterface.addColumn(
                'briefs',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                }
            ),
            queryInterface.addColumn(
                'briefs',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                }
            ),
            queryInterface.addColumn(
                'top_news',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                }
            ),
            queryInterface.addColumn(
                'top_news',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                }
            ),
            queryInterface.addColumn(
                'india',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                }
            ),
            queryInterface.addColumn(
                'india',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                }
            ),
            queryInterface.addColumn(
                'world',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                }
            ),
            queryInterface.addColumn(
                'world',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'sports',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                }
            ),
            queryInterface.addColumn(
                'sports',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'cricket',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                }
            ),
            queryInterface.addColumn(
                'cricket',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'business',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                }
            ),
            queryInterface.addColumn(
                'business',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                }
            ),
            queryInterface.addColumn(
                'education',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'education',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'environment',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'environment',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'entertainment',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'entertainment',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'tv',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'tv',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'automotive',
                'news_tory',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'automotive',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'events',
                'news_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'events',
                'photo_story',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'life_style',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'life_style',
                'photo_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'good_governance',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'good_governance',
                'photo_story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'photo_story'
                }
            )
        ]
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
    },

    down: function (queryInterface, Sequelize) {

       
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.


         Example:
         return queryInterface.dropTable('users');
         */
    }
};
