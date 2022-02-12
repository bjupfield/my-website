Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
  get "/hello", to: "application#hello_world"
  get "/checkLoggedIn", to: "user#checkedLoggedIn"
  get "/filesUser", to: "save_file#filesUser"
  post "/saveFile", to: "save_file#create"
  delete "/saveFile/:id", to: "save_file#delete"
  patch "/share/:id", to: "save_file#shareChange"
  resources :user
  post "/login", to: "user#login"
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
