# Graph Explorer 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environment Configuration

In order to work in local with the [mock backend ](http://localhost:3000), you should configure the environment variable to avoid a ports collision (values are examples)

```bash
PORT=3010
REACT_APP_BACKEND_HOST=http://localhost:3000
```

In case you only want to use the this app only, add the following variable
 ```
REACT_APP_STANDALONE_MODE='on'
```

The login will be bypass automatically

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [`http://localhost:3010`](http://localhost:3010) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
