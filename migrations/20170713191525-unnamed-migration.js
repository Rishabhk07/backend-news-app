'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return [
            queryInterface.addColumn(
                'briefs',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'briefs',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'top_news',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'top_news',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'india',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'india',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'world',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'world',
                'photostory',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'sports',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'sports',
                'photostory',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'cricket',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'cricket',
                'photostory',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'business',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'business',
                'photostory',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'education',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'education',
                'photostory',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'environment',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'environment',
                'photostory',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'entertainment',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'entertainment',
                'photostory',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'tv',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'tv',
                'photostory',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'automotive',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'automotive',
                'photostory',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'photo_story'
                }
            ),
            queryInterface.addColumn(
                'events',
                'story',
                {
                    type: Sequelize.DataTypes.TEXT,
                    field: 'news_story'
                }
            ),
            queryInterface.addColumn(
                'events',
                'photostory',
                {
                    type: Sequelize.DataTypes.TEXT,
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
                'photostory',
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
                'photostory',
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

        return [
            queryInterface.changeColumn(
                'briefs',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),

            queryInterface.changeColumn(
                'top_news',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),

            queryInterface.changeColumn(
                'india',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.changeColumn(
                'world',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.changeColumn(
                'sports',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),

            queryInterface.changeColumn(
                'cricket',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.changeColumn(
                'business',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),

            queryInterface.changeColumn(
                'education',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),

            queryInterface.changeColumn(
                'environment',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),

            queryInterface.changeColumn(
                'entertainment',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),

            queryInterface.changeColumn(
                'tv',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),

            queryInterface.changeColumn(
                'automotive',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.changeColumn(
                'events',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),

            queryInterface.changeColumn(
                'life_style',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            ),
            queryInterface.changeColumn(
                'good_governance',
                'photostory',
                {
                    type: Sequelize.DataTypes.JSON,
                    field: 'photo_story'
                }
            )
        ]
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.


         Example:
         return queryInterface.dropTable('users');
         */
    }
};
