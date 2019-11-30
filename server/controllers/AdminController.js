const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const bcrypt = require('bcrypt');
const AdminBroExpressjs = require('admin-bro-expressjs');

AdminBro.registerAdapter(AdminBroMongoose);

const Product = require('../models/Products');
const User = require('../models/Users');
const Category = require('../models/Categories');

const theme = require('admin-bro-theme-dark');

const adminBro = new AdminBro({
  resources: [
    Product,
    {
      resource: Category,
      options: {
        properties: {
          category_url_slug: {
            isVisible: { list: true, filter: false, show: true, edit: false }
          }
        }
      }
    },
    {
      resource: User,
      options: {
        properties: {
          encryptedPassword: { isVisible: false },
          password: {
            type: 'string',
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false
            }
          }
        },
        actions: {
          new: {
            before: async request => {
              if (request.payload.record.password) {
                request.payload.record = {
                  ...request.payload.record,
                  encryptedPassword: await bcrypt.hash(
                    request.payload.record.password,
                    10
                  ),
                  password: undefined
                };
              }
              return request;
            }
          }
        }
      }
    }
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'The Garden, admin panel',
    theme
  }
});

// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  cookiePassword: process.env.SECRET,
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.encryptedPassword);
      if (matched) {
        return user;
      }
    }
    return false;
  }
});

module.exports = router;
