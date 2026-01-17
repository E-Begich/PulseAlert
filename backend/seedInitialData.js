// seedInitialData.js
const bcrypt = require('bcrypt');
const { Patient, User, AuditLog, Delivery } = require('./models');

const seed = async () => {
  try {
    // ----- PACIJENTI -----
    await Patient.bulkCreate(
      [
        {first_name: 'Ivan', last_name: 'Horvat', oib: '12345678901', address: 'Ilica 10', city: 'Zagreb', postal_code: '10000',
        },
        {
          first_name: 'Ana', last_name: 'Kovač', oib: '12345678902', address: 'Riva 5', city: 'Split', postal_code: '21000',
        },
        {
          first_name: 'Marko', last_name: 'Marić', oib: '12345678903', address: 'Korzo 12', city: 'Rijeka', postal_code: '51000',
        },
        {
          first_name: 'Petra', last_name: 'Novak', oib: '12345678904', address: 'Europska avenija 3', city: 'Osijek', postal_code: '31000',
        },
        {
          first_name: 'Luka', last_name: 'Babić', oib: '12345678905', address: 'Vukovarska 22', city: 'Vukovar', postal_code: '32000',
        },
        {
          first_name: 'Marija', last_name: 'Perić', oib: '12345678906', address: 'Ulica bana Jelačića 8', city: 'Karlovac', postal_code: '47000',
        },
        {
          first_name: 'Tomislav', last_name: 'Radić', oib: '12345678907', address: 'Zagrebačka 15', city: 'Velika Gorica', postal_code: '10410',
        },
        {
          first_name: 'Ivana', last_name: 'Jurić', oib: '12345678908', address: 'Obala kneza Branimira 4', city: 'Zadar', postal_code: '23000',
        },
        {
          first_name: 'Nikola', last_name: 'Božić', oib: '12345678909', address: 'Matije Gupca 19', city: 'Šibenik', postal_code: '22000',
        },
        {
          first_name: 'Katarina', last_name: 'Lončar', oib: '12345678910', address: 'Trg slobode 1', city: 'Slavonski Brod', postal_code: '35000',
        }
      ],
      {
        ignoreDuplicates: true
      }
    );

    console.log('10 pacijenata uspješno uneseno!');

      const hashedPassword = await bcrypt.hash('password123', 10);

    await User.bulkCreate(
      [
        {
          first_name: 'Admin', last_name: 'User', username: 'admin', email: 'admin@pulsealert.hr', password: hashedPassword, role: 'admin',
        },
        {
          first_name: 'Ivana', last_name: 'Horvat', username: 'ivana.h', email: 'ivana@pulsealert.hr', password: hashedPassword, role: 'sluzbenik',
        },
        {
          first_name: 'Marko', last_name: 'Perić', username: 'marko.p', email: 'marko@pulsealert.hr', password: hashedPassword, role: 'sluzbenik',
        },
        {
          first_name: 'Ana', last_name: 'Kovač', username: 'ana.k', email: 'ana@pulsealert.hr', password: hashedPassword, role: 'sluzbenik',
        },
        {
          first_name: 'Petar', last_name: 'Babić', username: 'petar.b', email: 'petar@pulsealert.hr', password: hashedPassword, role: 'sluzbenik',
        },
        {
          first_name: 'Luka', last_name: 'Radić', username: 'luka.r', email: 'luka@pulsealert.hr', password: hashedPassword, role: 'sluzbenik',
        },
        {
          first_name: 'Maja', last_name: 'Jurić', username: 'maja.j', email: 'maja@pulsealert.hr', password: hashedPassword, role: 'sluzbenik',
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log('7 korisnika uspješno uneseno');

       await AuditLog.bulkCreate([
      { user_id: 1, action: 'Kreiran prvi pacijent' },
      { user_id: 1, action: 'Kreiran prvi korisnik' },
      { user_id: 2, action: 'Prijava u sustav' },
      { user_id: 3, action: 'Prijava u sustav' },
    ]);

    console.log('Audit logovi uneseni!');

       /*    await Delivery.bulkCreate([
      { delivery_id: 1, action: 'Kreiran prvi pacijent' },
      { delivery_id: 2, action: 'Kreiran prvi korisnik' },
      { delivery_id: 3, action: 'Prijava u sustav' },
      { delivery_id: 4, action: 'Prijava u sustav' },
    ]);

    console.log('Dostava unesena!'); */

    process.exit(0);
  } catch (err) {
    console.error('Greška kod seeda:', err);
    process.exit(1);
  }
};

seed();
