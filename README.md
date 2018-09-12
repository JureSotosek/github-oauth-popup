# GitHub OAuth Popup

![NPM](https://img.shields.io/npm/v/github-oauth-popup.svg?style=flat)

A popup window helper/component for [GitHub login](https://developer.github.com/v3/oauth/).

## Example

http://buildastack.io/ - Top right corner.

## Usage

```js
import { loginWithGithub } from 'github-oauth-popup';

const params = {
  client_id: 'id',
  scope: 'read:user'
  }
);

loginWithGithub(params).then(res => console.log('Code: ', res.code))
```

## API

### `loginWithGithub(params, options?, url?, id?)`

#### `params`

> An object that contains the client_id and the scope requested

#### `options`

> Options for the popup window

##### default

```js
{
  height: 1000,
  width: 600
}
```

### `url`

> The auth url

##### default

```js
'https://github.com/login/oauth/authorize';
```

### `id`

> Popup window id

##### default

```js
'github-oauth-authorize';
```
