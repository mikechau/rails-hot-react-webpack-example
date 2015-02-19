# Rails + React + Webpack

This is an example application of integrating `React` and `webpack` with `Rails`.

## Getting Started

1. `bundle install`
2. `cd webpack && npm install`

## Development

1. `foreman start`

## Production Build

1. `./build.sh`

## Explanation

1. Edit `config/environments/development.rb` and set the asset_host if the source file matches the name, in this case we are using `main.js`. Return the path to the `webpack hot dev server` assets path.

```ruby
# config/environments/development.rb
config.action_controller.asset_host = Proc.new { |source|
  if source =~ /main\.js$/i
  "http://localhost:2992/assets"
  end
}
```

2. Edit `config/environments/production.rb` and add the `webpack/build/assets` path to `config.assets.paths`.

```ruby
# config/environments/production.rb
config.assets.paths << "#{Rails.root}/webpack/build/assets"
```

3. Edit the `config/initializers/assets.rb`, and add `main.js` to `assets.precompile`.

```ruby
# config/initializers/assets.rb
Rails.application.config.assets.precompile += %w( main.js )
```

4. Define a `JAVASCRIPT_FRONTEND_PATH` constant, to set the asset path, in this case, when the env is `production`, we set the constant to `main`, and Rails will look in the paths defined in `assets`. In any other environment, we set the path to `/main`, in `development` this will force `Rails` to serve the asset from the `asset_host` we defined.


```ruby
# config/initializers/assets.rb
if Rails.env.production?
  JAVASCRIPT_FRONTEND_PATH = 'main'
else
  JAVASCRIPT_FRONTEND_PATH = '/main'
end
```

5. For the controller serving the `React` assets, we want to disable the `application layout`.

```ruby
# app/controllers/static_pages_controller.rb
class StaticPagesController < ApplicationController
  layout false

  def index
  end
end
```

6. We set the controller `index.html.erb` to as follows:

```html
<!DOCTYPE html>
<html>
<head>
  <title>RailsReactStarter</title>
</head>
<body>
  <div id="content"></div>
  <%= javascript_include_tag JAVASCRIPT_FRONTEND_PATH %>
</body>
</html>
```

7. Now you should be good to go!

## Links

- http://kevinold.com/2015/02/04/configure-webpack-dev-server-and-react-hot-loader-with-ruby-on-rails.html
- https://github.com/justin808/react-webpack-rails-tutorial
- https://github.com/webpack/react-starter
- https://github.com/newtriks/generator-react-webpack
