// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate';

/* Testing environment configuration */
require('dotenv').config({
  path: 'test.env',
});

jest.mock('./src/helpers/getEnvironments', () => ({
  getEnvironments: () => ({ ...process.env }),
}));
