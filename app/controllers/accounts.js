"use strict";
const User = require("../models/user");
const Boom = require("@hapi/boom");
const Joi = require('@hapi/joi');

const Accounts = {

  index: {
    auth: false,
    handler: function(request, h) {
      return h.view("main", { title: "Welcome to Pubs of Interest" });
    }
  },

  showSignup: {
    auth: false,
    handler: function(request, h) {
      return h.view("signup", { title: "Sign up for Pubs of Interest" });
    }
  },

  signup: {
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false
      },
      failAction: function (request, h, error)
      {
        return h
          .view('signup', {
            title: 'Sign up Error',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const payload = request.payload;
        let user = await User.findByEmail(payload.email);
        if (user) {
          const message = "Email address is already registered";
          throw Boom.badData(message);
        }
        const newUser = new User({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password
        });
        user = await newUser.save();
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/home");
      } catch (err) {
        return h.view("signup", { errors: [{ message: err.message }] });
      }
    }
  },

  showLogin: {
    auth: false,
    handler: function(request, h) {
      return h.view("login", { title: "Login to Pubs of Interest" });
    }
  },

  login: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false
      },
      failAction: function (request, h, error)
      {
        return h
          .view('login', {
            title: 'Login Error',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    auth: false,
    handler: async function(request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        user.comparePassword(password);
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/home");
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    }
  },

  logout: {
    handler: function(request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    }
  },

  showSettings: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();
        return h.view("settings", { title: "User Settings", user: user });
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    }
  },

  updateSettings: {
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false
      },
      failAction: function (request, h, error)
      {
        return h
          .view('main', {
            title: 'Error updating User Settings',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function(request, h) {
      const userEdit = request.payload;
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      user.firstName = userEdit.firstName;
      user.lastName = userEdit.lastName;
      user.email = userEdit.email;
      user.password = userEdit.password;
      await user.save();
      return h.redirect("/settings");
    }
  },

  deleteUser: {
    handler: async function (request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      console.log("Deleting User: " + user);
      await user.remove();
      return h.view("delete-user");
    }
  }

};

module.exports = Accounts;
