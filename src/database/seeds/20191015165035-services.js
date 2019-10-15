/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'services',
      [
        {
          name: 'Design de Sobrancelha',
          description: '',
          duration: 30,
          price: 60.0,
        },
        {
          name: 'Maquiagem Social com Cílios',
          description: '',
          duration: 90,
          price: 130.0,
        },
        {
          name: ' Sobrancelhas',
          description: '',
          duration: 30,
          price: 40.0,
        },
        {
          name: 'Design Sobrancelha + Buço',
          description: '',
          duration: 60,
          price: 80.0,
        },
        {
          name: 'Sobrancelhas + Buço',
          description: '',
          duration: 30,
          price: 55.0,
        },
        { name: 'Penteado', description: '', duration: 60, price: 140.0 },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('services', null, {}),
};
