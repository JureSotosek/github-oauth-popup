import '@babel/polyfill';

const toParams = query => {
  const q = query.replace(/^\??\//, '');

  return q.split('&').reduce((values, param) => {
    const [key, value] = param.split('=');

    values[key] = value;

    return values;
  }, {});
};

const toQuery = (params, delimiter = '&') => {
  const keys = Object.keys(params);

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, '');
};

class PopupWindow {
  constructor(
    params,
    options = { height: 1000, width: 600 },
    url = `https://github.com/login/oauth/authorize`,
    id = 'github-oauth-authorize'
  ) {
    this.id = id;
    this.url = url + '?' + toQuery(params);
    this.options = options;
  }

  open() {
    const { url, id, options } = this;

    this.window = window.open(url, id, toQuery(options, ','));
  }

  close() {
    this.cancel();
    this.window.close();
  }

  poll() {
    this.promise = new Promise((resolve, reject) => {
      this._iid = window.setInterval(() => {
        try {
          const popup = this.window;

          if (!popup || popup.closed !== false) {
            this.close();

            reject(new Error('The popup was closed'));

            return;
          }

          if (
            popup.location.href === this.url ||
            popup.location.pathname === 'blank'
          ) {
            return;
          }

          const params = toParams(popup.location.search.replace(/^\?/, ''));

          resolve(params);

          this.close();
        } catch (error) {}
      }, 500);
    });
  }

  cancel() {
    if (this._iid) {
      window.clearInterval(this._iid);
      this._iid = null;
    }
  }

  then(...args) {
    return this.promise.then(...args);
  }

  catch(...args) {
    return this.promise.then(...args);
  }

  static open(...args) {
    const popup = new this(...args);

    popup.open();
    popup.poll();

    return popup;
  }
}

export const loginWithGithub = (params, options, url, id) => {
  return new Promise(async (resolve, reject) => {
    const popup = PopupWindow.open(params, options, url, id);

    popup.then(resolve, reject);
  });
};
