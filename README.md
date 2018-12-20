# Serverless M

Serverless M (or Serverless Modular) **(currently in beta)** is a plugin for the [serverless framework](https://serverless.com/). This plugins helps you in managing multiple serverless projects with a single serverless.yml file. This plugin gives you a super charged CLI options that you can use to create new features, build them in a single file and deploy them all in parallel

Currently this plugin is tested for the below stack only

* AWS
* NodeJS λ
* Rest API (You can use other events as well)

## Prerequisites

Make sure you have the serverless CLI installed

```yml
# Install serverless globally
$ npm install serverless -g
```

## Getting Started

To start the serverless modular project locally you can either start with es5 or es6 templates

### ES6 Template install

```yml
# Step 1. Download the template
$ sls create --template-url https://github.com/aa2kb/serverless-modular/tree/master/template/modular-es6 --path myModularService

# Step 2. Change directory
$ cd myModularService

# Step 3. Create a package.json file
$ npm init

# Step 3. Install dependencies
$ npm i serverless-modular serverless-webpack webpack --save-dev
```

### ES5 Template install

```yml
# Step 1. Download the template
$ sls create --template-url https://github.com/aa2kb/serverless-modular/tree/master/template/modular-es5 --path myModularService

# Step 2. Change directory
$ cd myModularService

# Step 3. Create a package.json file
$ npm init

# Step 3. Install dependencies
$ npm i serverless-modular --save-dev
```

Now you are all done to start building your serverless modular functions

## API Reference

The serverless CLI can be accessed by

```yml
# Serverless Modular CLI
$ serverless modular

# shorthand
$ sls m
```

Serverless Modular CLI is based on 4 main commands

* `sls m init`
* `sls m feature`
* `sls m function`
* `sls m build`
* `sls m deploy`

### init command

```yml
sls m init
```

The serverless init command helps in creating a basic `.gitignore` that is useful for serverless modular.

The basic `.gitignore` for serverless modular looks like this

```yml
#node_modules
node_modules

#sm main functions
sm.functions.yml

#serverless file generated by build
src/**/serverless.yml

#main serverless directories generated for sls deploy
.serverless

#feature serverless directories generated sls deploy
src/**/.serverless

#serverless logs file generated for main sls deploy
.sm.log

#serverless logs file generated for feature sls deploy
src/**/.sm.log

#Webpack config copied in each feature
src/**/webpack.config.js
```

___

### feature command

The feature command helps in building new features for your project

#### options (feature Command)

This command comes with three options

**--name**: Specify the name you want for your feature

**--remove**: set value to true if you want to remove the feature

**--basePath**: Specify the basepath you want for your feature, this base path should be unique for all features. _helps in running offline with [offline plugin](https://github.com/dherault/serverless-offline/issues) and for [API Gateway](https://aws.amazon.com/api-gateway/)_

| options       | shortcut   |  required  |      values    |     default value   |
| ------------- | :--------: | :--------: | -------------- | ------------------  |
| --name        |    -n      |    ✅      | _string_       | N/A                 |
| --remove      |    -r      |    ❎      | _true, false_  | false               |
| --basePath    |    -p      |    ❎      | _string_       | same as name        |

#### Examples (feature Command)

##### Creating a basic feature

```yml
# Creating a jedi feature
$ sls m feature -n jedi
```

##### Creating a feature with different base path

```yml
# sls m feature -n jedi -p tatooine
$ sls m feature -n jedi -r true
```

##### Deleting a feature

```yml
# Anakin is going to delete the jedi feature
$ sls m feature -n jedi -r true
```

___

### function command

The function command helps in adding new function to a feature

#### options (function Command)

This command comes with four options

**--name**: Specify the name you want for your function

**--feature**: Specify the name of the existing feature

**--path**: Specify the path for HTTP endpoint _helps in running offline with [offline plugin](https://github.com/dherault/serverless-offline/issues) and for [API Gateway](https://aws.amazon.com/api-gateway/)_

**--method**: Specify the path for HTTP method _helps in running offline with [offline plugin](https://github.com/dherault/serverless-offline/issues) and for [API Gateway](https://aws.amazon.com/api-gateway/)_

| options       | shortcut   |  required  |      values    |     default value   |
| ------------- | :--------: | :--------: | -------------- | ------------------  |
| --name        |    -n      |    ✅      | _string_       | N/A                 |
| --feature     |    -f      |    ✅      | _string_       | N/A                 |
| --path        |    -p      |    ❎      | _string_       | same as name        |
| --method      |    -m      |    ❎      | _string_       | 'GET'               |

#### Examples (function Command)

##### Creating a basic function

```yml
# Creating a cloak function for jedi feature
$ sls m function -n cloak -f jedi
```

##### Creating a basic function with different path and method

```yml
# Creating a cloak function for jedi feature with custom path and HTTP method
$ sls m function -n cloak -f jedi -p powers -n POST
```

___

### build command

The build command helps in building the project for local or global scope

#### options (build Command)

This command comes with four options

**--scope**: Specify the scope of the build, use this with "--feature" tag

**--feature**: Specify the name of the existing feature you want to build

| options       | shortcut   |  required  |      values    |     default value   |
| ------------- | :--------: | :--------: | -------------- | ------------------  |
| --scope       |    -s      |    ❎      | _string_       | local               |
| --feature     |    -f      |    ❎      | _string_       | N/A                 |

##### Saving *build* Config in serverless.yml

You can also save config in serverless.yml file

```yml
custom:
  smConfig:
    build:
      scope: local
```

#### Examples (build Command)

##### all feature build (local scope)

```yml
# Building all local features
$ sls m build
```

##### Single feature build (local scope)

```yml
# Building a single feature
$ sls m build -f jedi -s local
```

##### All features build global scope

```yml
# Building all features with global scope
$ sls m build -s global
```

### deploy command

The deploy command helps in deploying serverless projects to AWS (it uses `sls deploy` command)

#### options (deploy Command)

This command comes with four options

**--sm-parallel**: Specify if you want to deploy parallel (will only run in parallel when doing multiple deployments)

**--sm-scope**: Specify if you want to deploy local features or global

**--sm-features**: Specify the local features you want to deploy (comma separated if multiple)

| options           | shortcut|  required  |      values     |     default value   |
| ----------------- | :-----: | :--------: | --------------- | ------------------  |
| --sm-parallel     |   ❎    |    ❎      | _true, false_    | true                |
| --sm-scope        |   ❎    |    ❎      | _local, global_  | local               |
| --sm-features     |   ❎    |    ❎      | _string_         | N/A                 |
| --sm-ignore-build |   ❎    |    ❎      | _string_         | false               |

##### Saving *deploy* Config in serverless.yml

You can also save config in serverless.yml file

```yml
custom:
  smConfig:
    deploy:
      scope: local
      parallel: true
      ignoreBuild: true
```

#### Examples (deploy Command)

##### Deploy all features locally

```yml
# deploy all local features
$ sls m deploy
```

##### Deploy all features globally

```yml
# deploy all global features
$ sls m deploy --sm-scope global
```

##### Deploy single feature

```yml
# deploy all global features
$ sls m deploy --sm-features jedi
```

##### Deploy Multiple features

```yml
# deploy all global features
$ sls m deploy --sm-features jedi,sith,dark_side
```

##### Deploy Multiple features in sequence

```yml
# deploy all global features
$ sls m deploy  --sm-features jedi,sith,dark_side --sm-parallel false
```

___

## Authors

* **Amin Ahmed Khan** - *Project Creator* - [aa2kb](https://github.com/aa2kb)

<!-- See also the list of [contributors]() who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us. -->
